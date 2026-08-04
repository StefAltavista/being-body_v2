export default function Bubble({
  text,
  className = "",
  delay = "0s",
  size = 20,
  fontSize = "18px",
}: {
  text: string;
  className?: string;
  delay?: string;
  size?: number;
  fontSize?: string;
}) {
  return (
    <div
      className={`tech_bubble animate-bubble-float bottom-[-120px] w-${size} h-${size} flex justify-center items-center rounded-full border border-white/50 bg-gradient-to-br from-pink-200/70 to-sky-200/70 backdrop-blur-sm shadow-[inset_0_2px_10px_rgba(255,255,255,0.85),inset_0_-8px_16px_rgba(255,255,255,0.18),0_0_18px_rgba(255,255,255,0.22)] ${className}`}
      style={{
        animationDelay: delay,
      }}
    >
      <p
        className={`!text-[${fontSize}] text-slate-700 !text-center leading-tight px-1`}
      >
        {text}
      </p>
    </div>
  );
}
