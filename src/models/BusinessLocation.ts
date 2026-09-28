export interface BusinessLocation {
  address: string; // Full address as a string
  phone?: string;
  /** Digits only for wa.me links, e.g. 971559461415 */
  whatsapp?: string;
  email?: string;
  hours: string;
}
