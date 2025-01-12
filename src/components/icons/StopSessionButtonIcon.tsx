interface Props {
  className?: string;
}
const StopSessionIcon = ({ className }: Props) => {
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
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M7.99998 14.4C9.69736 14.4 11.3252 13.7257 12.5255 12.5255C13.7257 11.3253 14.4 9.69739 14.4 8.00001C14.4 6.30262 13.7257 4.67476 12.5255 3.47452C11.3252 2.27429 9.69736 1.60001 7.99998 1.60001C6.30259 1.60001 4.67472 2.27429 3.47449 3.47452C2.27426 4.67476 1.59998 6.30262 1.59998 8.00001C1.59998 9.69739 2.27426 11.3253 3.47449 12.5255C4.67472 13.7257 6.30259 14.4 7.99998 14.4ZM6.96558 5.83441C6.81469 5.68868 6.61261 5.60804 6.40285 5.60987C6.1931 5.61169 5.99245 5.69582 5.84412 5.84415C5.69579 5.99248 5.61166 6.19313 5.60984 6.40288C5.60801 6.61264 5.68865 6.81472 5.83438 6.96561L6.86878 8.00001L5.83438 9.03441C5.75797 9.1082 5.69702 9.19648 5.65509 9.29408C5.61317 9.39169 5.5911 9.49666 5.59017 9.60289C5.58925 9.70911 5.60949 9.81445 5.64972 9.91277C5.68994 10.0111 5.74934 10.1004 5.82446 10.1755C5.89957 10.2506 5.98889 10.31 6.08721 10.3503C6.18553 10.3905 6.29087 10.4107 6.3971 10.4098C6.50332 10.4089 6.6083 10.3868 6.7059 10.3449C6.8035 10.303 6.89178 10.242 6.96558 10.1656L7.99998 9.13121L9.03438 10.1656C9.18526 10.3113 9.38734 10.392 9.5971 10.3901C9.80685 10.3883 10.0075 10.3042 10.1558 10.1559C10.3042 10.0075 10.3883 9.80688 10.3901 9.59713C10.3919 9.38737 10.3113 9.18529 10.1656 9.03441L9.13117 8.00001L10.1656 6.96561C10.3113 6.81472 10.3919 6.61264 10.3901 6.40288C10.3883 6.19313 10.3042 5.99248 10.1558 5.84415C10.0075 5.69582 9.80685 5.61169 9.5971 5.60987C9.38734 5.60804 9.18526 5.68868 9.03438 5.83441L7.99998 6.86881L6.96558 5.83441Z"
        fill="white"
      />
    </svg>
  );
};

export default StopSessionIcon;
