import { Hero } from "@/components/Hero";
import { WorkGrid } from "@/components/WorkGrid";
import { EditorialSplit } from "@/components/EditorialSplit";
import { NewsCarousel } from "@/components/NewsCarousel";
import { ContactCta } from "@/components/ContactCta";
import { projects } from "@/data/projects";
import { editorialPanels } from "@/data/editorial";
import { newsItems } from "@/data/news";

export default function Home() {
  const featuredProjects = projects.filter((p) => p.featured);

  return (
    <>
      <Hero projects={featuredProjects} />
      <WorkGrid projects={projects} />
      <EditorialSplit panels={editorialPanels} />
      <NewsCarousel items={newsItems} />
      <ContactCta />
    </>
  );
}
