import BestSellingSection from "@/components/ui/custom/BestSellingSection";
import BlogSection from "@/components/ui/custom/BlogSection";
import CategorySection from "@/components/ui/custom/CategorySection";
import FAQ from "@/components/ui/custom/FAQ";
import FeaturedSection from "@/components/ui/custom/FeaturedSection";
import Newsletter from "@/components/ui/custom/Newsletter";
import TestimonialSection from "@/components/ui/custom/TestimonialSection";
import HeroSection from "@/components/ui/HeroSection";

const Home = () => {
  return (
    <div>
      <HeroSection />
      <BestSellingSection />
      <CategorySection />
      <FeaturedSection />
      <TestimonialSection />
      <BlogSection />
      <FAQ />
      <Newsletter />
    </div>
  );
};

export default Home;
