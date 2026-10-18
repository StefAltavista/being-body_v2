"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import Background from "@/components/Background";
import Container from "@/components/Container";
import SendMessageForm from "@/components/Form.SendMessage";
import Modal from "@/components/Modal";

gsap.registerPlugin(useGSAP);

export default function Contact() {
  const container = useRef<HTMLDivElement | null>(null);
  const [openMessage, setOpenMessage] = useState(false);

  useGSAP(
    () => {
      const timeline = gsap.timeline({
        defaults: { duration: 1.1, ease: "power3.out" },
      });

      timeline
        .fromTo(
          ".contact-picture",
          { opacity: 0, y: 24, filter: "blur(12px)" },
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.5 },
        )
        .fromTo(
          ".contact-copy > *",
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, stagger: 0.09 },
          "-=1",
        )
        .fromTo(
          ".contact-bubbles",
          { opacity: 0, y: 15 },
          { opacity: 0.24, y: 0, duration: 1.8 },
          "-=1.2",
        );
    },
    { scope: container },
  );

  return (
    <Container classname="w-full justify-start items-start overflow-hidden ">
      <div ref={container} className="relative w-full pb-28 pt-10 ">
        <Background rotate={310} imageClassName="opacity-60" />

        <div className="flex items-center border-b border-slate-400">
          <Image
            className="mr-6 pb-2"
            src="/icons/hand.svg"
            width={80}
            height={80}
            alt=""
          />
          <h1 className="zeppelin">Contact</h1>
        </div>

        <main className="mx-auto  grid w-full  grid-cols-1   lg:mt-20 lg:grid-cols-2 lg:gap-24">
          <section className="contact-copy order-2">
            <p className="handWrite2 !mb-4 !mt-0 !text-left !text-[21px] md:!text-[24px]">
              Let&apos;s connect
            </p>

            <h2 className="!m-0 !max-w-[620px] !text-[28px] !font-normal !leading-none sm:!text-[32px] lg:!text-[46px]">
              Begin with a conversation.
            </h2>

            <p className="!mb-0 !mt-8 max-w-[610px] !text-left !text-[20px] !leading-relaxed md:!text-[23px]">
              Whether you are curious about a session, a class, a workshop, or
              simply want to say hello, you are welcome to get in touch. For a
              question, a session or a tea!
            </p>

            <button
              type="button"
              onClick={() => setOpenMessage(true)}
              className="group mt-10 inline-flex min-h-13 items-center justify-center  border border-[#254f66] bg-transparent px-7 py-3 transition-colors duration-300 hover:bg-[#254f66] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#254f66] motion-reduce:transition-none"
            >
              <span className="handWrite2 !text-[22px] group-hover:!text-white">
                Send me a message
              </span>
            </button>
          </section>

          <section
            className="order-1 flex w-full justify-center"
            aria-label="Being Body contact artwork"
          >
            <div className="relative w-full max-w-[620px] pb-10 pr-4 pt-6 sm:pr-10 lg:pb-14 lg:pt-8">
              <Image
                className="contact-bubbles pointer-events-none absolute -bottom-[7%] -right-[17%] z-0 h-auto w-[66%] object-contain opacity-0"
                src="/img/bubbles.webp"
                width={400}
                height={500}
                sizes="(min-width: 1024px) 390px, 55vw"
                alt=""
                aria-hidden="true"
                priority
              />

              <div className="contact-picture relative z-10 aspect-[4/3] w-full overflow-hidden rounded-[2rem] shadow-[0_24px_70px_rgba(37,79,102,0.14)]">
                <Image
                  src="/img/contact.webp"
                  alt="Hands reaching upward in the Being Body visual style"
                  fill
                  priority
                  sizes="(min-width: 1024px) 570px, 92vw"
                  className="object-cover object-[58%_50%]"
                />
              </div>

              <div className="mt-14 w-full max-w-[610px] border-y border-[#254f66]/20 py-2">
                <a
                  href="mailto:being.body.practice@gmail.com"
                  className="group grid gap-1 border-b border-[#254f66]/15 py-6 sm:grid-cols-[110px_1fr] sm:items-baseline"
                >
                  <span className="!text-[16px] uppercase tracking-[0.14em] opacity-60">
                    Email
                  </span>
                  <span className="handWrite2 break-all !text-[20px] sm:!text-[23px]">
                    being.body.practice@gmail.com
                  </span>
                </a>

                <a
                  href="https://www.instagram.com/being.body/"
                  target="_blank"
                  rel="noreferrer"
                  className="group grid gap-1 py-6 sm:grid-cols-[110px_1fr] sm:items-baseline"
                >
                  <span className="!text-[16px] uppercase tracking-[0.14em] opacity-60">
                    Instagram
                  </span>
                  <span className="handWrite2 !text-[23px]">@Being.Body</span>
                </a>
              </div>
            </div>
          </section>
        </main>

        {openMessage && (
          <Modal close={() => setOpenMessage(false)} color="bg-[#f8f5f0]">
            {(requestClose) => <SendMessageForm close={requestClose} />}
          </Modal>
        )}
      </div>
    </Container>
  );
}
