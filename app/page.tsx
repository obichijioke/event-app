import Image from "next/image";
import NavBar from "./../components/NavBar";
import HeroSection from "@/components/home/HeroSection";
import CategorySection from "@/components/home/CategorySection";

export default function Home() {
  return (
    <main className="w-full">
      <HeroSection />
      <CategorySection />
    </main>
  );
}
