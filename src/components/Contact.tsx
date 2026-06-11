
import AnimatedCard from "@/components/ui/AnimatedCard";
import SectionHeading from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/motion";
import ContactForm from "./contact/ContactForm";
import ContactInfo from "./contact/ContactInfo";
import SocialLinks from "./contact/SocialLinks";

const Contact = () => {
  return (
    <section
      id="contact"
      className="py-20 md:py-28 relative"
    >
      <div className="container mx-auto px-4">
        <SectionHeading chip="Get In Touch" title="Contact Me" />

        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
          <Reveal className="order-2 lg:order-1" delay={0.1}>
            <AnimatedCard className="glass-card glass-card-hover rounded-2xl p-8 h-full">
              <h3 className="text-2xl font-bold mb-6">Send a Message</h3>
              <ContactForm />
            </AnimatedCard>
          </Reveal>

          <div className="space-y-8 order-1 lg:order-2">
            <Reveal>
              <AnimatedCard className="glass-card glass-card-hover rounded-2xl p-8">
                <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
                <ContactInfo />
              </AnimatedCard>
            </Reveal>

            <Reveal delay={0.15}>
              <AnimatedCard className="glass-card glass-card-hover rounded-2xl p-8">
                <h3 className="text-xl font-bold mb-4">Connect With Me</h3>
                <p className="text-foreground/70 mb-6">
                  Find me on professional networks and platforms.
                </p>
                <SocialLinks />
              </AnimatedCard>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
