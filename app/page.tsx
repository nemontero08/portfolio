import PageReveal from "@/components/PageReveal";
import PageFrame from "@/components/layout/PageFrame";
import BentoGrid from "@/components/layout/BentoGrid";
import GridItem from "@/components/layout/GridItem";
import Hero from "@/components/sections/Hero";
import CaseStudyCard from "@/components/sections/CaseStudyCard";
import ResumeButton from "@/components/sections/ResumeButton";
import LinkedInCard from "@/components/sections/LinkedInCard";
import LetsTalkCard from "@/components/sections/LetsTalkCard";
import HowItWorkTeaser from "@/components/sections/HowItWorkTeaser";
import WhatIDo from "@/components/sections/WhatIDo";
import Testimonials from "@/components/sections/Testimonials";
import AboutMe from "@/components/sections/AboutMe";
import Lab from "@/components/sections/Lab";

export default function Home() {
  return (
    <main>
      <PageReveal>
        <PageFrame>
          <BentoGrid>
            <GridItem colSpan={3} rowSpan={4} mobileOrder={0}>
              <Hero />
            </GridItem>

            <GridItem colSpan={3} rowSpan={3} mobileOrder={4}>
              <CaseStudyCard
                background="212, 199, 143"
                pillBackground="rgba(39, 24, 10, 0.8)"
                eyebrow="BASALTO"
                heading={<strong>Loyalty platform</strong>}
                pills={["Web App", "Loyalty", "Engagement"]}
                underConstruction
              />
            </GridItem>

            <GridItem colSpan={3} rowSpan={3} mobileOrder={3}>
              <CaseStudyCard
                background="15, 76, 182"
                pillBackground="rgba(36, 36, 36, 0.5)"
                heading="Turning a bureaucratic process into a digital enrollment"
                pills={["Web App", "Onboarding", "Healthtech"]}
                href="/vitalmed"
                imagePlaceholder="iPhone 15 screenshot"
              />
            </GridItem>

            <GridItem colSpan={3} rowSpan={1} mobileOrder={0}>
              <ResumeButton />
            </GridItem>

            <GridItem colSpan={3} rowSpan={1} mobileOrder={0}>
              <LinkedInCard />
            </GridItem>

            <GridItem colSpan={3} rowSpan={2} mobileOrder={13}>
              <LetsTalkCard />
            </GridItem>

            <GridItem colSpan={3} rowSpan={3} mobileOrder={6}>
              <HowItWorkTeaser />
            </GridItem>

            <GridItem colSpan={3} rowSpan={3} mobileOrder={5}>
              <CaseStudyCard
                background="225, 227, 227"
                textColor="#141414"
                pillBackground="rgba(27, 109, 36, 0.8)"
                heading={
                  <>
                    <strong>Lumine Gas</strong>
                    <br />
                    <strong>Ordering system</strong>
                  </>
                }
                pills={["Mobile App", "Web App", "Ordering"]}
                underConstruction
              />
            </GridItem>

            <GridItem colSpan={3} rowSpan={4} mobileOrder={2}>
              <WhatIDo />
            </GridItem>

            <GridItem colSpan={3} rowSpan={4} mobileOrder={7}>
              <Testimonials />
            </GridItem>

            <GridItem colSpan={3} rowSpan={2} hiddenBelow1024>
              <AboutMe />
            </GridItem>

            <GridItem colSpan={3} rowSpan={2} hiddenBelow1024>
              <Lab />
            </GridItem>
          </BentoGrid>
        </PageFrame>
      </PageReveal>
    </main>
  );
}
