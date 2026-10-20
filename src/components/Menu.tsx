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
        background:
          "linear-gradient(to right, rgb(255, 255, 255) 0%, rgb(233, 242, 255) 50%, rgb(238, 245, 252) 70%, rgba(255,255,255,0) 100%)",
      }}
    >
      <button
        type="button"
        aria-label="Close menu"
        className="overlay absolute inset-0 z-0 h-full w-full cursor-default border-0 bg-transparent"
        onClick={() => toggle("close")}
      />

      <nav className="relative z-10 flex min-h-max w-full flex-1 flex-col items-start">
        {!home && (
          <Link
            href="/"
            className="flex min-h-14 w-fit flex-1 items-center gap-2"
            onClick={() => toggle("close")}
          >
            <Image
              src="/icons/home_flower.svg"
              width={50}
              height={50}
              alt=""
            />
            <p className="!relative !my-1 !inline-block cursor-pointer hover:!text-blue-800 after:!absolute after:!-bottom-0.5 after:!left-0 after:!h-px after:!w-0 after:!bg-current after:!content-[''] after:!transition-[width] after:!duration-300 after:!ease-out hover:after:!w-full">
              Home
            </p>
          </Link>
        )}

        {MenuContent.map((item) => (
          <Link
            key={item.link}
            href={item.link}
            className="flex min-h-14 w-fit flex-1 items-center gap-2"
            onClick={() => toggle("close")}
          >
            {item.link === "/about" ? (
              <span
                aria-hidden="true"
                className="ml-2 h-10 w-10 shrink-0 bg-[#1F495E]"
                style={{
                  WebkitMaskImage: `url(${item.icon})`,
                  maskImage: `url(${item.icon})`,
                  WebkitMaskPosition: "center",
                  maskPosition: "center",
                  WebkitMaskRepeat: "no-repeat",
                  maskRepeat: "no-repeat",
                  WebkitMaskSize: "contain",
                  maskSize: "contain",
                }}
              />
            ) : (
              <Image
                className="ml-2"
                src={item.icon}
                width={40}
                height={40}
                alt=""
              />
            )}
            <p className="!relative !my-1 !inline-block cursor-pointer hover:!text-blue-800 after:!absolute after:!-bottom-0.5 after:!left-0 after:!h-px after:!w-0 after:!bg-current after:!content-[''] after:!transition-[width] after:!duration-300 after:!ease-out hover:after:!w-full">
              {item.title}
            </p>
          </Link>
        ))}
      </nav>
    </div>
  );
}
