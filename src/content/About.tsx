import "../css/about.css";
import Image from "next/image";

export default function About({ extension }: { extension: string }) {
    return (
        <div id="katiaserena" className="section">
            <h3>Katia Serena</h3>
            <div className="sectionBody">
                <Image
                    src={`/img/about.${extension}`}
                    alt="beingBodyabout"
                    width={300}
                    height={300}
                />

                <div id="about">
                    <p>
                        Hi, I am Katia.
                        <br></br> The body has always intrigued me. I have been
                        a mover since a young age, and years of focus on my
                        anatomy as a tool created a{" "}
                        <strong>corporal focus </strong>within me. The more I
                        moved, the more I discovered about myself, about the
                        world around me, about the connection between them. The
                        more I allowed myself to feel, the more I discovered
                        feelings within me. I could observe them, express them,
                        and let them go. An act of catharsis.
                    </p>
                    <br></br>
                    <br></br>
                    <br></br>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        <p>
                            This is where I feel <strong>healing</strong> lies,
                            in internal focus that allows one to feel,
                            acknowledge and release.
                        </p>
                    </div>
                    <br></br>
                    <br></br>
                    <br></br>
                    <p>
                        We store so many things within our
                        <strong> body</strong>, and these things, when ignored,
                        acccumulate into tension and pain, which takes their
                        place. I wanted to discover how to confront and heal
                        this pain within myself, and share this with those
                        around me. <br></br> And so my study of movement
                        developed into my study of the body and its functions
                        and systems, which delvoped into my study of how to
                        redirect and manipulate them through touch. <br></br>
                        <br></br>
                        <br></br> I believe it takes focused feeling, deep
                        reflection, and open hearts to improve health and
                        wellbeing.<br></br>
                        <strong>
                            This is what I will continue to strive for and
                            continue to explore.
                        </strong>
                    </p>
                </div>
            </div>
        </div>
    );
}
