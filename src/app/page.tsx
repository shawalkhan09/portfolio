import { Hero } from "@/components/Hero";
import { heroSlides } from "@/data/hero";

export default function Home() {
  return (
    <>
      <Hero slides={heroSlides} />
    </>
  );
}
