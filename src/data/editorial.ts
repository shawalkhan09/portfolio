import type { EditorialPanel } from "@/types/content";

export const aboutIntro =
  "I'm a final-year student working across machine learning and full-stack web development, from healthcare-focused ML research to deployed tools people actually use.";

export const editorialPanels: EditorialPanel[] = [
  {
    id: "healthcare-ai",
    eyebrow: "Interests",
    headline: "Healthcare AI & NLP",
    body: "Focused on applying machine learning to healthcare problems, from predictive modeling to natural language processing.",
  },
  {
    id: "web-development",
    eyebrow: "Interests",
    headline: "Full-Stack Web Development",
    body: "Building deployed web applications end to end, from Flask tools like PDF Hamster to this portfolio itself, built with Next.js and TypeScript.",
  },
];
