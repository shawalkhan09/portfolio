export type NavLink = {
  label: string;
  href: string;
};

export type NavSection = {
  label: string;
  href?: string;
  links: NavLink[];
};

export type Project = {
  id: string;
  category: string;
  title: string;
  description: string;
  /** Short excerpt already present in `description`, called out separately for emphasis. */
  stat?: string;
  stackTags: string[];
  /** Omitted when no screenshot/clip exists -- Work grid renders a text-only card. */
  media?: {
    type: "video" | "image";
    src: string;
    fallbackImage: string;
  };
  href: string;
  linkLabel: string;
  /** Shown in the hero teaser carousel; the Work grid always shows every project. */
  featured: boolean;
};

export type EditorialPanel = {
  id: string;
  eyebrow: string;
  headline: string;
  body: string;
  image?: string;
  href?: string;
  linkLabel?: string;
};

export type NewsItem = {
  id: string;
  date: string;
  category: string;
  title: string;
  excerpt: string;
  image: string;
  href: string;
};

export type ExperienceEntry = {
  id: string;
  role: string;
  org: string;
  /** Free text, e.g. "2024 -- Present"; omitted from the timeline if not yet known. */
  period?: string;
  description?: string;
};

export type SkillGroup = {
  category: string;
  skills: string[];
};
