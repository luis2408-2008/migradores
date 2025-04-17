import Navbar from "@/components/navbar";
import HeroSection from "@/components/hero-section";
import CountriesSection from "@/components/countries-section";
import ResourcesSection from "@/components/resources-section";
import CommunitySection from "@/components/community-section";
import HelpSection from "@/components/help-section";
import Footer from "@/components/footer";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function HomePage() {
  // Inicializar AOS (Animate on Scroll)
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-in-out",
    });
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <div data-aos="fade-up">
          <CountriesSection />
        </div>
        <div data-aos="fade-up">
          <ResourcesSection />
        </div>
        <div data-aos="fade-up">
          <CommunitySection />
        </div>
        <div data-aos="fade-up">
          <HelpSection />
        </div>
      </main>
      <Footer />
    </div>
  );
}
