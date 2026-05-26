import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { AboutSection } from "@/components/sections/AboutSection";
import { AiExploreSection } from "@/components/sections/AiExploreSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { WorkShowcase } from "@/components/sections/WorkShowcase";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <WorkShowcase />
        <AiExploreSection />
        <AboutSection />
      </main>
      <Footer />
    </>
  );
}
