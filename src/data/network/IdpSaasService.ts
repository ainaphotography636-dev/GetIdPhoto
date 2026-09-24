import { HttpService } from "./HttpService";

export interface GetSignedUrlPayload {
  specCode: string;
}

export interface GetSignedUrlResult {
  signedUrl: string;
}

export interface CreateWatermarkPhotoPayload {
  imageBase64: string;
}

export interface CreateWatermarkPhotoResult {
  photoUuid: string;
  issues: string[];
  idPhotoUrl: string;
  idPhotoPngUrl?: string;
  idPhotoOriginalBgUrl?: string;
}

export interface GetPhotosResult {
  photoUuid: string;
  specCode: string;
  idPhotoNoBgPhotoUrl?: string; // Not cropped, no bg, no watermark
  idPhotoTempWatermarkPhotoUrl: string; // Cropped, no bg, has watermark
  idPhotoTempResultPhotoUrl?: string; // Cropped, no bg, no watermark
  idPhotoOriginalBgPhotoUrl?: string; // Cropped, has bg, no watermark
  idPhotoWithBgDataUrl?: string; // Cropped, has bg, has watermark
  idPhotoCode?: string;
}

export interface GetOrderResult {
  orderAmountInCent?: number;
  orderCurrency?: string;
  orderId: string | null;
  orderStatus: string;
  paymentMethod?: string;
  paymentResult?: string;
  paymentTransactionId?: string;
  priceId?: string;
  productDescription?: string;
  productId?: string;
  productName?: string;
}

export interface CreatePaymentIntentPayload {
  amountInCent: number;
  currency: string;
  photoUuid: string;
  printedPhotoNumber: number;
}

export interface CreatePaymentIntentResult {
  clientSecret: string;
}

export interface VerifyStripePaymentGetPhotoPayload {
  photoUuid: string;
  paymentIntentId: string;
}

export interface VerifyStripePaymentGetPhotoResult {
  photoUuid: string;
  specCode: string;
  idPhotoOriginalBgPhotoUrl: string;
  idPhotoTempResultPhotoUrl: string;
  amountInCents?: number;
  currency?: string;
  paymentStatus?: string;
}

export class IdpSaasService {
  http: HttpService;

  constructor(baseURL: string) {
    this.http = new HttpService(baseURL);
  }

  async getSignedUrl(
    payload: GetSignedUrlPayload,
  ): Promise<GetSignedUrlResult> {
    return this.http.post("/api/photo/get-signed-url", payload);
  }

  async createWatermarkPhoto(
    signedUrl: string,
    payload: CreateWatermarkPhotoPayload,
  ): Promise<CreateWatermarkPhotoResult> {
    return this.http.post("/api/photo/create-watermark", {
      signedUrl,
      imageBase64: payload.imageBase64,
    });
  }

  /** Creates a watermarked ID photo through our server, never the third-party host. */
  async makeWatermarkPhoto(payload: {
    specCode: string;
    imageBase64: string;
  }): Promise<CreateWatermarkPhotoResult> {
    const response = await fetch("/api/id-photo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "makeWatermark",
        specCode: payload.specCode,
        imageBase64: payload.imageBase64,
      }),
    });

    const text = await response.text();
    let data: CreateWatermarkPhotoResult & { error?: string };
    try {
      data = JSON.parse(text) as CreateWatermarkPhotoResult & { error?: string };
    } catch {
      throw new Error(
        `HTTP error! status: ${response.status} ${text.trim().slice(0, 500)}`,
      );
    }

    if (!response.ok) {
      const detail = (data.error || text).trim().slice(0, 500);
      throw new Error(
        detail
          ? `HTTP error! status: ${response.status} ${detail}`
          : `HTTP error! status: ${response.status}`,
      );
    }

    return data;
  }

  async getPhotos(orderId: string): Promise<GetPhotosResult> {
    return this.http.get(`/api/photo/${orderId}`);
  }

  async getOrder(orderId: string): Promise<GetOrderResult> {
    return this.http.get(`/api/order/${orderId}`);
  }

  async createPaymentIntent(
    payload: CreatePaymentIntentPayload,
  ): Promise<CreatePaymentIntentResult> {
    return this.http.post("/api/stripe/create-payment-intent", payload);
  }

  async verifyStripePaymentGetPhoto(
    payload: VerifyStripePaymentGetPhotoPayload,
  ): Promise<VerifyStripePaymentGetPhotoResult> {
    return this.http.post(
      "/api/photo/verify-stripe-payment-get-photo",
      payload,
    );
  }
}

export const idpSaasService = new IdpSaasService(
  `${process.env.NEXT_PUBLIC_IDP_SAAS_BASE_URL}`,
);
