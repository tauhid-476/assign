'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { 
    value: 3, 
    unit: 'X', 
    description: 'ESG High Performers Deliver A Higher Total Shareholder Return',
    bgColor: 'bg-[var(--green-primary)]',
    textColor: 'text-black'
  },
  { 
    value: 98, 
    unit: '%', 
    description: 'Of CEOs Agree Sustainability Is Their Responsibility',
    bgColor: 'bg-gray-800',
    textColor: 'text-white'
  },
  { 
    value: 37, 
    unit: '%', 
    description: 'Of The World\'s Largest Companies Have A Public Net Zero Target. Nearly All Are Off Track',
    bgColor: 'bg-white',
    textColor: 'text-black',
    accentColor: 'border-l-4 border-blue-500'
  },
  {
    value: 18,
    unit: '%',
    description: 'Of Companies Are Cutting Emissions Fast Enough To Reach Net Zero By 2050',
    bgColor: 'bg-gray-700',
    textColor: 'text-white',
    accentColor: 'border-l-4 border-blue-500'
  }
];

export default function Statistics() {
  const sectionRef = useRef<HTMLElement>(null);
  const statsContainerRef = useRef<HTMLDivElement>(null);
  const statRefs = useRef<HTMLDivElement[]>([]);
  const rocketRef = useRef<HTMLDivElement>(null);

  // Function to add to refs array
  const addToStatRefs = (el: HTMLDivElement | null) => {
    if (el && !statRefs.current.includes(el)) {
      statRefs.current.push(el);
    }
  };

  // Function to animate numbers counting up
  const animateValue = (obj: HTMLElement, start: number, end: number, duration: number) => {
    if (!obj) return;
    
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const currentValue = Math.floor(progress * (end - start) + start);
      obj.innerHTML = `${currentValue}${obj.getAttribute('data-unit') || ''}`;
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        obj.innerHTML = `${end}${obj.getAttribute('data-unit') || ''}`;
      }
    };
    window.requestAnimationFrame(step);
  };

  useEffect(() => {
    const section = sectionRef.current;
    const statsContainer = statsContainerRef.current;
    const statElements = statRefs.current;
    const rocket = rocketRef.current;

    if (!section || !statsContainer || statElements.length === 0 || !rocket) return;
    
    // Clear refs on re-render
    statRefs.current = statRefs.current.slice(0, stats.length);

    // Animate the rocket image
    gsap.fromTo(rocket,
      { x: -100, opacity: 0, rotation: -5 },
      {
        x: 0,
        opacity: 1,
        rotation: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Create a staggered animation for the stats cards
    gsap.fromTo(statElements,
      { x: 100, opacity: 0 },
      { 
        x: 0, 
        opacity: 1, 
        stagger: 0.2,
        duration: 0.8,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: statsContainer,
          start: "top 80%",
          toggleActions: "play none none reverse",
          onEnter: () => {
            // Animate the counter values when stats come into view
            document.querySelectorAll('.counter-value').forEach((counter) => {
              const el = counter as HTMLElement;
              const value = parseInt(el.getAttribute('data-value') || '0', 10);
              animateValue(el, 0, value, 2000);
            });
          }
        }
      }
    );

    // Create floating animation for rocket
    gsap.to(rocket, {
      y: 20,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut"
    });

    // Create parallax effects on individual cards
    statElements.forEach((statElement, index) => {
      gsap.fromTo(
        statElement,
        { y: 10 },
        {
          y: -10 + (index * 5), // Offset each card differently
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
          delay: index * 0.1
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-100 via-gray-50 to-gray-200"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center">
          {/* Rocket Image - Left Side */}
          <div 
            ref={rocketRef} 
            className="md:w-2/5 mb-10 md:mb-0 flex justify-center items-center transform transition-all duration-500"
          >
            <div className="relative w-64 h-64 md:w-80 md:h-80">
              <Image 
                src="/rocket.png" 
                alt="Rocket illustration" 
                layout="fill" 
                objectFit="contain"
                className="drop-shadow-xl"
                priority 
              />
            </div>
          </div>

          {/* Stats Cards - Right Side */}
          <div
            ref={statsContainerRef}
            className="md:w-3/5 grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {stats.map((stat, index) => (
              <div 
                key={index}
                ref={(el) => addToStatRefs(el as HTMLDivElement)}
                className={`rounded-lg overflow-hidden relative shadow-lg h-40 flex flex-col justify-center ${stat.bgColor} ${stat.textColor} ${stat.accentColor || ''} transition-all duration-300 hover:shadow-xl`}
              >
                <div className="p-5 md:p-6">
                  <h3 className="text-4xl font-bold mb-2">
                    <span 
                      className="counter-value" 
                      data-value={stat.value} 
                      data-unit={stat.unit}
                    >
                      {stat.value}{stat.unit}
                    </span>
                  </h3>
                  <p className="text-sm md:text-base font-medium line-clamp-2">
                    {stat.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}