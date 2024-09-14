import "../css/menu.css";
import Link from "next/link";

export default function Menu({
    menuState,
    toggle,
}: {
    menuState: string;
    toggle: (x: string) => void;
}) {
    return (
        <div id="menu" className={menuState}>
            <Link href="#concept">
                <p onClick={() => toggle("close")}>Concept</p>{" "}
            </Link>
            <Link href="#massage">
                <p onClick={() => toggle("close")}>Massage Therapy</p>
            </Link>
            <Link href="#aromatherapy">
                <p onClick={() => toggle("close")}>Aromatherapy</p>
            </Link>
            <Link href="#prices">
                <p onClick={() => toggle("close")}>Prices</p>
            </Link>
            <Link href="/contact">
                <p onClick={() => toggle("close")}>Book Appointment</p>
            </Link>
            <Link href="#katiaserena">
                <p onClick={() => toggle("close")}>About Katia</p>
            </Link>

            <Link href="#contacts">
                <p onClick={() => toggle("close")}>Contacts</p>
            </Link>
        </div>
    );
}
