import "../css/menu.css";
import Link from "next/link";

export default function Menu({
  menuState,
  toggle,
  home,
}: {
  menuState: string;
  toggle: (x: string) => void;
  home?: boolean;
}) {
  const shadow =
    "relative inline-block px-4 py-2 text-white before:content-[''] before:absolute before:left-1/2 before:top-1/2 before:h-[70%] before:w-[80%] before:-translate-x-1/2 before:-translate-y-1/2 before:rounded-full before:bg-white/25 before:blur-2xl before:-z-10";
  return (
    <div
      id="menu"
      className={menuState}
      style={{
        background:
          "linear-gradient(to right, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 50%, rgba(255,255,255,0.7) 80%, rgba(255,255,255,0) 100%)",
      }}
    >
      {!home && (
        <Link href="/">
          <p onClick={() => toggle("close")}>Home</p>{" "}
        </Link>
      )}
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
