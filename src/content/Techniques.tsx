import "../css/about.css";
import Image from "next/image";

export default function Techniques({ format }: { format: string }) {
  const bulletPoints = [
    " Combine techniques from Traditional Thai Massage, LOMILOMI, and trigger point therapy",
    "Stone Massage adds warmth and grounding for deeper muscle relaxation and circulation",
    "Focus on mindful breathing and body feedback to guide pressure and movement",
  ];
  return (
    <div className="flex justify-center items-stretch w-full">
      {/* Image */}
      <div className="w-1/3 mr-8 flex-shrink-0">
        <Image
          src={`/img/stoneMassage.jpg`}
          alt="beingBodyabout"
          width={300}
          height={300}
          className="object-cover h-full w-full"
        />
      </div>

      {/* Bullet Points */}
      <div className="w-2/3  flex flex-col justify-around">
        <h1 className="text-right"> Different Techniques</h1>
        <div className="  flex flex-col justify-around">
          {bulletPoints.map((x, i) => (
            <h3 key={i} className="handWrite2  mb-6 !text-[23px] text-right">
              {x}
            </h3>
          ))}
        </div>
      </div>
    </div>
  );
}
