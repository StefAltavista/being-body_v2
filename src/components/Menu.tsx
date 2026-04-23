import Image from "next/image";
import "../css/menu.css";
import Link from "next/link";
import { MenuContent } from "@/content/MenuContent";

export default function Menu({
  menuState,
  toggle,
  home,
}: {
  menuState: string;
  toggle: (x: string) => void;
  home?: boolean;
}) {
  return (
    <div
      id="menu"
      className={menuState}
      style={{
        zIndex: 998,
        overflow: "scroll",
        paddingRight: "80px",
        // background: "purple",
        background:
          "linear-gradient(to right, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 50%, rgba(255,255,255,0.7) 80%, rgba(255,255,255,0) 100%)",
      }}
    >
      <div
        className={
          menuState +
          "  overlay top-0 w-[200vw] h-[100vh] fixed bg-[rgba(255,255,255,0.5)]"
        }
        onClick={() => toggle("close")}
      />

      {!home && (
        <Link href="/" className="flex items-start  py-4 ">
          <Image
            src="/icons/home_flower.svg"
            width={50}
            height={50}
            alt="icon"
          />
          <p onClick={() => toggle("close")}>Home</p>
        </Link>
      )}
      {MenuContent &&
        MenuContent.map((x, i) => (
          <Link key={i} href={x.link} className="flex items-start  py-4 ">
            <Image
              className="ml-2 "
              src={x.icon}
              width={40}
              height={40}
              alt="icon"
            />
            <p onClick={() => toggle("close")}>{x.title}</p>
          </Link>
        ))}
    </div>
  );
}
