import { headers } from "next/headers";
import {
  defaultLocale,
  isLocale,
  type Locale,
} from "./config";

/** Read locale set by middleware (`x-locale` request header). */
export async function getRequestLocale(): Promise<Locale> {
  const headerStore = await headers();
  const value = headerStore.get("x-locale");
  if (value && isLocale(value)) {
    return value;
  }
  return defaultLocale;
}
