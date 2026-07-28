import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Categories from "@/components/Categories";
import HowItWorks from "@/components/HowItWorks";
import FeaturedBusinesses from "@/components/FeaturedBusinesses";
import Stats from "@/components/Stats";
import Testimonials from "@/components/Testimonials";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
     <main>
      <Hero />
      <About />
      {/* <Categories /> */}
      <HowItWorks />
      {/* <FeaturedBusinesses /> */}
      <Stats />
      <Testimonials />
      <CTA />
    </main>
  );
}
