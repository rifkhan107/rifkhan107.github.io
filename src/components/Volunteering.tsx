
import AnimatedCard from "@/components/ui/AnimatedCard";
import { CalendarClock, Globe, Users } from "lucide-react";

const Volunteering = () => {
  return (
    <section
      id="volunteering"
      className="py-20 md:py-28 relative"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="chip mb-4">Community Involvement</span>
          <h2 className="section-title">Volunteering</h2>
        </div>
        
        <div className="max-w-5xl mx-auto space-y-8">
          {/* AWS Community Builder */}
          <AnimatedCard className="glass-card rounded-2xl p-8 lg:p-10">
            <div className="flex flex-col md:flex-row md:items-start gap-6">
              <div className="flex-shrink-0 flex items-center justify-center">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-xl overflow-hidden bg-[#232F3E] flex items-center justify-center p-4">
                  <img 
                    src="https://d1.awsstatic.com/logos/aws-logo-lockups/poweredbyaws/PB_AWS_logo_RGB_stacked_REV_SQ.91cd4af40773cbfbd15577a3c2b8a346fe3e8fa2.png" 
                    alt="Amazon Web Services" 
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
              
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-2 text-foreground">AWS Community Builder</h3>
                <div className="flex items-center text-rifkhan mb-2">
                  <Users className="w-5 h-5 mr-2" />
                  <span className="font-medium">Amazon Web Services (AWS)</span>
                </div>
                
                <div className="flex flex-wrap gap-4 mb-4 text-sm text-foreground/70">
                  <div className="flex items-center">
                    <CalendarClock className="w-4 h-4 mr-1.5" />
                    <span>Aug 2023 - Present · 1 yr 8 mos</span>
                  </div>
                  <div className="flex items-center">
                    <Globe className="w-4 h-4 mr-1.5" />
                    <a 
                      href="https://dev.to/rifkhan107" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="hover:text-rifkhan transition-colors"
                    >
                      dev.to/rifkhan107
                    </a>
                  </div>
                </div>
                
                <div className="space-y-3 text-foreground/80">
                  <p>
                    Passionate about sharing knowledge and expertise with others to help them learn about AWS. 
                    Active participant in the AWS community and received technical resources, education, 
                    and networking opportunities from AWS.
                  </p>
                  <div className="mt-4">
                    <h4 className="text-lg font-semibold mb-2">Recent Articles</h4>
                    <ul className="space-y-2 list-disc list-inside">
                      <li>
                        <a 
                          href="https://dev.to/rifkhan107/getting-started-with-aws-lambda" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="hover:text-rifkhan transition-colors"
                        >
                          Getting Started with AWS Lambda
                        </a>
                      </li>
                      <li>
                        <a 
                          href="https://dev.to/rifkhan107/aws-s3-best-practices" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="hover:text-rifkhan transition-colors"
                        >
                          AWS S3 Best Practices for Scalable Storage
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="mt-4">
                    <a 
                      href="https://aws.amazon.com/developer/community/community-builders/community-builders-directory/?cb-cards.sort-by=item.additionalFields.cbName&cb-cards.sort-order=asc&awsf.builder-category=*all&awsf.location=*all&awsf.year=*all&cb-cards.q=rifkhan&cb-cards.q_operator=AND"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-rifkhan hover:underline"
                    >
                      <span className="font-medium">View AWS Community Builder Profile</span>
                      <svg className="w-4 h-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 010-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedCard>
          
          {/* TryHackMe */}
          <AnimatedCard className="glass-card rounded-2xl p-8 lg:p-10">
            <div className="flex flex-col md:flex-row md:items-start gap-6">
              <div className="flex-shrink-0 flex items-center justify-center">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-xl overflow-hidden bg-[#1A1A1A] flex items-center justify-center p-4">
                  <img 
                    src="https://assets.tryhackme.com/img/THMlogo.png" 
                    alt="TryHackMe" 
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
              
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-2 text-foreground">Cybersecurity Practitioner</h3>
                <div className="flex items-center text-rifkhan mb-2">
                  <Users className="w-5 h-5 mr-2" />
                  <span className="font-medium">TryHackMe</span>
                </div>
                
                <div className="flex flex-wrap gap-4 mb-4 text-sm text-foreground/70">
                  <div className="flex items-center">
                    <CalendarClock className="w-4 h-4 mr-1.5" />
                    <span>Jan 2023 - Present · 2 yrs 3 mos</span>
                  </div>
                  <div className="flex items-center">
                    <Globe className="w-4 h-4 mr-1.5" />
                    <a 
                      href="https://tryhackme.com/p/R1fkh4n" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="hover:text-rifkhan transition-colors"
                    >
                      tryhackme.com/p/R1fkh4n
                    </a>
                  </div>
                </div>
                
                <div className="space-y-3 text-foreground/80">
                  <p>
                    I engage in hands-on labs, cybersecurity challenges, and learning modules. 
                    I contribute by collaborating with others to solve problems, share knowledge, 
                    and promote cybersecurity awareness. This role enhances my skills in both offensive 
                    and defensive security while supporting the community in developing critical 
                    cybersecurity expertise.
                  </p>
                </div>
              </div>
            </div>
          </AnimatedCard>
        </div>
      </div>
    </section>
  );
};

export default Volunteering;
