import { en } from "@/i18n/dictionaries/en";
import type { FaqItem } from "@/i18n/types";

export type { FaqItem };

/** Default English FAQ list (prefer getDictionary(locale).faq.items). */
export const FAQ_ITEMS: FaqItem[] = en.faq.items;
