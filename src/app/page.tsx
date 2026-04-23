"use client";
import Concept from "@/content/Concept";
import Practices from "@/components/Practices";
import Container from "@/components/Container";
import BookButton from "@/components/BookButton";
import Techniques from "@/content/Techniques";
import BodyWelcome from "@/content/BodyWelcome";
import Welcome from "@/content/Welcome";
import HandsSection from "@/content/HandsSection";

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
      <Container classname="overflow-visible">
        <HandsSection />
      </Container>
      <Container classname="py-10">
        <Techniques />
      </Container>
      <Container classname=" py-10 my-20 h-[100vh] relative !overflow-visible">
        <BodyWelcome />
      </Container>
    </div>
  );
}
