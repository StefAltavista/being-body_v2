"use client";
import Concept from "@/content/Concept";
import Practices from "@/components/Practices";
import Container from "@/components/Container";
import BookButton from "@/components/BookButton";
import Welcome from "@/content/Welcome";
import HandBubble from "@/content/HandBubble";
import HomeAboutKatia from "@/content/HomeAboutKatia";

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
      <Container classname="mt-20 mb-12 overflow-visible">
        <h2 className="!mb-6 !text-[34px] font-normal leading-tight sm:!text-[42px]">
          A space to listen
        </h2>
        <HomeAboutKatia />
      </Container>
      <Container classname=" overflow-visible !mx-0">
        <HandBubble />
      </Container>
    </div>
  );
}
