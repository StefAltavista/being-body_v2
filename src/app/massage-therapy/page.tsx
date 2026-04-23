"use client";
import BookButton from "@/components/BookButton";
import Container from "@/components/Container";
import Prices from "@/content/MassagePrices";
import { browserName } from "react-device-detect";

export default function page() {
  const format = browserName == "Safari" ? "png" : "webp";

  return (
    <Container>
      <div className="w-full mt-8 ">
        <h3 className="bg-violet-100">Massage Therapy</h3>
        <p className="handWrite1">
          I work with attention and love to discover roots of pain and dissolve
          them. <br></br>With knowledge of body mechanics and alignment, I map
          the body using fluid, rhythmic motion to restore energy circulation,
          relax and release with gentle pressure applied through natural
          gravity, and focus on trigger and pressure points to release tension
          and pain with the help of mindful breath.
        </p>
      </div>
      <div className=" w-full flex flex-row my-16">
        <div className="w-1/2">
          <Prices format={format} />
          <div className="z-10">
            <BookButton />
          </div>
        </div>
        <div className="w-1/2 px-15 flex flex-col items-center  p-3  ">
          <p className="handWrite3 !p-6 !pt-0">
            <br></br> I use a mix of techniques, guided by what the body tells
            me. My intention is to create a space to listen. Bring people into a
            place where they can hear and connect with themselves.
          </p>
        </div>
      </div>
      <div>
        <p className="handWrite1">
          I see this rhythmical symbiosis of movement and breath to be a dance
          between giver and receiver.
        </p>
        <p className="handWrite1">
          My experience with <strong>Traditional Thai Massage </strong>
          furthered my knowledge of body mechanics and taught me to map the body
          through lines of energy using Metta, loving kindness, in forms of deep
          static and rhythmic pressure.
          <br></br> My experience with <strong>LOMILOMI</strong> taught me to
          work with the body in long flowing motions, incorporating multiple
          parts of the body instead of isolating them, instigating a peace and
          stability that can only be found in the mind when a specific focus
          cannot be made, but instead a full feeling. <br></br> My experience
          with <strong> trigger points </strong> gave me the ability to find
          painful and tense areas in the muscles and fascia and release them,
          assisting in achieving long term results.
          <br></br>
        </p>
      </div>
      <div></div>
    </Container>
  );
}
