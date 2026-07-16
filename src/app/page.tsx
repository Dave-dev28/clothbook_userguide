import { ThreadLine } from "@/components/ThreadLine";
import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { VoiceAgent } from "@/components/sections/VoiceAgent";
import { DesignStudio } from "@/components/sections/DesignStudio";
import { BuiltForYou } from "@/components/sections/BuiltForYou";
import { MoreFeatures } from "@/components/sections/MoreFeatures";
import { WaitlistForm } from "@/components/sections/WaitlistForm";
import { Footer } from "@/components/sections/Footer";

/**
 * Section order matches PRD §4.
 * Stable anchors: #hero #how-it-works #voice-agent #design-studio
 * #built-for-you #more #join #footer
 */
export default function Home() {
  return (
    <>
      <Header />
      <main className="relative flex-1">
        {/* Static spine for no-JS / pre-hydration; animated ThreadLine enhances */}
        <div className="thread-fallback" aria-hidden="true" />
        <ThreadLine />
        <Hero />
        <HowItWorks />
        <VoiceAgent />
        <DesignStudio />
        <BuiltForYou />
        <MoreFeatures />
        <WaitlistForm />
      </main>
      <Footer />
    </>
  );
}
