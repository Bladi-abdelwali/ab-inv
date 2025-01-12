import { Dispatch, SetStateAction } from 'react'
import Button from './Button'
import SessionHeaderInformationCard from './SessionHeaderInformationCard'
import Title from './Title'

interface Props {
    className?: string
    code: string | undefined
    participantCount: number
    setOpenStudentsList: Dispatch<SetStateAction<boolean>>
    setIsOpen: Dispatch<SetStateAction<boolean>>
    setSessionModalIsOpen: Dispatch<SetStateAction<boolean>>
    pendingCount:number
}

const SessionHeader = ({
    participantCount,
    code,
    className,
    setOpenStudentsList,
    setIsOpen,
    setSessionModalIsOpen,
    pendingCount
}: Props) => {
    return (
        <div
            className={`${className} px-6 py-4 flex justify-between items-center border-b border-b-[#E3E7EF]`}
        >
            <div>
                <Title>Session d'interaction</Title>
                <div className="flex justify-start items-center gap-2 mt-2">
                    <SessionHeaderInformationCard
                        type="code"
                        cardNumber={code}
                        setIsOpen={setIsOpen}
                    />
                    <SessionHeaderInformationCard
                        notificationCount={pendingCount}
                        type="participants"
                        cardNumber={participantCount.toString()}
                        setIsOpen={setOpenStudentsList}
                    />
                </div>
            </div>
            <Button type="stop" onClick={() => setSessionModalIsOpen(true)} />
        </div>
    )
}

export default SessionHeader
