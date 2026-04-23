"use client";
import Container from "@/components/Container";
import Contacts from "@/content/Contacts";
import { browserName } from "react-device-detect";
import SendMessageForm from "@/components/Form.SendMessage";
import Modal from "@/components/Modal";
import { useState } from "react";

export default function Contact() {
  const format = browserName == "Safari" ? "png" : "webp";
  const [openMessage, setOpenMessage] = useState(false);
  return (
    <Container classname="justify-start items-start w-full ">
      <div className="flex flex-col  my-12 ">
        <Contacts format={format} />
      </div>
      <div className="flex flex-col items-center w-full  my-8 ">
        <p>Feel Free to contact me to discuss availability or have a tea!</p>
        <button
          onClick={() => setOpenMessage(true)}
          className="border border-green-300 p-2 m-2 hover:bg-green-100 cursor-pointer rounded"
        >
          Send me a message
        </button>

        {openMessage && (
          <Modal close={() => setOpenMessage(false)} color="bg-green-100">
            {(requestClose) => <SendMessageForm close={requestClose} />}
          </Modal>
        )}
      </div>
    </Container>
  );
}
