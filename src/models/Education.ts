export interface Education {
  id: number;
  title: string;
  institution: string;
  yearIn: string;
  yearOut: string;
  description: string;
  /** Highlighted facts (GPA, progress) shown as chips. */
  facts?: string[];
  /** Marks the entry as ongoing so the timeline can flag it. */
  current?: boolean;
}
