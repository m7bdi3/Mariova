"use server";
import React from "react";
import { HeroSection } from "@/components/Landing/Hero-Section";
import { HorizontalPanels } from "@/components/Landing/Horizontal-Section";
import { AboutSection } from "@/components/Landing/About-Section";
import { IngredientsSection } from "@/components/Landing/Ingredients-Section";
import { BenefitsSection } from "@/components/Landing/Benefits-Section";
import { HowToUseSection } from "@/components/Landing/HowToUse-Section";
import { TestimonialsSection } from "@/components/Landing/Testimonials-Section";
import { Footer } from "@/components/Landing/Footer";

export default async function Home() {
  return (
    <main id="main" className="relative">
      <HeroSection />
      <AboutSection />
      <IngredientsSection />
      <BenefitsSection />
      <HorizontalPanels />
      <HowToUseSection />
      <TestimonialsSection />
      <Footer />
    </main>
  );
}
