import Footer from "@/components/Footer";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ScrollingServices from "@/components/ScrollingServices";
import ServicesSection from "@/components/ServicesSection";

export default function Home() {
  return (
    <main>
      <Header />
      <HeroSection />
      <ScrollingServices />
      <ServicesSection />
      <Footer />
      {/* other components upcomming */}
    </main>
  );
}
