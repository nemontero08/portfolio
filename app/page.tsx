import PageReveal from "@/components/PageReveal";
import PageFrame from "@/components/layout/PageFrame";
import Navbar from "@/components/layout/Navbar";
import BentoGrid from "@/components/layout/BentoGrid";
import GridItem from "@/components/layout/GridItem";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import CaseStudyCard from "@/components/sections/CaseStudyCard";
import ResumeButton from "@/components/sections/ResumeButton";
import LinkedInCard from "@/components/sections/LinkedInCard";
import LetsTalkCard from "@/components/sections/LetsTalkCard";
import AboutMe from "@/components/sections/AboutMe";
import Testimonials from "@/components/sections/Testimonials";

/**
 * Desktop grid — NEW custom layout per redesign brief (not extracted from
 * reference/framer-original; that source only informs each card's own
 * internals, which are untouched here). 12 columns x 11 rows, auto-placed
 * in DOM order using only column/row spans (no explicit grid-column/row
 * start) — verified by hand that this order+span combination lands every
 * card where the brief describes:
 *
 * - Hero: 2/3 width (8/12 cols), 4 rows tall.
 * - Right column (1/3 width, 4 cols): Resume (1 row) + LinkedIn (1 row)
 *   stacked = 2 rows ("Row A"), then Let's Talk (2 rows) below ("Row B") —
 *   together matching Hero's 4-row height.
 * - Vitalmed (2/3, 8 cols) + About me (1/3, 4 cols), 3 rows — new row.
 * - Basalto + Lumine Gas (4 cols each = 8 total, matching the 2/3 column)
 *   + Testimonials (1/3, 4 cols), 4 rows — new row.
 *
 * How-I-Work teaser, What-I-Do, and Lab aren't part of this new desktop
 * arrangement per the brief — not deleted, just not placed here.
 *
 * <1024px is unchanged (still the old stacked-flex fallback) — smaller
 * breakpoints are explicitly out of scope for this pass.
 */
export default function Home() {
  return (
    <main>
      <PageReveal>
        <PageFrame>
          <Navbar />
          <BentoGrid>
            <GridItem colSpan={8} rowSpan={4} mobileOrder={0}>
              <Hero />
            </GridItem>

            <GridItem colSpan={4} rowSpan={1} mobileOrder={0}>
              <ResumeButton />
            </GridItem>

            <GridItem colSpan={4} rowSpan={1} mobileOrder={0}>
              <LinkedInCard />
            </GridItem>

            <GridItem colSpan={4} rowSpan={2} mobileOrder={13}>
              <LetsTalkCard />
            </GridItem>

            <GridItem colSpan={8} rowSpan={3} mobileOrder={3}>
              <CaseStudyCard
                background="15, 76, 182"
                pillBackground="rgba(36, 36, 36, 0.5)"
                heading="Turning a bureaucratic process into a digital enrollment"
                pills={["Web App", "Onboarding", "Healthtech"]}
                href="/vitalmed"
                imagePlaceholder="iPhone 15 screenshot"
              />
            </GridItem>

            <GridItem colSpan={4} rowSpan={3} hiddenBelow1024>
              <AboutMe />
            </GridItem>

            <GridItem colSpan={4} rowSpan={4} mobileOrder={4}>
              <CaseStudyCard
                background="212, 199, 143"
                pillBackground="rgba(39, 24, 10, 0.8)"
                eyebrow="BASALTO"
                heading={<strong>Loyalty platform</strong>}
                pills={["Web App", "Loyalty", "Engagement"]}
                underConstruction
              />
            </GridItem>

            <GridItem colSpan={4} rowSpan={4} mobileOrder={5}>
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

            <GridItem colSpan={4} rowSpan={4} mobileOrder={7}>
              <Testimonials />
            </GridItem>
          </BentoGrid>
          <Footer />
        </PageFrame>
      </PageReveal>
    </main>
  );
}
