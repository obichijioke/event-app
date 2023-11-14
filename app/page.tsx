import Image from "next/image";
import NavBar from "./../components/NavBar";

export default function Home() {
  return (
    <>
      <NavBar />
      <main className="w-full bg-slate-900 p-10 text-white">Main area</main>
    </>
  );
}
