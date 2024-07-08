import Hero from "./Hero";
import Working from "./Working";
import Demo from "./Demo";
import Footer from "./Footer";

export default function Landing() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <main className="flex-1">
        <Hero />
        <Working />
        <Demo />
      </main>
      <Footer />
    </div>
  );
}
