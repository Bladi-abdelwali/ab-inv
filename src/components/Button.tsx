import StopSessionButtonIcon from './icons/StopSessionButtonIcon'

interface Props {
    type: 'start' | 'stop' | 'env'
    onClick: () => void
}
const Button = ({ onClick, type }: Props) => {
    return (
        <button
            onClick={onClick}
            className={`text-white rounded-lg text-sm font-semibold flex items-center ${
                type === 'start'
                    ? 'bg-[#2B9BF7] px-6 py-[14px]'
                    : 'bg-[#F44336] px-3 py-2'
            }`}
        >
            {type === 'stop' && <StopSessionButtonIcon className="mr-2" />}
            {type === 'start'
                ? 'Lancer la session d’interaction'
                : 'Arrêter la session'}
        </button>
    )
}

export default Button
