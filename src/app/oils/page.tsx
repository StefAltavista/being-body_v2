import Container from "@/components/Container";
import Aroma from "@/content/Aroma";
import { browserName } from "react-device-detect";

export default function page() {
  const format = browserName == "Safari" ? "png" : "webp";

  return (
    <Container>
      <Aroma format={format} />
    </Container>
  );
}
