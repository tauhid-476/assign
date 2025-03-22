'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navbarRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    // Initial animation
    const navbar = navbarRef.current;
    if (navbar) {
      gsap.fromTo(
        navbar,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }
      );
    }

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  return (
    <div
      ref={navbarRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 
        ${scrolled 
          ? 'bg-gradient-to-r from-black/80 via-black/85 to-black/80 backdrop-blur-lg shadow-lg'
          : 'bg-gradient-to-b from-black/70 to-black/40 backdrop-blur-sm'
        }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="text-white font-bold text-xl flex items-center">
              <div className="mr-2 relative h-8 w-8 bg-gradient-to-r from-green-500 to-green-400 rounded-full flex items-center justify-center transform transition-transform duration-300 hover:scale-110">
                <span className="text-white text-sm font-bold">C</span>
                <span className="text-black text-sm font-bold">C</span>
              </div>
              <div>
                <span className='text-white'>
                  Carbon
                </span>
                <span className='text-green-primary'>
                  Crunch
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {['About', 'Services', 'Case Studies', 'Blog', 'Contact'].map((item) => (
              <Link
                key={item}
                href={`#${item.toLowerCase().replace(' ', '-')}`}
                className="text-white hover:text-green-400 transition-all duration-300 font-medium relative group"
              >
                {item}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-primary transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Link
              href="#contact"
              className="bg-green-primary hover:bg-green-600 text-black px-5 py-2.5 rounded-md font-medium transition-all duration-300 shadow-lg hover:shadow-green-500/30"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              type="button"
              className="flex items-center justify-center p-2 rounded-md text-white hover:text-green-400 focus:outline-none"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className={`h-6 w-6 ${mobileMenuOpen ? 'hidden' : 'block'}`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <svg
                className={`h-6 w-6 ${mobileMenuOpen ? 'block' : 'hidden'}`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden ${
            mobileMenuOpen ? 'block' : 'hidden'
          } pb-4`}
        >
          <div className="flex flex-col space-y-3">
            {['About', 'Services', 'Case Studies', 'Blog', 'Contact'].map((item) => (
              <Link
                key={item}
                href={`#${item.toLowerCase().replace(' ', '-')}`}
                className="text-white hover:text-green-400 py-2 text-base font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item}
              </Link>
            ))}
            <Link
              href="#contact"
              className="bg-green-primary hover:bg-green-600 text-black px-5 py-2.5 rounded-md font-medium transition-colors duration-300 inline-block mt-3 text-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}