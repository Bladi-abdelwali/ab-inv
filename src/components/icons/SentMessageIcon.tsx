interface Props {
  className?: string;
}
const SentMessageIcon = ({ className }: Props) => {
  return (
    <svg
      className={className}
      width="120"
      height="120"
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="120" height="120" rx="60" fill="#DBEFDC" />
      <path
        d="M50.9888 72.5095L38.4787 59.9995L34.2188 64.2295L50.9888 80.9995L86.9888 44.9995L82.7588 40.7695L50.9888 72.5095Z"
        fill="#4CAF50"
      />
    </svg>
  );
};

export default SentMessageIcon;
