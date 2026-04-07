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
  }
  