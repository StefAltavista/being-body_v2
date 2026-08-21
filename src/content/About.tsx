import "../css/about.css";
import Background from "@/components/Background";
import Image from "next/image";
import Link from "next/link";

export default function About({ format }: { format: string }) {
  return (
    <section id="katiaserena" className="about-page">
      <Background rotate={120} imageClassName="opacity-100" />

      <div className="about-layout">
        <div className="about-copy about-intro">
          <p>
            Hi, I am Katia.
            <br />
            The body has always intrigued me. I have been a mover since a young
            age, and years of focus on my anatomy as a tool created a{" "}
            <strong>corporal focus</strong> within me. The more I moved, the
            more I discovered about myself, about the world around me, about the
            connection between them. The more I allowed myself to feel, the more
            I discovered feelings within me. I could observe them, express them,
            and let them go. An act of catharsis.
          </p>
        </div>

        <div className="about-portrait">
          <Image
            src={`/img/about.${format}`}
            alt="Katia Serena, founder of Being Body"
            width={832}
            height={832}
            priority
          />
        </div>

        <div className="about-copy about-closing">
          <p className="about-pullquote">
            This is where I feel <strong>healing</strong> lies, in internal
            focus that allows one to feel, acknowledge and release.
          </p>

          <p>
            We store so many things within our <strong>body</strong>, and these
            things, when ignored, accumulate into tension and pain, which takes
            their place. I wanted to discover how to confront and heal this pain
            within myself, and share this with those around me.
            <br />
            And so my study of movement developed into my study of the body and
            its functions and systems, which developed into my study of how to
            redirect and manipulate them through touch, which developed into my
            study of how to channel and direct them, again, through movement.
          </p>

          <p className="about-mantra">Full circle, and ever evolving.</p>

          <p className="about-mantra">
            resonating within each revolution: a belief, a truth
          </p>

          <p>
            it takes focused feeling, deep reflection, and open hearts to
            instigate understanding and improve wellbeing.
            <br />
            This is what I will continue to strive for and continue to explore.
          </p>

          <div className="about-signoff">
            <span>With love</span>
            <span>Xx</span>
          </div>
        </div>
      </div>
    </section>
  );
}
