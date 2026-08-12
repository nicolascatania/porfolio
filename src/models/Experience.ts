export interface Experience {
  id: number;
  title: string;
  institution: string;
  yearIn: string;
  yearOut: string;
  description: string;
  /** Tech used on the job, rendered as chips. Proper nouns — not translated. */
  stack?: string[];
  /** Marks the role as ongoing so the timeline can flag it. */
  current?: boolean;
}
