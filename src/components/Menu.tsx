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

        background:
          "linear-gradient(to right, rgb(255, 255, 255) 0%, rgb(233, 242, 255) 50%, rgb(238, 245, 252) 70%, rgba(255,255,255,0) 100%)",
      }}
    >
      <div
        className={
          menuState +
          "  overlay top-0 w-[200vw] h-[100vh] fixed bg-[rgba(255, 255, 255, 0)] "
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
            className="!relative !inline-block cursor-pointer hover:!text-blue-800 after:!content-[''] after:!absolute after:!left-0 after:!-bottom-0.5 after:!h-px after:!w-0 after:!bg-current after:!transition-[width] after:!duration-300 after:!ease-out hover:after:!w-full !my-1"
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
                className="!relative !inline-block cursor-pointer hover:!text-blue-800 after:!content-[''] after:!absolute after:!left-0 after:!-bottom-0.5 after:!h-px after:!w-0 after:!bg-current after:!transition-[width] after:!duration-300 after:!ease-out hover:after:!w-full !my-1"
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
