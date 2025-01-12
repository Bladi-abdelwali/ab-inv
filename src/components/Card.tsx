import React from 'react';

interface CardProps {
  children: React.ReactNode;
}

const Card = ({ children }: CardProps) => {
  return (
    <div
      className="w-[758px] h-[554px] flex-shrink-0 rounded-[8px] border border-[#E3E7EF] bg-white shadow-md"
    >
      {children}
    </div>
  );
};

export default Card;
