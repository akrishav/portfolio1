"use client";

import ScrollyCanvas from "@/components/ScrollyCanvas";
import Overlay from "@/components/Overlay";
import Projects from "@/components/Projects";
import Hero from "@/components/Hero";
import ImpactSnapshot from "@/components/ImpactSnapshot";
import ExperienceJourney from "@/components/ExperienceJourney";
import CaseStudies from "@/components/CaseStudies";
import SkillsTools from "@/components/SkillsTools";
import AboutMe from "@/components/AboutMe";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col gap-0">
      <Hero />
      <ImpactSnapshot />
      <ExperienceJourney />
      <CaseStudies />
      <SkillsTools />
      <AboutMe />
      <Footer />
      {/* Other components will be added here */}
    </main>
  );
}
