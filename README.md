# Carbon Crunch - Interactive Sustainability Platform

This project showcases advanced animation techniques using GSAP and ScrollTrigger to create an engaging, interactive experience for a sustainability reporting platform.

## What I Built

I created a modern web application for Carbon Crunch - a platform that helps companies track and report their sustainability metrics. The highlight of this project is the extensive use of animated UI elements that create a sense of depth and engagement throughout the site.

### Animation Approach

I wanted to push beyond typical web animations and create something that feels alive and responsive. After trying a few animation libraries, I settled on GSAP with ScrollTrigger because it gave me precise control over complex animation sequences and scroll-based effects.

Here's how I approached the animations for each major section:

#### Hero Section
- Created layered parallax effects where background elements move at different speeds during scrolling
- Added entrance animations with staggered timing for headings, paragraphs, and call-to-action buttons
- Implemented subtle floating decorative elements that respond to scroll position
- Used gradient overlays that shift position based on scroll for added visual interest

#### Features Section
- Built a horizontal scroll experience (on desktop) that transforms into a vertical card layout on mobile
- Used 3D transformations for each feature card to create a sense of depth
- Added parallax scrolling where cards move at different rates and angles
- Implemented subtle hover animations for interactive elements
- Created continuous floating animations for decorative elements in the background
- Handled the mobile/desktop transition with specific optimizations for each view

#### Statistics Section
- Designed animated counter effects that trigger when the statistics come into view
- Implemented a rocket animation that follows a path as users scroll
- Created floating card effects with subtle movement to draw attention
- Added 3D transformations to create a sense of depth and layering

#### Testimonials Component
- Built a full 3D parallax slider with smooth transitions between testimonials
- Created layered elements that move at different speeds during transitions
- Added parallax backgrounds that respond to scroll position
- Implemented custom navigation with interactive indicators

### Technical Implementation Details

- Used React's `useRef` and `useEffect` hooks to integrate GSAP with the component lifecycle
- Leveraged TypeScript for type safety across all animation configurations
- Created responsive animations that adapt to different screen sizes and devices
- Implemented performance optimizations to ensure smooth animations even on mobile
- Used CSS variables for consistent animation timing and easing across components

### Challenges and Solutions

The biggest challenge was maintaining smooth performance while implementing complex 3D and parallax effects, especially on mobile devices. I solved this by:

1. Carefully optimizing animations for mobile with simpler effects when needed
2. Using hardware acceleration where appropriate (`transform: translateZ(0)`)
3. Implementing conditional animation logic based on device capabilities
4. Managing cleanup of animation instances to prevent memory leaks

## Getting Started

To run this project locally:

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Technology Stack

- Next.js for the frontend framework
- TypeScript for type safety
- GSAP and ScrollTrigger for animations
- Tailwind CSS for styling

## What I Learned

Building this project deepened my understanding of advanced animation concepts like:
- Managing complex animation timelines
- Creating consistent animation systems across components
- Optimizing performance for scroll-based animations
- Implementing responsive animations that work across devices
- Using 3D transformations to create depth and visual interest

I'm particularly proud of the seamless integration between scroll-based effects and interactive elements, creating an experience that feels both guided and exploratory for users.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
