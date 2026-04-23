import Container from "@/components/Container";
import About from "@/content/About";
import { browserName } from "react-device-detect";

export default function AboutPage() {
  const format = browserName == "Safari" ? "png" : "webp";

  return (
    <Container>
      <About format={format} />
    </Container>
  );
}
