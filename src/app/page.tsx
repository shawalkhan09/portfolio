import { Hero } from "@/components/Hero";
import { WorkGrid } from "@/components/WorkGrid";
import { About } from "@/components/About";
import { Experience } from "@/components/Experience";
import { NewsCarousel } from "@/components/NewsCarousel";
import { ContactCta } from "@/components/ContactCta";
import { projects } from "@/data/projects";
import { aboutIntro, editorialPanels } from "@/data/editorial";
import { skillGroups } from "@/data/skills";
import { education, experience } from "@/data/experience";
import { newsItems } from "@/data/news";

export default function Home() {
  const featuredProjects = projects.filter((p) => p.featured);

  return (
    <>
      <Hero projects={featuredProjects} />
      <WorkGrid projects={projects} />
      <About
        intro={aboutIntro}
        skillGroups={skillGroups}
        panels={editorialPanels}
      />
      <Experience entries={experience} education={education} />
      <NewsCarousel items={newsItems} />
      <ContactCta />
    </>
  );
}
