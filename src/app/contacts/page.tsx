import Container from "@/components/Container";
import Contacts from "@/content/Contacts";
import BookAppointment from "@/components/BookAppointment";

import { browserName } from "react-device-detect";

export default function page() {
  const format = browserName == "Safari" ? "png" : "webp";

  return (
    <Container classname="justify-start items-start">
      <div className="flex flex-row  justify-center my-12">
        <div className="w-1/3 mr-6 ">
          <BookAppointment />
        </div>
        <div className="w-1/3">
          <h3>Book an appointment</h3>
          <p>Feel Free to contact me to discuss availability!</p>
          <p className="!mt-4">
            {" "}
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <p className="handWrite1 !text-[15px] !mt-4">
            * All informations are held in strictest confidence. At no given
            point is information disclosed or shared without client`s consent.
            You may choose to skip answering any question you feel impinges on
            personal information you do not wish to disclose.
          </p>
        </div>
      </div>
      <Contacts format={format} />
    </Container>
  );
}
