import { ReactNode } from "react";

interface Props {
  className?: string;
  children: ReactNode;
}

const Title = ({ children, className }: Props) => {
  return (
    <h1 className={`${className} font-semibold text-2xl text-[#364052]`}>
      {children}
    </h1>
  );
};

export default Title;
