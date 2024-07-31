import BestSellingSection from "@/components/ui/custom/BestSellingSection";
import CategorySection from "@/components/ui/custom/CategorySection";
import FeaturedSection from "@/components/ui/custom/FeaturedSection";
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
    </div>
  );
};

export default Home;
