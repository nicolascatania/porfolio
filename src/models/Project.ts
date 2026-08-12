import { Technology } from "./Techology";

export interface Project {
    id: number;
    name: string;
    description: string;
    technologies: Technology[];
    releaseYear: string;
    releaseYearNumber: number;
    importance: number;
    githubLink: string;
    imageSrcs: string[];
    /**
     * Small focused experiments built to learn one thing. Rendered in a
     * compact list instead of a full card so they don't compete visually with
     * the projects that carry real scope.
     */
    lab?: boolean;
  }
  