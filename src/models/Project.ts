import { Technology } from "./Techology";

export interface Project {
    id: number;
    name: string;
    description: string;
    technologies: Technology[];
    releaseYear: number;
    githubLink: string
  }
  