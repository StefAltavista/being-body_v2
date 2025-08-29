import { ReactNode } from "react";

export default function Container({
  children,
  classname,
}: {
  children: ReactNode;
  classname?: string;
}) {
  classname +=
    " w-full  flex flex-col items-center justify-center px-8 sm:px-12 lg:px-14  overflow-hidden ";
  return <div className={classname}>{children}</div>;
}
