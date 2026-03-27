import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20 pointer-events-none" />
      
      <Navigation />
      <Hero />      
    </main>
  );
}