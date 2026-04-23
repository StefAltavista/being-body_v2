"use client";
import Container from "@/components/Container";
import Calendar from "@/components/Calendar";
import { useState } from "react";
import { GoogleEvent } from "@/lib/getCalendar";
import RequestAppointment from "@/components/Form.RequestAppointment";
import Modal from "@/components/Modal";

export default function BookAppointmentPage() {
  const [event, setEvent] = useState<GoogleEvent>();
  const [openBooking, setOpenBooking] = useState(false);

  const selectEvent = (event: GoogleEvent) => {
    setEvent(event);
  };

  return (
    <Container classname="w-full justify-start items-start">
      <div className="w-full flex flex-row  justify-center my-12">
        <div className="w-full">
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
        </div>
      </div>
    </Container>
  );
}
