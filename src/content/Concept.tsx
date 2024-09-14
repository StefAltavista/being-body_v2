import Image from "next/image";

export default function Concept({ extension }: { extension: string }) {
    return (
        <div id="concept" className="section">
            <h3>Concept</h3>
            <div className="sectionBody">
                <div>
                    <p>
                        I see the body as a vessel to express and a tool to
                        connect, creating pathways for healing, well being and
                        spiritual growth. My goal is to generate a healing
                        experience through the harmonisation of body, mind and
                        spirit. To create a safe space to connect with, explore
                        and listen to the self through guided corporal
                        awareness:
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
                        <p>Through massage</p>
                        <p>Through bodywork </p>
                        <p>Through movement</p>
                        <br></br>
                        <br></br>
                        <br></br>
                        <p>
                            When you truly listen, the body will speak. All
                            bodies welcome, valid and celebrated.{" "}
                        </p>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>
                        <p style={{ fontSize: "14px" }}>
                            *In studio & on call <br></br>*No erotic massage{" "}
                        </p>
                    </div>
                </div>
                <Image
                    src={`/img/concept.${extension}`}
                    alt="BeingBodyConcept"
                    width={300}
                    height={300}
                />
            </div>
        </div>
    );
}
