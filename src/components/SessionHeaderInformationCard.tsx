import { Dispatch, SetStateAction } from 'react'
import LockIcon from './icons/LockIcon'
import ParticipantsIcon from './icons/ParticipantsIcon'
import UserIcon from './icons/UserIcon'
interface Props {
    className?: string
    type: 'code' | 'participants' | 'student'
    cardNumber?: string
    studentName?: string
    setIsOpen?: Dispatch<SetStateAction<boolean>>
    notificationCount?: number
}
const icons = {
    code: <LockIcon />,
    participants: <ParticipantsIcon />,
    student: <UserIcon />,
}
const SessionHeaderInformationCard = ({
    className,
    type,
    cardNumber,
    studentName,
    setIsOpen,
    notificationCount = 0,
}: Props) => {
    return (
        <div className="relative inline-block">
            <span
                className={`${className} text-[#111728] flex justify-center items-center py-1 px-3 rounded-lg bg-[#F2F5F8] gap-1 cursor-pointer`}
                onClick={() => setIsOpen && setIsOpen(true)}
            >
                {icons[type]}
                {type === 'code'
                    ? `Code : ${cardNumber}`
                    : type === 'participants'
                      ? ` ${cardNumber} participants`
                      : ` ${studentName}`}
            </span>
            {notificationCount > 0 && (
                <span className="absolute -top-2 -right-2 flex items-center justify-center h-5 w-5 text-xs font-bold text-white bg-red-500 rounded-full">
                    {notificationCount}
                </span>
            )}
        </div>
    )
}
export default SessionHeaderInformationCard
