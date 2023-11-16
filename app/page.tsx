import HeroSection from "@/components/home/HeroSection";
import CategorySection from "@/components/home/CategorySection";
import ExploreEvents from "@/components/home/ExploreEvents";

export default function Home() {
  return (
    <main className="w-full">
      <HeroSection />
      <CategorySection />
      <ExploreEvents />
    </main>
  );
}
