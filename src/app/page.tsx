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
        <BookButton className="my-20" />
      </Container>
      <Container classname="mt-20 overflow-visible">
        <PresentingKatia />
      </Container>

      <Container classname=" overflow-visible mb-80">
        <Techniques />
      </Container>

      <Container classname=" py-10 my-20 h-[100vh] relative !overflow-visible">
        <BodyWelcome />
      </Container>
    </div>
  );
}
