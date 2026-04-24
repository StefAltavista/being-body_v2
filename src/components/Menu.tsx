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
        // background:
        //   "linear-gradient(to right, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 50%, rgba(255, 255, 255, 0.7) 70%, rgba(255,255,255,0) 100%)",

        background:
          "linear-gradient(to right, rgb(237, 212, 252) 0%, rgb(233, 255, 252) 40%, rgba(233, 253, 252, 0.7) 70%, rgba(255,255,255,0) 100%)",
      }}
    >
      <div
        className={
          menuState +
          "  overlay top-0 w-[200vw] h-[100vh] fixed bg-[rgba(255, 255, 255, 0)]"
        }
        onClick={() => toggle("close")}
      />

      {!home && (
        <Link href="/" className="flex items-start  pt-4 ">
          <Image
            src="/icons/home_flower.svg"
            width={50}
            height={50}
            alt="icon"
          />
          <p
            className="scale-y-[1.2] scale-x-[0.75] origin-bottom-left "
            onClick={() => toggle("close")}
          >
            Home
          </p>
        </Link>
      )}
      {MenuContent &&
        MenuContent.map((x, i) => (
          <Link key={i} href={x.link}>
            <div className="flex items-start  pt-4 ">
              <Image
                className="ml-2 brightness-0"
                src={x.icon}
                width={40}
                height={40}
                alt="icon"
              />
              <p
                className="scale-y-[1.2] scale-x-[0.75] origin-bottom-left tracking-[1px]"
                onClick={() => toggle("close")}
              >
                {x.title}
              </p>
            </div>
          </Link>
        ))}
    </div>
  );
}
