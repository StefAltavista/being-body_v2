import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <div
      id="footer"
      className="select-none  flex flex-row bg-[#c2edd9] h-[300px] justify-around items-center"
    >
      <div className="flex flex-col items-center justify-center w-1/3 ">
        <Image
          className="logo filter invert  saturate-[400%] hue-rotate-[256deg] brightness-[74%] contrast-[103%]"
          src={`/img/logo.webp`}
          alt="beingBodyLogo"
          width={30}
          height={100}
        />
        <h4>Being Body</h4>
      </div>
      <div className=" z-999 flex flex-col text-[10px] items-start pl-10 border-l border-white w-1/3">
        <Link href="/">
          <p className="!relative !inline-block cursor-pointer hover:!text-orange-600 after:!content-[''] after:!absolute after:!left-0 after:!-bottom-0.5 after:!h-px after:!w-0 after:!bg-current after:!transition-[width] after:!duration-300 after:!ease-out hover:after:!w-full !my-1">
            {" "}
            Home
          </p>
        </Link>{" "}
        <Link href="/contacts">
          <p className="!relative !inline-block cursor-pointer hover:!text-orange-600 after:!content-[''] after:!absolute after:!left-0 after:!-bottom-0.5 after:!h-px after:!w-0 after:!bg-current after:!transition-[width] after:!duration-300 after:!ease-out hover:after:!w-full !my-1">
            Contacts
          </p>
        </Link>
        <Link href="/privacy">
          <p className="!relative !inline-block cursor-pointer hover:!text-orange-600 after:!content-[''] after:!absolute after:!left-0 after:!-bottom-0.5 after:!h-px after:!w-0 after:!bg-current after:!transition-[width] after:!duration-300 after:!ease-out hover:after:!w-full !my-1">
            Privacy Policy
          </p>
        </Link>
        <Link href="/impressum">
          <p className="!relative !inline-block cursor-pointer hover:!text-orange-600 after:!content-[''] after:!absolute after:!left-0 after:!-bottom-0.5 after:!h-px after:!w-0 after:!bg-current after:!transition-[width] after:!duration-300 after:!ease-out hover:after:!w-full !my-1">
            Impressum
          </p>
        </Link>
      </div>
      <div className="flex  z-999 flex-col text-[10px] border-l pl-10 border-white w-1/3">
        <Link href="/massage-therapy">
          <p className="!relative !inline-block cursor-pointer hover:!text-orange-600 after:!content-[''] after:!absolute after:!left-0 after:!-bottom-0.5 after:!h-px after:!w-0 after:!bg-current after:!transition-[width] after:!duration-300 after:!ease-out hover:after:!w-full !my-1">
            Massage
          </p>
        </Link>
        <Link href="/pilates">
          <p className="!relative !inline-block cursor-pointer hover:!text-orange-600 after:!content-[''] after:!absolute after:!left-0 after:!-bottom-0.5 after:!h-px after:!w-0 after:!bg-current after:!transition-[width] after:!duration-300 after:!ease-out hover:after:!w-full !my-1">
            Pilates
          </p>
        </Link>
        <Link href="/oils">
          <p className="!relative !inline-block cursor-pointer hover:!text-orange-600 after:!content-[''] after:!absolute after:!left-0 after:!-bottom-0.5 after:!h-px after:!w-0 after:!bg-current after:!transition-[width] after:!duration-300 after:!ease-out hover:after:!w-full !my-1">
            Oils
          </p>
        </Link>
        <Link href="/workshops">
          <p className="!relative !inline-block cursor-pointer hover:!text-orange-600 after:!content-[''] after:!absolute after:!left-0 after:!-bottom-0.5 after:!h-px after:!w-0 after:!bg-current after:!transition-[width] after:!duration-300 after:!ease-out hover:after:!w-full !my-1">
            Workshops
          </p>
        </Link>
      </div>
    </div>
  );
}
