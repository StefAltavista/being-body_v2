import { browserName } from "react-device-detect";
import "./home.css";
import Header from "@/components/Header";
import Concept from "@/content/Concept";
import Massage from "@/content/Massage";
import Aroma from "@/content/Aroma";
import Prices from "@/components/Prices";
import About from "@/content/About";
import Contacts from "@/content/Contacts";
import Image from "next/image";

export default function Home() {
    const extension = browserName == "Safari" ? "png" : "webp";

    return (
        <div id="home">
            <Header home={true}></Header>

            <div id="welcome">
                <Image
                    src={`/img/logoLight.${extension}`}
                    alt="BeingBodyLogo"
                    width={200}
                    height={200}
                />
                <p>
                    Occurring material of the abstract. Existing, present. Body
                </p>
            </div>

            <Concept extension={extension} />
            <Massage extension={extension} />
            <Aroma extension={extension} />
            <Prices extension={extension} />
            <About extension={extension} />
            <Contacts extension={extension} />
        </div>
    );
}
