import { ReactNode } from "react";

export default function Container({ children }: { children: ReactNode }) {
  return (
    <div className="w-full  flex flex-col items-center justify-center px-8 sm:px-12 lg:px-14  overflow-hidden">
      {children}
    </div>
  );
}
