import Image from "next/image";
export default function MassagePrices({ format }: { format: string }) {
  const prices = [
    "30 min → 20€ ~ 30€",
    "60 min → 40€ ~ 60€",
    "90 min → 70€ ~ 90€",
    "120 min → 100€ ~ 120€",
  ];
  return (
    <div className="relative w-full flex flex-col items-center ">
      <Image
        src={`/img/therapy2.${format}`}
        alt="BeingBodyPrices"
        className="absolute opacity-40"
        width={400}
        height={400}
      />
      <div className=" w-[60%] z-10 ">
        <div className=" handWrite1 flex flex-col items-end w-full">
          <h3>Price on a Sliding scale</h3>
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
