import "../css/massage.css";
import Image from "next/image";

export default function Massage({ extension }: { extension: string }) {
    return (
        <div id="massage" className="section">
            <h3>Massage Therapy</h3>
            <p>
                I work with attention and love to discover roots of pain and
                dissolve them.
            </p>
            <div id="massageTherapy" className="sectionBody">
                <Image
                    src={`/img/therapy2.${extension}`}
                    alt="beingBodyTherapy"
                    width={300}
                    height={300}
                />
                <p>
                    With knowledge of body mechanics and alignment, I map the
                    body using fluid, rhythmic motion to restore energy
                    circulation, relax and release with gentle pressure applied
                    through natural gravity, and focus on trigger and pressure
                    points to release tension and pain with the help of mindful
                    breath.
                    <br></br>
                    <br></br>
                    <br></br>I see this rhythmical symbiosis of movement and
                    breath to be a dance between giver and receiver.
                    <br></br>
                    <br></br>
                    <br></br>My experience with{" "}
                    <strong>Traditional Thai Massage </strong>
                    furthered my knowledge of body mechanics and taught me to
                    map the body through lines of energy using Metta, loving
                    kindness, in forms of deep static and rhythmic pressure.
                    <br></br> My experience with <strong>LOMILOMI</strong>{" "}
                    taught me to work with the body in long flowing motions,
                    incorporating multiple parts of the body instead of
                    isolating them, instigating a peace and stability that can
                    only be found in the mind when a specific focus cannot be
                    made, but instead a full feeling. <br></br> My experience
                    with <strong> trigger points </strong> gave me the ability
                    to find painful and tense areas in the muscles and fascia
                    and release them, assisting in achieving long term results.
                    <br></br>
                    <br></br> I use a mix of techniques, guided by what the body
                    tells me. My intention is to create a space to listen. Bring
                    people into a place where they can hear themselves, connect
                    with themselves.
                </p>
            </div>{" "}
        </div>
    );
}
