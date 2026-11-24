"use client";

import Container from "@/components/Container";
import { useState } from "react";

import Modal from "@/components/Modal";
import Image from "next/image";
import Background from "@/components/Background";
import { CalBookingEmbed } from "@/components/CalBookingEmbed";
import AppointmentCard, {
  type AppointmentOption,
} from "@/components/AppointmentCard";
import SendMessageForm from "@/components/Form.SendMessage";

const appointmentOptions: AppointmentOption[] = [
  {
    id: "massage",
    title: "Massage session",
    description:
      "A nourishing, one-to-one massage session shaped around what your body needs that day. We can make space for rest, release, and a gentle return to yourself.",
    image: "/photos/massageCard.jpg",
    imageAlt: "Massage session",
    url: process.env.NEXT_PUBLIC_CALCOM_MASSAGE_URL!,
  },
  {
    id: "pilates_private",
    title: "Private Pilates Class",
    description:
      "A private Pilates practice with time to move, strengthen, and reconnect at your own pace. Each class is adapted to support your body and your intentions.",
    image: "/photos/pilatesCard.webp",
    imageAlt: "Private Pilates class",
    url: process.env.NEXT_PUBLIC_CALCOM_PILATES_URL!,
  },
];

export default function BookApointmentPage() {
  // const [event, setEvent] = useState<GoogleEvent>();
  // const [openBooking, setOpenBooking] = useState(false);
  const [selectedAppointment, setSelectedAppointment] =
    useState<AppointmentOption | null>(null);
  const [openPilatesRequest, setOpenPilatesRequest] = useState(false);

  const privatePilatesMessage =
    "Hello, I'm interested in requesting a private Pilates class.";

  // const selectEvent = (event: GoogleEvent) => {
  //   setEvent(event);
  // };

  return (
    <Container classname=" w-full justify-start items-start mt-10 overflow-hidden ">
      <Background rotate={100} />
      <div className="flex border-b border-slate-400  w-[100%] ">
        <Image
          className="mr-6"
          src={"/icons/feather.svg"}
          width={40}
          height={40}
          alt="icon"
        />
        <h1 className="zeppelin">Book an appointment </h1>
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
            onRequest={() => setOpenPilatesRequest(true)}
          />
        ))}
      </section>

      {selectedAppointment && (
        <Modal close={() => setSelectedAppointment(null)} color="bg-[#f8f5f0]">
          {(requestClose) => (
            <div className="mx-auto flex w-full max-w-5xl flex-col ">
              <div className=" flex items-start justify-between gap-5 border-b border-slate-300">
                <div>
                  <h3 className="!mb-1 !text-[28px] sm:!text-[32px]">
                    Book your {selectedAppointment.title}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={requestClose}
                  aria-label="Close calendar"
                  className="shrink-0 rounded-full border border-slate-500/35 bg-white/60 px-2  !text-[20px] transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-500"
                >
                  Close
                </button>
              </div>
              {selectedAppointment.id === "massage" && (
                <div className="  space-y-4 text-left">
                  <p>
                    The studio is in Neukölln 12051, Berlin. Full address upon
                    booking confirmation.
                  </p>
                  <p className="!mb-4">
                    My session options vary in length, and are all offered on a
                    sliding scale, so the prices are based on what people can
                    offer within range :)
                  </p>

                  <ul className=" ml-4 space-y-1 ">
                    <li>
                      {" "}
                      <p className="handWrite1 ">30 min : 20-30 €</p>
                    </li>
                    <li>
                      {" "}
                      <p className="handWrite1 ">60 min : 40-60 €</p>
                    </li>
                    <li>
                      {" "}
                      <p className="handWrite1 ">90 min : 70-90 €</p>
                    </li>
                  </ul>
                  <p>
                    My goal is to try to make the practice as accessible as
                    possible, while still honouring the time, effort, energy and
                    experience put into the practice
                  </p>
                </div>
              )}
              <CalBookingEmbed eventUrl={selectedAppointment.url} />
            </div>
          )}
        </Modal>
      )}

      {openPilatesRequest && (
        <Modal close={() => setOpenPilatesRequest(false)} color="bg-[#f8f5f0]">
          {(requestClose) => (
            <SendMessageForm
              close={requestClose}
              initialMessage={privatePilatesMessage}
              title="Request a Private Pilates Class"
            />
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
