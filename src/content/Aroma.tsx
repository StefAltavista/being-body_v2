import Image from "next/image";
import "../css/aroma.css";

export default function Aroma({ extension }: { extension: string }) {
    return (
        <div id="aromatherapy" className="section">
            <h3>Aromatherapy</h3>
            <div id="aroma" className="sectionBody">
                <div>
                    <p style={{ textAlign: "center" }}>
                        My passion for alternative medicine and natural healing
                        has led me to study <strong>essential oils</strong> for
                        their therapeutic benefit and explore their impact on
                        emotional centres of the brain.{" "}
                    </p>
                    <br></br>
                    <p>
                        Essential oils are highly concentrated aromatic{" "}
                        <strong>plant</strong> essences. They are distilled from
                        certain varieties of certain species of planets, some
                        coming from petals, others from stems, twigs, leaves,
                        roots, trees, grasses or fruits. They are nature's
                        pharmacopoeia, and can be traced back to ancient
                        therapeutic, spiritual, hygienic and ritualistic
                        practices.{" "}
                    </p>
                    <br></br>

                    <p>
                        <strong>Emotions</strong> are part of the human
                        experience. These complex internal reactions are
                        somewhat mysterious, and though they differ from person
                        to person, they have a serious impact on our happiness
                        and wellbeing. Aromatherapy goes very deeply into the
                        psyche on all levels of human experience, influencing
                        feeling and enhancing mind, mood and emotion. I blend
                        oils for each session, a mix for each individual based
                        on their pain and their intentions.
                    </p>
                    <br></br>
                    <p style={{ textAlign: "center" }}>
                        {" "}
                        My goal is to use elements of different therapeutic
                        practices in <strong>harmony</strong>, to generate a
                        holistic experience in alignment with each individuals
                        healing path.
                    </p>
                </div>
                <Image
                    src={`/img/aroma.${extension}`}
                    alt="beingBodyAromaTherapy"
                    width={300}
                    height={300}
                />
            </div>
        </div>
    );
}
