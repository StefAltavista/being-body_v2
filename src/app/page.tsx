"use client";
import Concept from "@/content/Concept";
import Practices from "@/components/Practices";
import Container from "@/components/Container";
import BookButton from "@/components/BookButton";
import Techniques from "@/content/Techniques";
import BodyWelcome from "@/content/BodyWelcome";
import Welcome from "@/content/Welcome";
import PresentingKatia from "@/content/PresentingKatia";

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
      <Container classname="mt-20 overflow-visible">
        <PresentingKatia />
      </Container>
      <Container classname=" overflow-visible my-40">
        <Techniques />
      </Container>

      <Container classname="  h-[100vh] relative !px-0 !m-0 !min-w-[100vw]">
        <BodyWelcome />
      </Container>
    </div>
  );
}
