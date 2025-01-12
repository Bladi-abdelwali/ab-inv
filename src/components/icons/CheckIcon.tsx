interface Props {
  className?: string;
}
const CheckIcon = ({ className }: Props) => {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.33301 8.66667L5.99967 11.3333L12.6663 4.66667"
        stroke="#1B6DDA"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default CheckIcon;
