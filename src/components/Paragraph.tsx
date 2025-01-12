import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
}

const Paragraph = ({ children, className }: Props) => {
  return <p className={`${className} text-[#364052]`}>{children}</p>;
};

export default Paragraph;
