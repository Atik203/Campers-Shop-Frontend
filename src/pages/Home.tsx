import HeroSection from "@/components/ui/HeroSection";
import MapEmbed from "@/components/ui/MapEmbed";

const Home = () => {
  return (
    <div>
      <HeroSection />
      <section className="px-4 mx-auto">
        <div className="p-4 md:p-8 text-center lg:p-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
            Our Location
          </h2>
          <p className="text-base md:text-lg lg:text-xl mb-6">
            Find us at our store location using the map below:
          </p>
        </div>
        <MapEmbed />
      </section>
    </div>
  );
};

export default Home;
