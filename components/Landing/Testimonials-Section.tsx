"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronLeft, ChevronRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface Testimonial {
  photo: string;
  name: string;
  location: string;
  rating: number;
  quote: string;
}

const testimonials: Testimonial[] = [
  {
    photo: "/images/emily-r.jpg",
    name: "Emily R.",
    location: "California",
    rating: 5,
    quote:
      "BIO PEEL has transformed my skin! Within just a few uses, I noticed a significant reduction in my fine lines and my complexion has never been brighter. I love how gentle yet effective it is!",
  },
  {
    photo: "/images/michael-s.jpg",
    name: "Michael S.",
    location: "New York",
    rating: 5,
    quote:
      "As someone with sensitive skin, I was hesitant to try anything new. But BIO PEEL has been a game-changer! My skin feels hydrated and looks visibly smoother. Highly recommend it!",
  },
  {
    photo: "/images/sophia-t.jpg",
    name: "Sophia T.",
    location: "Florida",
    rating: 5,
    quote:
      "I've tried many products, but nothing compares to BIO PEEL. It's easy to use, and the results are astonishing! My friends are constantly asking what I'm using!",
  },
];

const TestimonialCard: React.FC<{ testimonial: Testimonial }> = ({
  testimonial,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (cardRef.current) {
        gsap.fromTo(
          cardRef.current,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            scrollTrigger: {
              trigger: cardRef.current,
              start: "top bottom-=100px",
              end: "bottom center",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    },
    { scope: cardRef }
  );

  return (
    <div
      ref={cardRef}
      className="bg-[#D8D2C2] rounded-lg shadow-lg p-6 flex flex-col items-center text-center max-w-2xl mx-auto"
    >
      <Image
        src={testimonial.photo}
        alt={testimonial.name}
        width={80}
        height={80}
        className="rounded-full mb-4"
      />
      <h3 className="text-xl font-semibold mb-1">{testimonial.name}</h3>
      <p className="text-gray-600 mb-2">{testimonial.location}</p>
      <div className="flex mb-3">
        {[...Array(testimonial.rating)].map((_, i) => (
          <svg
            key={i}
            className="w-5 h-5 text-[#B17457]"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      <p className="text-gray-700">{testimonial.quote}</p>
    </div>
  );
};

function RepeatingText() {
  return (
    <>
      <span className="absolute top-0 left-0 w-full text-center text-[#FAF7F0] sm:text-[1vw] lg:text-[2vw] font-bold whitespace-nowrap opacity-10 overflow-hidden">
        {"BIO PEEL - ".repeat(40)}
      </span>
      <span className="absolute bottom-0 left-0 w-full text-center text-[#FAF7F0] sm:text-[1vw] lg:text-[2vw] font-bold whitespace-nowrap opacity-10 overflow-hidden">
        {"BIO PEEL - ".repeat(40)}
      </span>
      <span
        className="absolute top-0 left-0 h-full text-[#FAF7F0] sm:text-[1vw] lg:text-[2vw] font-bold whitespace-nowrap opacity-10 overflow-hidden"
        style={{ writingMode: "vertical-lr" }}
      >
        {"BIO PEEL - ".repeat(40)}
      </span>
      <span
        className="absolute top-0 right-0 h-full text-[#FAF7F0] sm:text-[1vw] lg:text-[2vw] font-bold whitespace-nowrap opacity-10 overflow-hidden"
        style={{ writingMode: "vertical-lr" }}
      >
        {"BIO PEEL - ".repeat(40)}
      </span>
    </>
  );
}

export function TestimonialsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const introRef = useRef<HTMLParagraphElement>(null);
  const trustRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=1000",
          pin: true,
          scrub: 1,
        },
      });

      tl.fromTo(
        titleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5 }
      )
        .fromTo(
          subtitleRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5 },
          "-=0.3"
        )
        .fromTo(
          introRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5 },
          "-=0.3"
        );

      gsap.fromTo(
        trustRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          scrollTrigger: {
            trigger: trustRef.current,
            start: "top bottom-=100px",
            end: "bottom center",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        ctaRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          scrollTrigger: {
            trigger: ctaRef.current,
            start: "top bottom-=100px",
            end: "bottom center",
            toggleActions: "play none none reverse",
          },
        }
      );
      tl.fromTo(
        sectionRef.current,
        { borderBottomLeftRadius: 0, borderBottomRightRadius: 0 },
        {
          borderBottomLeftRadius: "100px",
          borderBottomRightRadius: "100px",
          duration: 0.5,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "bottom bottom",
            end: "bottom bottom",
            toggleActions: "play none play reverse",
          },
        }
      );
    },
    { scope: sectionRef }
  );

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen py-16 overflow-hidden flex items-center justify-center bg-neutral-800"
      id="testSection"
    >
     
      <RepeatingText />
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2
            ref={titleRef}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 opacity-0 text-[#B17457]"
          >
            What Our Users Are Saying
          </h2>
          <p
            ref={subtitleRef}
            className="text-xl md:text-2xl text-[#D8D2C2] mb-4 opacity-0"
          >
            Real Results, Real Confidence
          </p>
          <p
            ref={introRef}
            className="max-w-4xl mx-auto text-neutral-400 opacity-0 text-lg md:text-xl"
          >
            Discover how BIO PEEL has transformed the skincare routines of our
            users, delivering remarkable results and boosting confidence with
            every application.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0">
                  <TestimonialCard testimonial={testimonial} />
                </div>
              ))}
            </div>
          </div>
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-[#D8D2C2] rounded-full p-2 shadow-md hover:scale-110 transition-colors duration-200"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-6 h-6 text-[#B17457]" />
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-[#D8D2C2] rounded-full p-2 shadow-md hover:scale-110 transition-colors duration-200"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-6 h-6 text-[#B17457]" />
          </button>
        </div>
      </div>
    </section>
  );
}
