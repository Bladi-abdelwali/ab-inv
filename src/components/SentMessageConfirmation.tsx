import SentMessageIcon from './icons/SentMessageIcon'

interface Props {
    className?: string
}
const SentMessageConfirmation = ({ className }: Props) => {
    return (
        <div
            className={`${className} flex flex-col justify-center items-center gap-6 h-[36rem]`}
        >
            <SentMessageIcon />
            <p className="text-center text-xl font-semibold text-[#4CAF50] w-64">
                Ton message a bien été envoyé
            </p>
        </div>
    )
}

export default SentMessageConfirmation
