"use client";
import Concept from "@/content/Concept";
import Practices from "@/components/Practices";
import Container from "@/components/Container";
import BookButton from "@/components/BookButton";
import Welcome from "@/content/Welcome";
import AutoCarousel from "@/content/autoCarousel";
import HandBubble from "@/content/HandBubble";
import Image from "next/image";

export default function Home() {
  return (
    <div id="home">
      <Container>
        <Welcome />
      </Container>
      <Container classname="overflow-visible">
        <Concept />
      </Container>
      <Container classname="overflow-visible">
        <Practices />
      </Container>
      <Container>
        <BookButton className=" overflow-visible" />
      </Container>
      {/* <Container classname="mt-20 overflow-visible">
        <PresentingKatia />
      </Container> */}
      <Container classname="mt-20 mb-0 overflow-visible">
        <h2 className="handWrite2 !text-[22px] text-center">
          My intention is to create a space to listen;<br></br>Bring people into
          a place where they can hear themselves, connect with themselves.
        </h2>
        <AutoCarousel />
      </Container>
      <Container classname=" overflow-visible !mx-0">
        <HandBubble />
      </Container>
    </div>
  );
}
