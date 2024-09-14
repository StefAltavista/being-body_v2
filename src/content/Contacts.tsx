import "../css/contact.css";
import Image from "next/image";

export default function Contacts({ extension }: { extension: string }) {
    return (
        <div id="contacts" className="section">
            <h3>Contacts</h3>
            <div id="overflowBody" className="sectionBody">
                <Image
                    src={`/img/contact.${extension}`}
                    alt="beingBodyContact"
                    width={300}
                    height={300}
                />
                <div id="links">
                    <a href="mailto:being.body.practice@gmail.com">
                        <p className="contactP">
                            being.body.practice@gmail.com
                        </p>
                    </a>
                    <br></br>
                    <p className="contactP">+4915731714372</p>

                    <a
                        target="_blank"
                        href="https://www.instagram.com/being.body/"
                    >
                        <p className="contactP"> @Being.Body</p>
                    </a>
                    <br></br>
                    <p className="contactP">Emser Straße 33, 12051 Berlin</p>
                </div>
            </div>
        </div>
    );
}
