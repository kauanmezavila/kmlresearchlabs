import Hero from "@/components/hero";
import Stats from "@/components/stats";
import Testimonials from "@/components/testimonials";
import Projects from "@/components/projects";
import Footer from "@/components/footer";

import { Separator } from "@/components/ui/separator";

export default function Home() {
  return (
    <main className="flex flex-col min-h-dvh">
      <Hero />
      <Separator />
      <Testimonials />
      <Separator />
      <Stats />
      <Separator />
      <Projects />
      <Footer />
    </main>
  );
}
