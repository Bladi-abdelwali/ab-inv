interface ButtonProps {
    className?: string
    type: 'join' | 'send'
    disabled?: boolean
    onClick?: () => void
}

const StudentSessionButton: React.FC<ButtonProps> = ({
    className,
    type,
    disabled = true,
    onClick,
}) => {
    return (
        <button
            className={`${className} py-3 rounded-lg w-[23rem] ${
                disabled
                    ? 'bg-[#E3E7EF] cursor-not-allowed text-[#97A2B5]'
                    : 'bg-gradient-to-r from-[#2B9BF7] to-[#4945FF] text-white'
            }`}
            disabled={disabled}
            onClick={onClick ? () => onClick() : undefined}
        >
            {type === 'join'
                ? 'Rejoindre la session'
                : 'Envoyer le message à mon enseignant'}
        </button>
    )
}

export default StudentSessionButton
