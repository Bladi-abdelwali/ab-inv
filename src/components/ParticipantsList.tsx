import React, { Dispatch, SetStateAction } from 'react'
import ParticipantCard from './ParticipantCard'

interface Student {
    id: string
    userName: string
    joinedAt: number
}

interface ParticipantsListProps {
    participants: Student[]
    pendingParticipants?: Student[]
    onAcceptStudent?: (student: Student) => void
    onRejectStudent?: (student: Student) => void
    onAcceptAllStudents?: () => void
    onRemoveStudent?: (student: Student) => void
    setOpenStudentsList: Dispatch<SetStateAction<boolean>>
}

const ParticipantsList: React.FC<ParticipantsListProps> = ({
    participants,
    pendingParticipants = [],
    onAcceptStudent,
    onRejectStudent,
    onAcceptAllStudents,
    onRemoveStudent,
    setOpenStudentsList,
}) => {
    const handleAcceptAll = () => {
        if (onAcceptAllStudents) {
            onAcceptAllStudents()
        }
    }

    return (
        <div className="p-4 w-80">
            <div className="flex justify-between items-center mb-4">
                <h3 className="uppercase text-[#7B869A] font-semibold">
                    Participants
                </h3>

                <button
                    type="button"
                    onClick={() => setOpenStudentsList(false)}
                    className="text-3xl text-gray-400 hover:text-gray-600"
                >
                    &times;
                </button>
            </div>

            {/* Liste des demandes de participation */}
            {pendingParticipants.length > 0 && (
                <>
                    <div className="flex justify-between items-center py-4">
                        <p className="text-[#7B869A] text-sm">
                            Demandes ({pendingParticipants.length})
                        </p>
                        <button
                            onClick={handleAcceptAll}
                            className="text-[#1B6DDA]"
                        >
                            Tout accepter
                        </button>
                    </div>

                    <div
                        className={`flex flex-col gap-4 ${participants.length > 0 && pendingParticipants.length > 4 && 'max-h-56'} ${participants.length === 0 && 'h-[77vh]'} overflow-y-auto`}
                    >
                        {pendingParticipants.map((student) => {
                            return (
                                <ParticipantCard
                                    key={student.id}
                                    studentName={student.userName}
                                    isAccepted={false}
                                    onAccept={() => onAcceptStudent?.(student)}
                                    onReject={() => onRejectStudent?.(student)}
                                />
                            )
                        })}
                    </div>
                </>
            )}

            {/* Liste des participants actifs */}
            {participants.length > 0 && (
                <>
                    <p className="text-[#7B869A] text-sm py-4">
                        Participants de la session ({participants.length})
                    </p>

                    <div
                        className={`flex flex-col gap-4 ${pendingParticipants.length > 0 && 'max-h-56'} h-[77vh] overflow-y-auto`}
                    >
                        {participants.map((student) => {
                            return (
                                <ParticipantCard
                                    key={student.id}
                                    studentName={student.userName}
                                    isAccepted={true}
                                    onReject={() => onRemoveStudent?.(student)}
                                />
                            )
                        })}
                    </div>
                </>
            )}

            {/* Message d'invitation si aucune demande ni participant actif */}
            {participants.length === 0 && pendingParticipants.length === 0 && (
                <p className="text-sm text-center text-[#97A2B5] px-10 mt-[70%]">
                    Partagez le code pour commencer à recevoir des interactions
                    !
                </p>
            )}
        </div>
    )
}

export default ParticipantsList
