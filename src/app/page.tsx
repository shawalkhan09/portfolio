import { Hero } from "@/components/Hero";
import { EditorialSplit } from "@/components/EditorialSplit";
import { NewsCarousel } from "@/components/NewsCarousel";
import { ContactCta } from "@/components/ContactCta";
import { heroSlides } from "@/data/hero";
import { editorialPanels } from "@/data/editorial";
import { newsItems } from "@/data/news";

export default function Home() {
  return (
    <>
      <Hero slides={heroSlides} />
      <EditorialSplit panels={editorialPanels} />
      <NewsCarousel items={newsItems} />
      <ContactCta />
    </>
  );
}
