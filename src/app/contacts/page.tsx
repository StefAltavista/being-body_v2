"use client";
import Container from "@/components/Container";
import Contacts from "@/content/Contacts";
import BookAppointment from "@/components/BookAppointment";

import { browserName } from "react-device-detect";

import Calendar from "@/components/Calendar";
import { useEffect, useState } from "react";
import { reserveSpot } from "@/lib/reserveSpot";

export default function Contact() {
  const format = browserName == "Safari" ? "png" : "webp";
  const [event, setEvent] = useState();
  const selectEvent = (event) => {
    setEvent(event);
  };
  return (
    <Container classname="justify-start items-start">
      <div className="flex flex-row  justify-center my-12">
        <div className=" w-1/3 mr-2">
          <BookAppointment />
        </div>
        <div className="w-2/3">
          <h3>Book an appointment</h3>
          <p>Feel Free to contact me to discuss availability!</p>
          {event && (
            <div className=" w-full flex items-center border border-blue-100 rounded p-2 mb-2 bg-blue-100">
              <p>{`${event.start?.split("T")[0]} ${event.start
                ?.split("T")[1]
                .slice(0, 5)}`}</p>{" "}
              <button
                className=" bg-violet-200 rounded p-2 m-2"
                onClick={() => reserveSpot(event, "message will appear here")}
              >
                Reserve spot
              </button>
            </div>
          )}
          <Calendar selectEvent={(x) => selectEvent(x)} />
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
