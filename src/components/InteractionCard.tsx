import DontUnderstandLgIcon from './icons/DontUnderstandLgIcon'
import IfinishLgIcon from './icons/IfinishLgIcon'
import IunderstandLgIcon from './icons/IunderstandLgIcon'
import PermissionToSpeakLgIcon from './icons/PermissionToSpeakLgIcon'
import SlowLgIcon from './icons/SlowLgIcon'
import InteractionCardTitle from './InteractionCardTitle'

interface Props {
    className?: string
    type: 'question' | 'dontUnderstand' | 'iUnderstand' | 'slow' | 'iFinish'
    isActive: boolean
    setActiveInteraction: () => void
}

const InteractionCard = ({
    className,
    type,
    isActive,
    setActiveInteraction,
}: Props) => {
    const cards = {
        question: {
            icon: <PermissionToSpeakLgIcon />,
            description: "j'ai une question",
            bgHover: 'hover:bg-[#9787FE]',
            bgActive: 'bg-[#6B49FB]',
        },
        dontUnderstand: {
            icon: <DontUnderstandLgIcon />,
            description: "je n'ai pas compris",
            bgHover: 'hover:bg-[#5FBFFB]',
            bgActive: 'bg-[#2B9BF7]',
        },
        iUnderstand: {
            icon: <IunderstandLgIcon />,
            description: "j'ai compris",
            bgHover: 'hover:bg-[#63CB8F]',
            bgActive: 'bg-[#23A65F]',
        },
        slow: {
            icon: <SlowLgIcon />,
            description: 'Ralentir le rythme',
            bgHover: 'hover:bg-[#44BED2]',
            bgActive: 'bg-[#23A0B7]',
        },
        iFinish: {
            icon: <IfinishLgIcon />,
            description: "J'ai terminé",
            bgHover: 'hover:bg-[#FC7365]',
            bgActive: 'bg-[#F4503F]',
        },
    }

    return (
        <div
            className={`group ${className} flex flex-col justify-center items-center gap-7 px-14 py-9 w-[14rem] cursor-pointer rounded-md shadow-md ${
                isActive ? cards[type].bgActive : 'bg-white'
            } ${!isActive && cards[type].bgHover}`}
            onClick={() => setActiveInteraction()}
        >
            {cards[type].icon}

            <InteractionCardTitle
                className={!isActive ? 'text-[#111728]' : 'text-white'}
                interaction={cards[type].description}
            />
        </div>
    )
}

export default InteractionCard
