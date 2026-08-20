"use client";

import Container from "@/components/Container";
// import Calendar from "@/components/Calendar";
import { useState } from "react";
// import { GoogleEvent } from "@/lib/getCalendar";
// import RequestAppointment from "@/components/Form.RequestAppointment";
import Modal from "@/components/Modal";
import Image from "next/image";
import Background from "@/components/Background";
import { CalBookingEmbed } from "@/components/CalBookingEmbed";
import AppointmentCard, {
  type AppointmentOption,
} from "@/components/AppointmentCard";

const appointmentOptions: AppointmentOption[] = [
  {
    title: "Massage session",
    description:
      "A nourishing, one-to-one massage session shaped around what your body needs that day. We can make space for rest, release, and a gentle return to yourself.",
    image: "/photos/massage1.jpg",
    imageAlt: "Massage session",
  },
  {
    title: "Private Pilates Class",
    description:
      "A private Pilates practice with time to move, strengthen, and reconnect at your own pace. Each class is adapted to support your body and your intentions.",
    image: "/photos/pilates2.jpg",
    imageAlt: "Private Pilates class",
  },
];

export default function BookApointmentPage() {
  // const [event, setEvent] = useState<GoogleEvent>();
  // const [openBooking, setOpenBooking] = useState(false);
  const [selectedAppointment, setSelectedAppointment] =
    useState<AppointmentOption | null>(null);

  // const selectEvent = (event: GoogleEvent) => {
  //   setEvent(event);
  // };

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
      <section className="my-12 flex w-full flex-col gap-10 lg:gap-16">
        {appointmentOptions.map((appointment, index) => (
          <AppointmentCard
            key={appointment.title}
            appointment={appointment}
            imageOnRight={index % 2 === 1}
            onCalendar={() => setSelectedAppointment(appointment)}
          />
        ))}
      </section>

      {selectedAppointment && (
        <Modal close={() => setSelectedAppointment(null)} color="bg-[#f8f5f0]">
          {(requestClose) => (
            <div className="mx-auto flex w-full max-w-5xl flex-col pb-4">
              <div className="mb-6 flex items-start justify-between gap-5">
                <div>
                  <h3 className="!mb-1 !text-[28px] sm:!text-[32px]">
                    Book your {selectedAppointment.title}
                  </h3>
                  <p className="handWrite2 !mt-0 !text-left !text-[18px] sm:!text-[20px]">
                    Choose a date and time that feels right for you.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={requestClose}
                  aria-label="Close calendar"
                  className="shrink-0 rounded-full border border-slate-500/35 bg-white/60 px-4 py-2 !text-[20px] transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-500"
                >
                  Close
                </button>
              </div>
              <CalBookingEmbed
                eventUrl={process.env.NEXT_PUBLIC_CALCOM_EVENT_URL!}
              />
            </div>
          )}
        </Modal>
      )}

      {/* Legacy Google Calendar booking flow, retained for documentation.
      {event && openBooking && (
        <Modal close={() => setOpenBooking(false)} color="bg-green-100">
          {(requestClose) => (
            <RequestAppointment event={event} close={requestClose} />
          )}
        </Modal>
      )}
      <Calendar
        selectEvent={(x) => {
          selectEvent(x);
          setOpenBooking(true);
        }}
      />
      */}
    </Container>
  );
}
