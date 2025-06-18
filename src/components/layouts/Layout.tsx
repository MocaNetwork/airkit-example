import type { FC } from "react";

export const Layout: FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return <div className="max-w-5xl mx-auto pt-10 px-4">{children}</div>;
};
