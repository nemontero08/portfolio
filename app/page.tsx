import { Noto_Serif, Manrope } from "next/font/google";
import PageReveal from "@/components/PageReveal";
import PageFrame from "@/components/layout/PageFrame";
import Navbar from "@/components/layout/Navbar";
import BentoGrid from "@/components/layout/BentoGrid";
import GridItem from "@/components/layout/GridItem";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import CaseStudyCard from "@/components/sections/CaseStudyCard";
import VitalmedLogo from "@/components/sections/VitalmedLogo";
import CardTexture from "@/components/sections/CardTexture";
import ResumeButton from "@/components/sections/ResumeButton";
import LinkedInCard from "@/components/sections/LinkedInCard";
import LetsTalkCard from "@/components/sections/LetsTalkCard";
import AboutMe from "@/components/sections/AboutMe";
import HowItWorkTeaser from "@/components/sections/HowItWorkTeaser";
import VitalmedRightColumn from "@/components/layout/VitalmedRightColumn";
import Testimonials from "@/components/sections/Testimonials";

// Basalto and Lumine Gas's titles use their own display fonts in the
// source (confirmed: --framer-font-family "Noto Serif" for Basalto,
// "Manrope" for Lumine Gas, both weight 800) — the rest of the site stays
// on Inter, same pattern as Hero's Hanken Grotesk.
const notoSerif = Noto_Serif({ subsets: ["latin"], weight: ["800"] });
const manrope = Manrope({ subsets: ["latin"], weight: ["800"] });

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
 * - Vitalmed (2/3, 8 cols, 4 rows — the taller, dominant content row) + a
 *   right column (1/3, 4 cols, one grid cell) that internally splits into
 *   About me (60%) over How I Work teaser (40%) via flex-grow (see
 *   VitalmedRightColumn) — 60/40 isn't representable as whole grid-row
 *   units, so it's not done with row-spans.
 * - Basalto + Lumine Gas (4 cols each = 8 total, matching the 2/3 column)
 *   + Testimonials (1/3, 4 cols), 3 rows — deliberately 0.75x Vitalmed's
 *   4-row height (a clean 4:3 ratio), so Vitalmed stays the taller row.
 *
 * What-I-Do and Lab aren't part of this new desktop arrangement per the
 * brief — not deleted, just not placed here.
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

            <GridItem colSpan={8} rowSpan={4} mobileOrder={3}>
              <CaseStudyCard
                background="15, 76, 182"
                pillBackground="rgba(36, 36, 36, 0.5)"
                titleLogo={<VitalmedLogo />}
                heading="Turning a bureaucratic process into a digital enrollment"
                headingFontSize={19}
                pills={["Web App", "Onboarding", "Healthtech"]}
                href="/vitalmed"
                image={{ src: "/images/vitalmed-phone.png", aspectRatio: 377 / 345 }}
              />
            </GridItem>

            <GridItem colSpan={4} rowSpan={4}>
              <VitalmedRightColumn aboutMe={<AboutMe />} howItWork={<HowItWorkTeaser />} />
            </GridItem>

            <GridItem colSpan={4} rowSpan={3} mobileOrder={4}>
              <CaseStudyCard
                background="212, 199, 143"
                textColor="rgb(43, 43, 43)"
                pillBackground="rgba(39, 24, 10, 0.8)"
                title="BASALTO"
                titleFontSize={32}
                titleFontFamily={notoSerif.style.fontFamily}
                heading={<strong>Loyalty platform</strong>}
                pills={["Web App", "Loyalty", "Engagement"]}
                underConstruction
                texture={
                  <CardTexture
                    viewBox="0 0 239.4 239.85"
                    fill="rgb(39,24,10)"
                    width={240}
                    height={241}
                    bottom={-39}
                    right={-91}
                    opacity={0.1}
                    paths={[
                      "M 167.4 239.85 L 56.7 192.6 L 72.45 239.85 Z M 178.2 234 L 129.6 212.4 L 189.9 189 L 239.4 76.5 L 239.4 172.35 Z",
                      "M 236.25 62.55 L 214.2 110.25 L 179.1 5.85 Z M 182.25 46.8 L 73.35 0 L 167.85 0 Z M 49.5 49.95 L 0 161.1 L 0 65.7 L 60.3 4.95 L 109.8 26.1 Z",
                      "M 3.6 175.95 L 25.2 126.45 L 61.65 234 Z",
                      "M 38.7 120.15 C 38.7 75.415 74.965 39.15 119.7 39.15 C 164.435 39.15 200.7 75.415 200.7 120.15 C 200.7 164.885 164.435 201.15 119.7 201.15 C 74.965 201.15 38.7 164.885 38.7 120.15 Z",
                    ]}
                  />
                }
              />
            </GridItem>

            <GridItem colSpan={4} rowSpan={3} mobileOrder={5}>
              <CaseStudyCard
                background="225, 227, 227"
                textColor="rgb(51, 51, 51)"
                pillBackground="rgba(27, 109, 36, 0.8)"
                title="Lumine Gas"
                titleFontSize={32}
                titleFontFamily={manrope.style.fontFamily}
                heading={<strong>Ordering system</strong>}
                headingOpacity={0.8}
                pills={["Mobile App", "Web App", "Ordering"]}
                underConstruction
                texture={
                  <CardTexture
                    viewBox="0 0 183.2 207.958"
                    fill="rgb(2,120,79)"
                    width={183}
                    height={208}
                    bottom={-20}
                    right={-41}
                    opacity={0.5}
                    paths={[
                      "M 86.4 57.6 L 86.4 207.158 C 86.4 207.448 86.243 207.716 85.99 207.857 C 85.737 207.998 85.427 207.991 85.18 207.839 L 49.18 185.626 C 48.944 185.481 48.8 185.223 48.8 184.946 L 48.8 79.046 C 48.8 78.765 48.948 78.504 49.19 78.359 L 85.19 56.913 C 85.438 56.765 85.745 56.762 85.995 56.904 C 86.245 57.047 86.4 57.312 86.4 57.6 Z M 97.6 206.389 L 97.6 132.992 C 97.6 132.55 97.958 132.192 98.4 132.192 L 144.8 132.192 C 145.242 132.192 145.6 132.55 145.6 132.992 L 145.6 178.936 C 145.6 179.219 145.45 179.48 145.207 179.624 L 98.807 207.078 C 98.56 207.224 98.253 207.226 98.004 207.084 C 97.754 206.941 97.6 206.676 97.6 206.389 Z",
                      "M 36.402 73.109 L 36.794 177.567 C 36.796 177.862 36.634 178.134 36.374 178.274 C 36.114 178.415 35.798 178.4 35.552 178.237 L 0.716 155.138 C 0.269 154.842 0 154.341 0 153.805 L 0 57.262 C 0 56.146 0.582 55.11 1.536 54.529 L 90.353 0.466 C 91.366 -0.15 92.637 -0.156 93.656 0.452 L 181.639 52.933 C 182.607 53.51 183.2 54.554 183.2 55.682 L 183.2 155.603 C 183.2 156.753 182.583 157.815 181.583 158.385 L 158.396 171.583 C 158.148 171.724 157.844 171.723 157.598 171.58 C 157.352 171.436 157.2 171.173 157.2 170.888 L 157.2 121.464 C 157.2 121.022 156.842 120.664 156.4 120.664 L 98.4 120.664 C 97.958 120.664 97.6 120.306 97.6 119.864 L 97.6 35.71 C 97.6 35.419 97.442 35.152 97.187 35.011 C 96.933 34.87 96.622 34.878 96.375 35.033 L 36.777 72.428 C 36.543 72.575 36.401 72.832 36.402 73.108 Z",
                    ]}
                  />
                }
              />
            </GridItem>

            <GridItem colSpan={4} rowSpan={3} mobileOrder={7}>
              <Testimonials />
            </GridItem>
          </BentoGrid>
          <Footer />
        </PageFrame>
      </PageReveal>
    </main>
  );
}
