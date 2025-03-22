"use client"
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const paragraphRef = useRef<HTMLParagraphElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const backgroundRef = useRef<HTMLDivElement | null>(null);
  const overlay1Ref = useRef<HTMLDivElement | null>(null);
  const overlay2Ref = useRef<HTMLDivElement | null>(null);
  const overlay3Ref = useRef<HTMLDivElement | null>(null);
  const floatingItemsRef = useRef<HTMLDivElement[]>([]);

  // Add to floating items ref array
  const addToFloatingRefs = (el: HTMLDivElement | null) => {
    if (el && !floatingItemsRef.current.includes(el)) {
      floatingItemsRef.current.push(el);
    }
  };

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const paragraph = paragraphRef.current;
    const button = buttonRef.current;
    const background = backgroundRef.current;
    const overlay1 = overlay1Ref.current;
    const overlay2 = overlay2Ref.current;
    const overlay3 = overlay3Ref.current;
    const floatingItems = floatingItemsRef.current;

    // Timeline for initial entrance animation
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    
    tl.fromTo(background, 
      { scale: 1.2, opacity: 0 }, 
      { scale: 1, opacity: 1, duration: 1.5 }
    )
    .fromTo([overlay1, overlay2, overlay3],
      { opacity: 0 },
      { opacity: 1, stagger: 0.2, duration: 1 },
      "-=1"
    )
    .fromTo(heading, 
      { y: 50, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.8 }, 
      "-=0.8"
    )
    .fromTo(paragraph, 
      { y: 30, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.8 }, 
      "-=0.6"
    )
    .fromTo(button, 
      { y: 20, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.6 }, 
      "-=0.4"
    )
    .fromTo(floatingItems,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.1, duration: 1 },
      "-=0.4"
    );

    // Parallax scroll effect for background
    gsap.to(background, {
      y: '30%',
      scale: 1.1,
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
        markers: false,
      },
    });

    // Parallax effect for overlays at different speeds
    gsap.to(overlay1, {
      y: '10%',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: 'bottom top',
        scrub: 0.5,
      },
    });

    gsap.to(overlay2, {
      y: '20%',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: 'bottom top',
        scrub: 0.7,
      },
    });

    gsap.to(overlay3, {
      y: '15%',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: 'bottom top',
        scrub: 0.9,
      },
    });

    // Fade out text elements as they scroll
    gsap.to('.hero-content', {
      y: '-30%',
      opacity: 0,
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: 'center top',
        scrub: true,
      },
    });

    // Animate floating decoration elements
    floatingItems.forEach((item, index) => {
      // Create continuous floating movement
      gsap.to(item, {
        y: (index % 2 === 0) ? 15 : -15,
        x: (index % 3 === 0) ? 10 : -10,
        rotation: (index % 2 === 0) ? 5 : -5,
        duration: 3 + (index * 0.5),
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Create parallax effect on scroll
      gsap.to(item, {
        y: (index % 2 === 0) ? 100 : -100,
        opacity: 0,
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'center top',
          scrub: true,
        },
      });
    });

    return () => {
      // Clean up all ScrollTriggers when component unmounts
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="hero relative h-screen overflow-hidden perspective">
      <div
        ref={backgroundRef}
        className="hero-bg absolute inset-0 bg-cover bg-center transform-gpu will-change-transform"
        style={{ backgroundImage: 'url(/hero-bg.jpg)' }}
      ></div>
      
      {/* Layered overlays for depth */}
      <div ref={overlay1Ref} className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-transparent will-change-transform"></div>
      <div ref={overlay2Ref} className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50 will-change-transform"></div>
      <div ref={overlay3Ref} className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent will-change-transform"></div>
      
      {/* Floating decorative elements */}
      <div ref={addToFloatingRefs} className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-green-500/10 blur-2xl"></div>
      <div ref={addToFloatingRefs} className="absolute bottom-1/3 right-1/4 w-40 h-40 rounded-full bg-blue-500/10 blur-3xl"></div>
      <div ref={addToFloatingRefs} className="absolute top-1/2 left-2/3 w-24 h-24 rounded-full bg-cyan-500/10 blur-xl"></div>
      <div ref={addToFloatingRefs} className="absolute top-1/3 right-1/3 w-16 h-16 rounded-full bg-green-400/20 blur-lg"></div>
      
      {/* Geometric accent shapes */}
      <div ref={addToFloatingRefs} className="absolute top-[30%] left-[10%] w-24 h-24 border border-green-500/20 rounded-full"></div>
      <div ref={addToFloatingRefs} className="absolute bottom-[20%] right-[15%] w-16 h-16 border border-blue-400/30 rounded-full"></div>
      
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white">
        <div className="container text-center hero-content relative z-10 perspective-1000">
          <h1 ref={headingRef} className="text-5xl md:text-6xl font-bold leading-tight transform-gpu">
            Welcome to <br/><span className="text-[var(--green-primary)]">Carbon Crunch</span>
          </h1>
          <p ref={paragraphRef} className="mt-6 text-xl md:text-2xl max-w-2xl mx-auto transform-gpu">
            Leading the way in sustainability reporting with cutting-edge technology
          </p>
          <button ref={buttonRef} className="btn-primary mt-8 text-lg px-8 py-4 transform hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-green-500/30">
            Get Started
          </button>
        </div>
      </div>
    </section>
  );
}