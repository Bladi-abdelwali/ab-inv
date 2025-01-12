interface Props {
  className?: string;
}

const AcceptStudentIcon = ({ className }: Props) => {
  return (
    <svg
      className={className}
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="28" height="28" rx="14" fill="#1B6DDA" />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M20.707 9.293C20.8945 9.48053 20.9998 9.73484 20.9998 10C20.9998 10.2652 20.8945 10.5195 20.707 10.707L12.707 18.707C12.5195 18.8945 12.2652 18.9998 12 18.9998C11.7349 18.9998 11.4806 18.8945 11.293 18.707L7.29304 14.707C7.11088 14.5184 7.01009 14.2658 7.01237 14.0036C7.01465 13.7414 7.11981 13.4906 7.30522 13.3052C7.49063 13.1198 7.74144 13.0146 8.00364 13.0123C8.26584 13.01 8.51844 13.1108 8.70704 13.293L12 16.586L19.293 9.293C19.4806 9.10553 19.7349 9.00021 20 9.00021C20.2652 9.00021 20.5195 9.10553 20.707 9.293Z"
        fill="white"
      />
    </svg>
  );
};

export default AcceptStudentIcon;
