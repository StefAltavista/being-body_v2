import Image from "next/image";
export default function MassagePrices({ format }: { format?: string }) {
  const prices = [
    "30 min → 20€ ~ 30€",
    "60 min → 40€ ~ 60€",
    "90 min → 70€ ~ 90€",
    "120 min → 100€ ~ 120€",
  ];
  return (
    <div className="relative w-full max-w-150 flex flex-col items-center py-8 mb-8 ">
      <Image
        src={`/img/therapy2.${format || "webp"}`}
        alt="BeingBodyPrices"
        className="absolute opacity-40"
        width={300}
        height={300}
      />
      <div className=" w-[60%] z-10 ">
        <div className=" handWrite1 flex flex-col items-end w-full">
          {prices.map((x: string) => (
            <p className="handWrite1 !mb-6" key={x}>
              {x}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
