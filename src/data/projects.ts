import type { Project } from "@/types/content";

export const projects: Project[] = [
  {
    id: "loan-default-app",
    category: "Machine Learning",
    title: "Loan Default Prediction",
    description:
      "Logistic Regression + Random Forest pipeline with SMOTE class balancing, ROC-AUC ~0.845. Deployed on Streamlit Cloud.",
    stat: "ROC-AUC ~0.845",
    stackTags: ["Python", "scikit-learn", "Streamlit"],
    media: {
      type: "image",
      src: "/hero/loan-default.png",
      fallbackImage: "/hero/loan-default.png",
    },
    href: "https://loan-default-app-2tq6c3nfuti4k9gzt84ry9.streamlit.app/",
    linkLabel: "View project",
  },
  {
    id: "loan-default-risk-console",
    category: "Web App",
    title: "Loan Default Risk Console",
    description:
      "Productionized version of the Loan Default Prediction model: a FastAPI + JWT REST API with MongoDB-backed prediction history, a React dashboard, and CI/CD, replacing the original Streamlit demo.",
    stackTags: ["FastAPI", "React", "MongoDB"],
    media: {
      type: "image",
      src: "/hero/loan-default-risk-console.png",
      fallbackImage: "/hero/loan-default-risk-console.png",
    },
    href: "https://loan-default-risk-console.vercel.app",
    linkLabel: "View project",
  },
  {
    id: "seizure-prediction-ml",
    category: "Machine Learning",
    title: "Seizure Prediction",
    description:
      "Epileptic seizure prediction with a custom Diff-Logic (Differentiable Logic Gate Network) implementation that beat MLP baselines at every parameter budget.",
    stackTags: ["Python", "PyTorch", "scikit-learn"],
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
    category: "Web App",
    title: "PDF Hamster",
    description:
      "Flask web app with a set of PDF conversion tools, deployed at pdfhamster.com.",
    stackTags: ["Flask", "Python"],
    media: {
      type: "image",
      src: "/hero/pdfhamster.png",
      fallbackImage: "/hero/pdfhamster.png",
    },
    href: "https://pdfhamster.com",
    linkLabel: "View project",
  },
  {
    id: "mass",
    category: "Final Year Project",
    title: "MASS: Multi-Agent Analysis and Synthesis System",
    description:
      "A multi-agent pipeline (Intake, Researcher, Analyst, Auditor, Orchestrator) that turns a raw business case into an audited, evidence-grounded diagnostic report, catching fabricated statistics and unsupported rankings before they reach a reader. Being presented at a hackathon.",
    stackTags: ["Python", "Multi-Agent", "ChromaDB"],
    media: {
      type: "image",
      src: "/news/mass.png",
      fallbackImage: "/news/mass.png",
    },
    href: "https://github.com/shawalkhan09/MASS-hackathon-2026",
    linkLabel: "View project",
  },
  {
    id: "pitchdeck-live",
    category: "Web App",
    title: "PitchDeck.live",
    description:
      "AI pitch deck builder: describe a startup in one line and it generates a full deck outline via the Gemini API.",
    stackTags: ["React", "TypeScript", "Gemini API"],
    media: {
      type: "image",
      src: "/hero/pitchdeck-live.png",
      fallbackImage: "/hero/pitchdeck-live.png",
    },
    href: "https://pitchdeck-live-plum.vercel.app",
    linkLabel: "View project",
  },
  {
    id: "exoplanet-explorer",
    category: "Web App",
    title: "Exoplanet Explorer",
    description:
      "A navigable 3D map of confirmed exoplanets built from real NASA Exoplanet Archive data: 36 planets across 27 systems, positioned by real coordinates with real orbital periods, radii, and masses.",
    stackTags: ["React Three Fiber", "Three.js", "NASA API"],
    media: {
      type: "image",
      src: "/hero/exoplanet-explorer.png",
      fallbackImage: "/hero/exoplanet-explorer.png",
    },
    href: "https://exoplanet-explorer-lovat.vercel.app",
    linkLabel: "View project",
  },
  {
    id: "llama-xr-extended",
    category: "Machine Learning",
    title: "LLaMA-XR Extended",
    description:
      "Reproduction and extension of a 2026 radiology report-generation paper (LLaMA + QLoRA), implemented from scratch since the authors released no code, then extended with the clinical-accuracy eval and hallucination checks their own limitations section calls for.",
    stackTags: ["Python", "PyTorch", "LLM Fine-tuning"],
    href: "https://github.com/shawalkhan09/llama-xr-extended",
    linkLabel: "View project",
  },
];
