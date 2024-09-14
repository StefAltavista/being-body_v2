import Link from "next/link";
import Image from "next/image";
export default function Prices({ extension }: { extension: string }) {
    return (
        <div id="prices" className="section">
            <h3>Prices</h3>
            <div id="overflowBody" className="sectionBody">
                <Image
                    src={`/img/prices.${extension}`}
                    alt="BeingBodyPrices"
                    width={300}
                    height={300}
                />
                <div id="rates">
                    <p>30 min → 20€ ~ 30€ </p>
                    <br></br>
                    <p>60 min → 40€ ~ 60€ </p>
                    <br></br>
                    <p>90 min → 70€ ~ 90€ </p>
                    <br></br>
                    <p>120 min → 100€ ~ 120€ </p>
                    <br></br>
                    <p style={{ fontSize: "20px" }}>
                        * Pricing on a sliding scale. Please contact me directly
                        for more information.
                    </p>
                </div>
            </div>

            <div id="bookLink">
                <Link href="/book">
                    <p>Book Appointment</p>
                </Link>
            </div>
        </div>
    );
}
