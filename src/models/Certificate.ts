export interface Certificate {
  id: number;
  /** i18n key for the certificate name. */
  title: string;
  /** i18n key for the one-paragraph summary shown on the card. */
  description: string;
  /** Path to the PDF under `assets/certificates`. */
  file: string;
  /** i18n keys for the topics covered, shown as chips. Keys rather than raw
   *  strings because some topics are prose ("unit testing") and do translate;
   *  the proper nouns simply resolve to the same value in both locales. */
  topics?: string[];
}
