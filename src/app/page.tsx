import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Mission } from "@/components/mission";
import { ProblemSolution } from "@/components/problem-solution";
import { ProvocationResponse } from "@/components/provocation-response";
import { Process } from "@/components/process";
import { Architecture } from "@/components/architecture";
import { Readiness } from "@/components/readiness";
import { Milestones } from "@/components/milestones";
import { Team } from "@/components/team";
import { CTA } from "@/components/cta";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Mission />
        <ProblemSolution />
        <ProvocationResponse />
        <Process />
        <Architecture />
        <Readiness />
        <Milestones />
        <Team />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
