export type NavLink = {
  label: string;
  href: string;
};

export type NavSection = {
  label: string;
  href?: string;
  links: NavLink[];
};

export type HeroSlide = {
  id: string;
  eyebrow: string;
  headline: string;
  description: string;
  media: {
    type: "video" | "image";
    src: string;
    fallbackImage: string;
  };
  href: string;
  linkLabel: string;
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
