import Container from "@/components/Container";
import Massage from "@/content/Massage";
import Prices from "@/content/Prices";
import { browserName } from "react-device-detect";

export default function page() {
  const format = browserName == "Safari" ? "png" : "webp";

  return (
    <Container>
      <Massage format={format} />

      <Prices format={format} />
    </Container>
  );
}
