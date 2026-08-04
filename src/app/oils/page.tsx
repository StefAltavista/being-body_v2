"use client";

import { useRef } from "react";
import Image from "next/image";

import Background from "@/components/Background";
import Bubble from "@/components/Bubble";
import Container from "@/components/Container";
import OilCard, { type OilBlend } from "@/components/OilCard";
import { gsap, useGSAP } from "@/lib/gsap";

const rituals = [
  {
    name: "Ointment",
    instruction: "Roll or rub 1 to 3 drops directly into the skin.",
    delay: "0s",
  },
  {
    name: "Room Diffuser",
    instruction: "Add 2 to 3 drops to a bowl of hot water or a diffuser.",
    delay: "1s",
  },
  {
    name: "Massage",
    instruction: "Add 5 to 7 drops to a cupped palm’s worth of base oil.",
    delay: "2s",
  },
];

const oils: OilBlend[] = [
  {
    name: "Cleansing Clary",
    intention: "Restoring",
    ingredients: "Lavender, Clary Sage, Mint",
    character: "Clearing and calming, powerful in intuition",
    benefit: "Can promote clarity of thought, ease tension, and enhance vision",
    poem: [
      "This blend is inspired by trickling tranquility",
      "Winding through mossy stones",
      "Rolling over, rocking rhythm, continuous movement",
      "Shaping, transporting, supporting",
      "Washing away, bringing anew",
    ],
    description:
      "Mint for spring freshness, lavender for midsummer calm, and clary sage for late-summer rituals of wisdom and reflection. Potent in work with clarity, communication, dreams, intuition, emotional balance, and adaptability. A spell for shapeshifting into a dewy daydream ✨",
  },
  {
    name: "Sensitive Seed",
    intention: "Connecting",
    ingredients: "Cardamom, Myrtle, Jasmine",
    character: "Stimulating and meditative, powerful in sensitivity",
    benefit: "Can soothe, enhance mood, and embolden love",
    poem: [
      "This blend is inspired by the in-between",
      "The threads of connection",
      "Soft screen of unseen",
      "Tapestries of divine juxtaposition",
    ],
    description:
      "Cardamom, warming spice to kindle passion; myrtle, woody and warding off negativity; and jasmine, sweet moon flower, bridge to the otherworldly. A spell to find balance in ambiguity, opening the heart and connecting 🍂💫",
  },
  {
    name: "Resonating Root",
    intention: "Grounding",
    ingredients: "Vetiver, Cypress, Cinnamon",
    character: "Warm and centering, powerful in generosity of spirit",
    benefit: "Can alleviate stress and aid in moments of transition",
    poem: [
      "This blend is inspired by the scattering of leaves",
      "Embers of a fire that warm the earth from the inside",
      "Network of roots running deep, grounding, grabbing hold",
      "As the first frosts fall, a quiet blanket suspending time",
    ],
    description:
      "Earthy vetiver, moving cypress, and igniting cinnamon—a spell for grounding when the soil itself seems nowhere to be found. The warm hug of earth, the spirit to carry on 🍁🔥",
  },
  {
    name: "Feeling Fir",
    intention: "Revealing",
    ingredients: "Silver Fir, Fennel, Frankincense",
    character: "Mysterious and full of wonder, powerful in perception",
    benefit: "Can promote peace of mind and enhance meditation",
    poem: [
      "This blend is inspired by a gentle mist in a lost forest",
      "Sweet chills along ridges",
      "Branches billowing, breath",
      "Guiding passage of soft secrets",
    ],
    description:
      "Gentle silver fir, focusing fennel, and sacred frankincense—a spell to hear the harmony of voices that echo in our internal mountain ranges. 🌬️🍃",
  },
];

export default function OilsPage() {
  const container = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      gsap.utils.toArray<HTMLElement>(".reveal-p").forEach((element) => {
        gsap.fromTo(
          element,
          { autoAlpha: 0, y: 26 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: element,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>(".oil-card").forEach((card, index) => {
        gsap.fromTo(
          card,
          {
            autoAlpha: 0,
            x: index % 2 === 0 ? -45 : 45,
            y: 35,
          },
          {
            autoAlpha: 1,
            x: 0,
            y: 0,
            duration: 1.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 86%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });
    },
    { scope: container },
  );

  return (
    <Container classname="w-full items-start justify-start mt-10 overflow-hidden">
      <div ref={container} className="w-full">
        <Background rotate={120} imageClassName="opacity-100" />

        <header className="relative w-full">
          <div className="flex items-center">
            <Image
              className="mr-6 brightness-0 pb-2"
              src="/icons/oil12.svg"
              width={80}
              height={80}
              alt="Oils"
              priority
            />
            <h1>Oils</h1>
          </div>
          <p className="reveal-p !mt-8 !text-[30px]">
            Blends of aromatic anointing oils
          </p>
          <p className="reveal-p  !mt-4 max-w-5xl !text-left !text-[26px] leading-relaxed">
            Aromatherapy oil blends thoughtfully handcrafted using pure
            botanicals. Each blend is inspired by the healing wisdom of nature—a
            unique vision—and carefully created to evoke a specific feeling,
            support intention, and nurture the mind, body, and spirit.
          </p>
        </header>

        <section className="relative mx-auto mt-14 w-full max-w-6xl">
          <h3 className="reveal-p  !mt-2 !text-center !text-[36px] tracking-[0.18em]">
            : : : : Uses &amp; Rituals : : : :
          </h3>

          <div className="mt-12 grid grid-cols-1 items-start gap-14 md:grid-cols-3 md:gap-10">
            {rituals.map((ritual) => (
              <div key={ritual.name} className="flex flex-col items-center">
                <Bubble
                  text={ritual.name}
                  className="mt-4 w-"
                  delay={ritual.delay}
                  size={36}
                  fontSize={"26px"}
                />
                <p className="reveal-p handWrite2 !mt-10 max-w-[270px] !text-center !text-[16px] leading-relaxed">
                  {ritual.instruction}
                </p>
              </div>
            ))}
          </div>

          <p className="reveal-p mx-auto !mt-20 max-w-4xl !text-center !text-[23px] leading-relaxed">
            Our senses allow us to connect to the world around us. There are no
            rules for exploring them, but here are some ideas and intentions to
            spark your own unique, feeling, and ever-evolving practice.
          </p>
        </section>

        <section className="relative mx-auto mb-24 mt-28 w-full max-w-7xl">
          <div className="reveal-p mb-12 flex items-center gap-5">
            <h3 className="!mb-0 shrink-0 !text-[38px]">Offerings</h3>
            <div className="h-px w-full bg-slate-500/25" />
          </div>

          <div className="flex flex-col gap-16 lg:gap-24">
            {oils.map((oil, index) => (
              <OilCard key={oil.name} oil={oil} reverse={index % 2 === 1} />
            ))}
          </div>
          <p className="handWrite2 !mt-7 !text-left !text-[18px] leading-relaxed opacity-80">
            * In collaboration with dear friend and studio mate @ava.ink, who
            made the beautiful booklets that come with each oil.
          </p>
        </section>
      </div>
    </Container>
  );
}
