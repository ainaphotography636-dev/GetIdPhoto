export type FaqItem = {
  id: string;
  question: string;
  answer: string;
  source?: {
    label: string;
    href: string;
  };
};
