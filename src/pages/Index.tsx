
import { useEffect } from "react";
import { analyticsService } from "@/services/analyticsService";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Education from "@/components/Education";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Certifications from "@/components/Certifications";
import Volunteering from "@/components/Volunteering";
import Blog from "@/components/Blog";

interface IndexProps {
  openAdminAnalytics?: () => void;
}

const Index = ({ openAdminAnalytics }: IndexProps) => {
  useEffect(() => {
    // Track page visit
    analyticsService.trackPageView();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header openAdminAnalytics={openAdminAnalytics} />
      <main className="flex-grow">
        <Hero />
        <About />
        <Experience />
        <Education />
        <Skills />
        <Certifications />
        <Volunteering />
        <Blog />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
