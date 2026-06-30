"use client";

import Container from "@/components/Container";
import Calendar from "@/components/Calendar";
import { useState } from "react";
import { GoogleEvent } from "@/lib/getCalendar";
import RequestAppointment from "@/components/Form.RequestAppointment";
import Modal from "@/components/Modal";
import Prices from "@/content/MassagePrices";
import Image from "next/image";
import Background from "@/components/Background";

export default function BookApointmentPage() {
  const [event, setEvent] = useState<GoogleEvent>();
  const [openBooking, setOpenBooking] = useState(false);

  const selectEvent = (event: GoogleEvent) => {
    setEvent(event);
  };

  return (
    <Container classname=" w-full justify-start items-start mt-10 overflow-hidden ">
      <Background rotate={100} />
      <div className="flex">
        <Image
          className="mr-6 brightness-0"
          src={"/icons/feather.svg"}
          width={40}
          height={40}
          alt="icon"
        />
        <h1>Book an appointment </h1>
      </div>
      <p className="!text-left  lg:max-w-[60%] w-full handWrite2 !mt-16">
        My session options vary in length, and are all offered on a sliding
        scale, so the prices are based on what people can offer within range
      </p>
      <div className="w-full flex flex-row justify-center my-12">
        <div className="w-full flex flex-col justify-center items-center">
          {event && openBooking && (
            <Modal close={() => setOpenBooking(false)} color="bg-green-100">
              {(requestClose) => (
                <RequestAppointment event={event} close={requestClose} />
              )}
            </Modal>
          )}

          <div className="w-full flex flex-col lg:flex-row-reverse justify-center items-center lg:items-start gap-8 mb-8">
            <div className="w-full flex flex-col items-center lg:max-w-[50%]">
              <Prices />

              <h3 className="hidden lg:block pt-12 text-left handWrite2">
                * Feel free to chose what works best for you, if you need to
                adjust timings you can send me a message during reservation
                process
              </h3>
            </div>

            <div className="w-full md:max-w-[80%] lg:max-w-[50%]">
              <h3 className="!text-[26px] w-full pb-2">Current Availability</h3>

              <Calendar
                selectEvent={(x) => {
                  selectEvent(x);
                  setOpenBooking(true);
                }}
              />
            </div>
          </div>

          <h3 className="lg:hidden pt-8 text-left handWrite2">
            * Feel free to chose what works best for you, if you need to adjust
            timings you can send me a message during reservation process
          </h3>
        </div>
      </div>
    </Container>
  );
}
