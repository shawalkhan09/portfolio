import type { HeroSlide } from "@/types/content";

export const heroSlides: HeroSlide[] = [
  {
    id: "loan-default-app",
    eyebrow: "Machine Learning",
    headline: "Loan Default Prediction",
    description:
      "Logistic Regression + Random Forest pipeline with SMOTE class balancing, ROC-AUC ~0.845. Deployed on Streamlit Cloud.",
    media: {
      type: "image",
      src: "/hero/loan-default.png",
      fallbackImage: "/hero/loan-default.png",
    },
    href: "https://loan-default-app-2tq6c3nfuti4k9gzt84ry9.streamlit.app/",
    linkLabel: "View project",
  },
  {
    id: "seizure-prediction-ml",
    eyebrow: "Machine Learning",
    headline: "Seizure Prediction",
    description:
      "Epileptic seizure prediction with a custom Diff-Logic (Differentiable Logic Gate Network) implementation that beat MLP baselines at every parameter budget.",
    media: {
      type: "image",
      src: "/hero/seizure-prediction-ml.png",
      fallbackImage: "/hero/seizure-prediction-ml.png",
    },
    href: "https://github.com/shawalkhan09/seizure-prediction-ml",
    linkLabel: "View project",
  },
  {
    id: "pdfhamster",
    eyebrow: "Web App",
    headline: "PDF Hamster",
    description:
      "Flask web app with a set of PDF conversion tools, deployed at pdfhamster.com.",
    media: {
      type: "image",
      src: "/hero/pdfhamster.png",
      fallbackImage: "/hero/pdfhamster.png",
    },
    href: "https://pdfhamster.com",
    linkLabel: "View project",
  },
];
