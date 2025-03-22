'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Feature {
  title: string;
  description: string;
}

const featuresArray: Feature[] = [
  {
    title: 'AUTOMATED DATA COLLECTION',
    description: 'Our system automates data collection, ensuring accurate sustainability reporting.',
  },
  {
    title: 'MONITORING & REPORTING',
    description: 'Efficiently track and report carbon emissions and compliance in sustainability reporting.',
  },
  {
    title: 'SIMPLIFIED CERTIFICATION PROCESS',
    description: 'Streamline your certification process with our system, ensuring faster compliance.',
  },
  {
    title: 'AI-DRIVEN INSIGHTS',
    description: 'Leverage AI-driven insights to uncover hidden impact decision-making.',
  },
  {
    title: 'REAL-TIME ANALYTICS',
    description: 'Get real-time data to monitor your sustainability goals effectively.',
  },
  {
    title: 'CUSTOM REPORTS',
    description: 'Generate tailored reports to meet your specific business needs.',
  },
];

export default function FeaturesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const featuresContainerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const featureRefs = useRef<HTMLDivElement[]>([]);
  const decorativeElementsRef = useRef<HTMLDivElement[]>([]);
  const isMobile = useRef<boolean>(false);

  // Function to populate the ref array
  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !featureRefs.current.includes(el)) {
      featureRefs.current.push(el);
    }
  };

  // Function to populate decorative elements ref array
  const addToDecorativeRefs = (el: HTMLDivElement | null) => {
    if (el && !decorativeElementsRef.current.includes(el)) {
      decorativeElementsRef.current.push(el);
    }
  };

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const container = featuresContainerRef.current;
    const features = featureRefs.current;
    const decorations = decorativeElementsRef.current;

    // Check for mobile device
    isMobile.current = window.innerWidth < 768;

    // If any required element is missing, skip the animation
    if (!section || !heading || !container || features.length === 0) return;

    // Reset refs array on each render
    featureRefs.current = featureRefs.current.slice(0, featuresArray.length);

    // Initial animation for the heading
    gsap.fromTo(heading,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Animate decorative elements
    if (decorations.length > 0) {
      decorations.forEach((decoration, index) => {
        // Initial reveal animation
        gsap.fromTo(decoration,
          { opacity: 0, scale: 0.5 },
          {
            opacity: 0.8,
            scale: 1,
            duration: 1.5,
            delay: index * 0.2,
            ease: "elastic.out(1, 0.5)",
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              toggleActions: "play none none reverse"
            }
          }
        );

        // Continuous floating animation
        gsap.to(decoration, {
          y: `${(index % 2 === 0 ? '-' : '')}20`,
          x: `${(index % 3 === 0 ? '-' : '')}15`,
          rotate: (index % 2 === 0 ? -5 : 5),
          duration: 3 + index,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });

        // Only add parallax scroll effect on desktop
        if (!isMobile.current) {
          gsap.to(decoration, {
            y: (index % 2 === 0 ? 100 : -100),
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            }
          });
        }
      });
    }

    // Create a horizontal scroll effect for desktop only
    if (!isMobile.current) {
      // Horizontal scroll with parallax layers
      gsap.to(container, {
        x: () => -(container.scrollWidth - window.innerWidth + 100),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${container.scrollWidth - window.innerWidth}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        }
      });

      // Staggered entrance and parallax for each feature card
      features.forEach((feature, index) => {
        // Initial entrance animation with 3D rotation
        gsap.fromTo(feature,
          { 
            opacity: 0,
            y: 50,
            rotateY: -15, 
            z: -100,
            transformPerspective: 1000
          },
          {
            opacity: 1,
            y: 0,
            rotateY: 0,
            z: 0,
            duration: 0.8,
            delay: 0.1 * index,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              toggleActions: "play none none reverse"
            }
          }
        );
        
        // Z-axis movement on scroll for 3D effect
        gsap.fromTo(feature,
          { z: 0 },
          {
            z: (index % 2 === 0) ? 50 : -50,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            }
          }
        );
      });
    } else {
      // Mobile-specific layout and animations
      // Set container to vertical layout
      gsap.set(container, { 
        display: 'flex', 
        flexDirection: 'column',
        width: '100%',
        gap: '1rem'
      });
      
      // Simple fade-in animations for mobile
      features.forEach((feature, index) => {
        // Simpler entrance animation without 3D effects
        gsap.fromTo(feature,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            delay: index * 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: feature,
              start: "top 90%",
              toggleActions: "play none none reverse"
            }
          }
        );
        
        // Simpler animation for icon
        gsap.to(feature.querySelector('.feature-icon'), {
          scale: 1.05,
          duration: 1.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });
      });
    }

    // Handle resize event
    const handleResize = () => {
      if ((window.innerWidth < 768 && !isMobile.current) || 
          (window.innerWidth >= 768 && isMobile.current)) {
        // Refresh page if switching between mobile and desktop
        window.location.reload();
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      // Clean up ScrollTrigger instances and event listeners
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section ref={sectionRef} id="features" className="py-20 overflow-hidden relative perspective">
      {/* Enhanced gradient overlay with multiple layers for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-gray-100 opacity-10 pointer-events-none"></div>
      
      {/* Decorative floating elements for parallax effect */}
      <div ref={(el) => addToDecorativeRefs(el as HTMLDivElement)} 
        className="absolute top-20 left-[10%] w-40 h-40 rounded-full bg-green-400/10 blur-2xl animate-glow"></div>
      <div ref={(el) => addToDecorativeRefs(el as HTMLDivElement)} 
        className="absolute bottom-40 right-[15%] w-60 h-60 rounded-full bg-blue-300/10 blur-3xl animate-glow"></div>
      <div ref={(el) => addToDecorativeRefs(el as HTMLDivElement)} 
        className="absolute top-1/3 right-[25%] w-24 h-24 rounded-full bg-green-500/5 blur-xl"></div>
      <div ref={(el) => addToDecorativeRefs(el as HTMLDivElement)} 
        className="absolute top-2/3 left-[20%] w-32 h-32 rounded-full bg-cyan-300/10 blur-xl"></div>
      
      <div className="container relative z-10">
        <div className="text-center" ref={headingRef}>
          <h2 className="section-title">
            WHY <span className="text-[var(--green-primary)]">Carbon Crunch?</span>
          </h2>
          <p className="mt-2 text-[var(--green-primary)] uppercase">Features</p>
        </div>

        <div 
          ref={featuresContainerRef} 
          className="mt-20 flex gap-8 md:w-[200%] preserve-3d"
        >
          {featuresArray.map((feature, index) => (
            <div
              ref={(el) => addToRefs(el as HTMLDivElement)}
              key={index}
              className="feature-card flex-shrink-0 md:w-[calc(33.333%-1rem)] w-full bg-white/80 backdrop-blur-sm p-8 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-green-500/20 preserve-3d"
              style={{ 
                transformStyle: 'preserve-3d', 
                transform: `translateZ(${index * 5}px)` 
              }}
            >
              <div className="feature-icon mb-4 relative preserve-3d" style={{ transform: 'translateZ(20px)' }}>
                <div className="absolute -inset-2 bg-gradient-to-r from-green-400/20 to-cyan-300/20 rounded-xl blur-sm"></div>
                <Image 
                  src="/cube.png" 
                  alt="Feature Icon" 
                  width={60} 
                  height={60}
                  className="transition-all duration-300 hover:rotate-12 rounded-xl relative z-10" 
                />
              </div>
              <h3 className="text-xl text-green-primary font-bold mb-3 preserve-3d" style={{ transform: 'translateZ(15px)' }}>
                {feature.title}
              </h3>
              <p className="text-gray-600 preserve-3d" style={{ transform: 'translateZ(10px)' }}>
                {feature.description}
              </p>
              <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-green-400 to-cyan-300 rounded-b-lg" 
                style={{ width: `${(index + 1) * 16.66}%` }}></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}