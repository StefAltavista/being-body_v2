import Container from "@/components/Container";
import Contacts from "@/content/Contacts";
import BookAppointment from "@/components/BookAppointment";

import { browserName } from "react-device-detect";

export default function page() {
  const format = browserName == "Safari" ? "png" : "webp";

  return (
    <Container>
      <Contacts format={format} />
      <BookAppointment />;
    </Container>
  );
}
