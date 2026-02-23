import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ProcessSection from "@/components/ProcessSection";
import ScrollingServices from "@/components/ScrollingServices";
import ServicesSection from "@/components/ServicesSection";

export default function Home() {
  return (
    <main>
      <Header />
      <HeroSection />
      <ScrollingServices />
      <ServicesSection />
      <AboutSection />
      <ProcessSection />
      <ContactSection />
      <Footer />
      {/* other components upcomming */}
    </main>
  );
}
