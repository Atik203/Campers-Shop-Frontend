import BestSellingSection from "@/components/ui/custom/others/BestSellingSection";
import BlogSection from "@/components/ui/custom/others/BlogSection";
import CategorySection from "@/components/ui/custom/others/CategorySection";
import FAQ from "@/components/ui/custom/others/FAQ";
import FeaturedSection from "@/components/ui/custom/others/FeaturedSection";
import HeroSection from "@/components/ui/custom/others/HeroSection";
import Newsletter from "@/components/ui/custom/others/Newsletter";
import TestimonialSection from "@/components/ui/custom/others/TestimonialSection";

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
