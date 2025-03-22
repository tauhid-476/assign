import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import FeaturesSection from '../components/FeaturesSection';
import Testimonials from '../components/Testimonials';
import CTA from '../components/CTA';
import Footer from '../components/Footer';
import Statistics from '../components/Statistics';

export default function Page() {
  return (
    <div>
      <Navbar />
      <Hero />
      <FeaturesSection />
      <Statistics />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  );
}