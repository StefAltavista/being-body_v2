import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <div
      id="footer"
      className="select-none  flex flex-row bg-[#edd4c2] h-[300px] justify-around items-center"
    >
      <div className="flex flex-col items-center justify-center w-1/3 ">
        <Image
          className="logo filter invert  saturate-[400%] hue-rotate-[256deg] brightness-[74%] contrast-[103%]"
          src={`/img/logo.png`}
          alt="beingBodyLogo"
          width={30}
          height={100}
        />
        <h4>Being Body</h4>
      </div>
      <div className="flex flex-col text-[10px] pl-10 border-l border-white w-1/3">
        <Link href="/">
          <p>Home</p>
        </Link>{" "}
        <Link href="/contacts">
          <p>Contacts</p>
        </Link>
        <Link href="/privacy">
          <p>Privacy Policy</p>
        </Link>
        <Link href="/impressum">
          <p>Impressum</p>
        </Link>
      </div>
      <div className="flex flex-col text-[10px] border-l pl-10 border-white w-1/3">
        <Link href="/massage">
          <p>Massage</p>
        </Link>
        <Link href="/pilates">
          <p>Pilates</p>
        </Link>
        <Link href="/oils">
          <p>Oils</p>
        </Link>
        <Link href="/workshops">
          <p>Workshops</p>
        </Link>
      </div>
    </div>
  );
}
