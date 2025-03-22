'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const columnRefs = useRef<(HTMLDivElement | null)[]>([]);
  const logoRef = useRef<HTMLDivElement>(null);

  const addToColumnRefs = (el: HTMLDivElement | null, index: number) => {
    columnRefs.current[index] = el;
  };

  useEffect(() => {
    const footer = footerRef.current;
    const columns = columnRefs.current.filter(Boolean) as HTMLDivElement[];
    const logo = logoRef.current;

    if (!footer || columns.length === 0 || !logo) return;

    // Animate the footer columns with a staggered effect
    gsap.fromTo(
      columns,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: footer,
          start: 'top 90%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    // Animate the logo with a special effect
    gsap.fromTo(
      logo,
      { scale: 0.8, opacity: 0, rotation: -10 },
      {
        scale: 1,
        opacity: 1,
        rotation: 0,
        duration: 0.8,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: footer,
          start: 'top 90%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <footer ref={footerRef} className="relative bg-gray-900 text-white py-12">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-900 to-black opacity-80"></div>
      
      <div className="container relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div ref={(el) => addToColumnRefs(el, 0)} className="text-center md:text-left">
            <div ref={logoRef} className="mb-4">
              <h3 className="text-2xl font-bold">Carbon<span className="text-[var(--green-primary)]">Crunch</span></h3>
            </div>
            <p className="text-gray-400">
              Leading the way in sustainability reporting and ESG compliance solutions.
            </p>
          </div>
          
          <div ref={(el) => addToColumnRefs(el, 1)} className="text-center md:text-left">
            <h4 className="text-lg font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li><Link href="#" className="text-gray-400 hover:text-[var(--green-primary)] transition-colors duration-300">About Us</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-[var(--green-primary)] transition-colors duration-300">Careers</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-[var(--green-primary)] transition-colors duration-300">Contact</Link></li>
            </ul>
          </div>
          
          <div ref={(el) => addToColumnRefs(el, 2)} className="text-center md:text-left">
            <h4 className="text-lg font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><Link href="#" className="text-gray-400 hover:text-[var(--green-primary)] transition-colors duration-300">Blog</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-[var(--green-primary)] transition-colors duration-300">Documentation</Link></li>
              <li><Link href="#" className="text-gray-400 hover:text-[var(--green-primary)] transition-colors duration-300">Partners</Link></li>
            </ul>
          </div>
          
          <div ref={(el) => addToColumnRefs(el, 3)} className="text-center md:text-left">
            <h4 className="text-lg font-semibold mb-4">Connect</h4>
            <div className="flex justify-center md:justify-start space-x-4">
              <Link href="#" className="text-gray-400 hover:text-[var(--green-primary)] transition-colors">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-[var(--green-primary)] transition-colors">
                <span className="sr-only">LinkedIn</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Carbon Crunch. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}