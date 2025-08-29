import Link from "next/link";
import { useState } from "react";

export default function BookButton() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Link
      href={"/contacts"}
      className=" relative bg-green-200 w-[100px] h-[100px] m-20 "
      onClick={() => setIsOpen(!isOpen)}
    >
      <h1 className="absolute left-[-20px]">Book </h1>
      <h1 className="absolute top-[60px] pl-4">Appointment</h1>
    </Link>
  );
}
