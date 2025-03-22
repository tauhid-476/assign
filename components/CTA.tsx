'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function CTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    const button = buttonRef.current;

    if (!section || !content || !button) return;

    // Create revealing animation on scroll
    gsap.fromTo(
      content,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    // Create pulsing animation for the button
    gsap.to(button, {
      scale: 1.05,
      duration: 0.8,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
    });

    // Create a parallax effect for the background
    gsap.to(section, {
      backgroundPosition: '50% 30%',
      scrollTrigger: {
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-20 bg-cover bg-center relative"
      style={{ 
        backgroundImage: 'url(/cta-bg.jpg)',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/75 to-gray-900/90"></div>
      
      <div className="container relative z-10">
        <div
          ref={contentRef}
          className="max-w-2xl mx-auto text-center text-white"
        >
          <h2 className="text-3xl font-bold">Ready to Transform Your Sustainability Reporting?</h2>
          <p className="mt-4 text-lg">
            Join thousands of companies worldwide using Carbon Crunch to streamline their
            ESG reporting and achieve sustainability goals.
          </p>
          <button
            ref={buttonRef}
            className="mt-8 px-8 py-4 bg-[var(--green-primary)] text-white rounded-lg hover:bg-green-600 transition-all duration-300 shadow-lg hover:shadow-green-500/30"
          >
            Get Started Now
          </button>
        </div>
      </div>
    </section>
  );
}