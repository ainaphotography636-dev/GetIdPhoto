import { NextResponse } from "next/server";

function readEnv(name: string): string {
  // Bracket access so Next.js does not inline the value at build time.
  // On Vercel, inlined process.env.IDPHOTO_API_KEY is undefined in preview
  // even when the variable is set for the deployment runtime.
  const value = process.env[name];
  return typeof value === "string" ? value.replace(/\0/g, "").trim() : "";
}

function getIdphotoApiEndpoint(): string {
  const endpoint = readEnv("IDPHOTO_API_ENDPOINT");
  if (endpoint.startsWith("http://") || endpoint.startsWith("https://")) {
    return endpoint;
  }
  return "https://api-us.idphotoapp.com";
}

export const forwardRequest = async (
  method: string,
  path: string,
  body?: any,
) => {
  const url = `${getIdphotoApiEndpoint()}${path}`;
  const options: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (body) {
    options.body = JSON.stringify(withIdphotoCredentials(body));
  }

  const response = await fetch(url, options);
  return response;
};

function withIdphotoCredentials(body: Record<string, unknown>) {
  const apiKey = readEnv("IDPHOTO_API_KEY");
  const apiSecret = readEnv("IDPHOTO_API_SECRET");

  if (!apiKey || !apiSecret) {
    console.error(
      "[idphoto] IDPHOTO_API_KEY or IDPHOTO_API_SECRET is empty at request time.",
      { hasKey: Boolean(apiKey), hasSecret: Boolean(apiSecret) },
    );
  }

  return {
    ...body,
    apiKey,
    apiSecret,
  };
}

/** Posts JSON to a signed idphoto URL, including the server-side API credentials. */
export async function postIdphotoUrl(
  url: string,
  body: Record<string, unknown>,
): Promise<Response> {
  const endpoint = new URL(getIdphotoApiEndpoint());
  const target = new URL(url.replace("http:", "https:"));
  if (target.origin !== endpoint.origin) {
    throw new Error(
      `Refusing to post photo payload to unexpected host: ${target.origin}`,
    );
  }

  return fetch(target.toString(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(withIdphotoCredentials(body)),
  });
}

type ErrorHandler = (params: { status: number; responseText: string }) => {
  status?: number;
  body: any;
};

type SuccessHandler<T> = (data: T) => { status?: number; body: any };

export async function handleForwardRequest<T = any>(
  requestPromise: Promise<Response>,
  options?: {
    onError?: ErrorHandler;
    onSuccess?: SuccessHandler<T>;
  },
): Promise<NextResponse> {
  try {
    const response = await requestPromise;
    const text = await response.text();

    if (!response.ok) {
      const status = response.status;
      console.error(`Forward request failed: ${status} - ${text}`);

      if (options?.onError) {
        const custom = options.onError({ status, responseText: text });
        return NextResponse.json(custom.body, {
          status: custom.status || status,
        });
      }

      return NextResponse.json(
        {
          error:
            response.status < 500
              ? `Client error: ${text}`
              : `Server error: ${text}`,
        },
        { status },
      );
    }

    const data: T = JSON.parse(text);

    if (options?.onSuccess) {
      const { status = 200, body } = options.onSuccess(data);
      return NextResponse.json(body, { status });
    }

    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    console.error("Unexpected error during forwardRequest:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
