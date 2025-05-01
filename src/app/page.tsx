import { BridesMaidSection } from "@/components/ui/homepage/bridesMaidSection";
import { Couple } from "@/components/ui/homepage/couple";
import { Events } from "@/components/ui/homepage/events";
import { Gallery } from "@/components/ui/homepage/gallery";
import { GiftSection } from "@/components/ui/homepage/gift";
import { GroomSection } from "@/components/ui/homepage/groomSection";
import { HeroSection } from "@/components/ui/homepage/hero-section";
import { MobileNav } from "@/components/ui/homepage/mobile-nav";
import { RSVP } from "@/components/ui/homepage/Rsvp";
import { NavigationBar } from "@/components/ui/homepage/site-navBar";
import { WhereWhen } from "@/components/ui/homepage/where-when";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section id="home" className="h-screen">
        <HeroSection />
      </section>

      {/* Mobile and Desktop Navigation */}
     
      <NavigationBar />
      {/* <NavBar /> */}

      {/* Content Sections */}
      <section id="where-when" className="h-screen">
        <WhereWhen />
      </section>

      <section id="couple" className="">
        <Couple />
      </section>

      <section id="gallery" className=" ">
        <Gallery />
      </section>

      <section id="events" className="">
        <Events />
      </section>
      <section id="brides-maid" className="">
        <BridesMaidSection />
      </section>
     
      <section id="grooms-men" className="">
        <GroomSection />
      </section>


      <section id="gifting" className="">
        <GiftSection />
      </section>

      <section id="rsvp" className="h-screen">
        <RSVP />
      </section>
    </>
  );
}
