"use client"
import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  { 
    quote: 'Carbon Crunch has revolutionized our sustainability reporting. Their platform is intuitive and provides insights we never had access to before.',
    author: 'Sarah Johnson',
    role: 'Sustainability Director, TechGreen Inc.'
  },
  { 
    quote: 'The AI-driven insights are a game-changer for our business. We\'ve been able to reduce our carbon footprint by 30% in just six months.',
    author: 'Michael Chen',
    role: 'COO, Eco Solutions'
  },
  { 
    quote: 'Real-time analytics helped us stay on track with our goals. Carbon Crunch\'s reporting tools have simplified our ESG compliance process dramatically.',
    author: 'Elena Rodriguez',
    role: 'ESG Compliance Manager, Global Retail'
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const slidesContainerRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const parallaxLayersRef = useRef<(HTMLDivElement | null)[]>([]);
  const backgroundRef = useRef<HTMLDivElement>(null);

  // Set up slide refs
  const addToSlideRefs = (el: HTMLDivElement | null, index: number) => {
    slideRefs.current[index] = el;
  };

  // Set up parallax layer refs
  const addToParallaxLayersRef = (el: HTMLDivElement | null, index: number) => {
    parallaxLayersRef.current[index] = el;
  };

  // Auto-transition between slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    
    return () => clearInterval(interval);
  }, []);

  // Handle animations when the current slide changes
  useEffect(() => {
    const slides = slideRefs.current.filter(Boolean);
    if (slides.length === 0) return;

    // Hide all slides
    gsap.set(slides, { 
      opacity: 0,
      scale: 0.8,
      rotateY: -15,
      x: '100%',
    });

    // Show current slide with animation
    gsap.to(slides[current], {
      opacity: 1, 
      scale: 1,
      rotateY: 0,
      x: '0%',
      duration: 1.2,
      ease: "power3.out",
      clearProps: 'transform'
    });

    // Animate parallax layers with different speeds
    const layers = parallaxLayersRef.current.filter(Boolean);
    
    layers.forEach((layer, index) => {
      const direction = index % 2 === 0 ? 1 : -1;
      
      gsap.fromTo(layer,
        { x: direction * -50, opacity: 0.5 },
        { 
          x: direction * 50, 
          opacity: 1,
          duration: 1.5,
          ease: "power1.inOut"
        }
      );
    });

  }, [current]);

  // Set up initial animations and scroll effects
  useEffect(() => {
    const section = sectionRef.current;
    const slidesContainer = slidesContainerRef.current;
    const background = backgroundRef.current;
    
    if (!section || !slidesContainer || !background) return;

    // Initial animation for the section
    gsap.fromTo(
      slidesContainer,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );
    
    // Parallax background effect on scroll
    gsap.to(background, {
      backgroundPositionY: '30%',
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      }
    });

    // Parallax effect for the testimonial slider
    gsap.to(slidesContainer, {
      y: -50,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        scrub: 0.5,
      }
    });

    // Dynamic parallax for decorative elements
    const parallaxLayers = parallaxLayersRef.current.filter(Boolean);
    
    parallaxLayers.forEach((layer, index) => {
      const speed = 0.1 * (index + 1);
      const direction = index % 2 === 0 ? -1 : 1;
      
      gsap.to(layer, {
        y: direction * 50 * speed,
        x: direction * 30 * speed,
        rotate: direction * 5 * speed,
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        }
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  // Handle manual slide change
  const goToSlide = (index: number) => {
    setCurrent(index);
  };

  return (
    <section 
      ref={sectionRef} 
      className="relative py-24 overflow-hidden min-h-[600px] perspective"
    >
      {/* Background with gradient */}
      <div 
        ref={backgroundRef}
        className="absolute inset-0 bg-gradient-to-b from-gray-200 via-gray-100 to-white"
      ></div>
      
      {/* Decorative circle elements that move at different speeds */}
      <div ref={(el) => addToParallaxLayersRef(el, 0)} className="absolute top-1/3 left-1/4 w-32 h-32 rounded-full bg-gradient-to-r from-green-300/20 to-green-100/10 blur-lg"></div>
      <div ref={(el) => addToParallaxLayersRef(el, 1)} className="absolute bottom-1/4 right-1/5 w-40 h-40 rounded-full bg-gradient-to-r from-blue-200/20 to-green-200/10 blur-xl"></div>
      <div ref={(el) => addToParallaxLayersRef(el, 2)} className="absolute top-1/2 right-1/3 w-24 h-24 rounded-full bg-gradient-to-r from-green-400/10 to-blue-300/5 blur-md"></div>
      <div ref={(el) => addToParallaxLayersRef(el, 3)} className="absolute bottom-1/3 left-1/3 w-36 h-36 rounded-full bg-gradient-to-r from-yellow-200/10 to-green-300/5 blur-lg"></div>
      
      {/* Content container */}
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-4xl font-bold text-center text-[var(--green-primary)] mb-16">
          What Our Clients Say
        </h2>
        
        {/* Slider container with perspective */}
        <div 
          ref={slidesContainerRef} 
          className="max-w-4xl mx-auto relative perspective-1000"
        >
          {/* Testimonial slides */}
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              ref={(el) => addToSlideRefs(el, index)}
              className={`testimonial-slide bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-lg transform transition-all duration-700 absolute inset-0 ${
                index === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Quote mark decoration */}
              <div className="absolute top-4 left-8 text-8xl text-green-400/20 font-serif leading-none">&ldquo;</div>
              
              <div className="relative z-10">
                <p className="text-xl md:text-2xl text-center font-medium italic text-gray-700 mb-8">
                  {testimonial.quote}
                </p>
                
                <div className="text-center">
                  <div className="w-12 h-1 bg-green-400 mx-auto mb-4"></div>
                  <p className="font-bold">{testimonial.author}</p>
                  <p className="text-gray-500 text-sm">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
          
          {/* Navigation dots */}
          <div className="flex justify-center gap-3 mt-12 relative z-20">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-10 h-2 rounded-full transition-all duration-300 ${
                  index === current ? 'bg-[var(--green-primary)] w-16' : 'bg-gray-300'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
          
          {/* Navigation arrows */}
          <button 
            onClick={() => goToSlide((current - 1 + testimonials.length) % testimonials.length)}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 bg-white/80 rounded-full w-10 h-10 flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 z-20"
            aria-label="Previous testimonial"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button 
            onClick={() => goToSlide((current + 1) % testimonials.length)}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 bg-white/80 rounded-full w-10 h-10 flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 z-20"
            aria-label="Next testimonial"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}