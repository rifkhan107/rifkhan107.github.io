import { useEffect } from "react";
import { ThemeProvider } from "@/components/ui/ThemeProvider";
import { AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Education from "@/components/Education";
import Volunteering from "@/components/Volunteering";
import Certifications from "@/components/Certifications";
import Blog from "@/components/Blog";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ParticleNetwork from "@/components/ui/ParticleNetwork";
import CustomCursor from "@/components/ui/CustomCursor";
import TechMarquee from "@/components/ui/TechMarquee";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";

const Index = () => {
  useSmoothScroll();

  useEffect(() => {
    // Update document title
    document.title = "Rifkhan Mohamed | DevOps Engineer";
  }, []);

  return (
    <ThemeProvider defaultTheme="light">
      <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
        <ParticleNetwork />
        <CustomCursor />
        <Header />
        <AnimatePresence mode="wait">
          <main>
            <Hero />
            <TechMarquee />
            <About />
            <Experience />
            <Skills />
            <Education />
            <Volunteering />
            <Certifications />
            <Blog />
            <Contact />
          </main>
        </AnimatePresence>
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default Index;
