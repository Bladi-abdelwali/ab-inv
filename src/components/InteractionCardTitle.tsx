interface Props {
    className?: string;
    interaction: string;
  }
  
  const InteractionCardTitle = ({ className, interaction }: Props) => {
    return (
      <h1
        className={`${className} text-base font-bold whitespace-nowrap overflow-hidden`}
        title={interaction}
      >
        {interaction}
      </h1>
    );
  };
  
  export default InteractionCardTitle;
  