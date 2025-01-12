import { useEffect, useState } from 'react'
import { useParams, useLocation, useNavigate } from 'react-router-dom'
import InteractionCard from '../../components/InteractionCard'
import SessionHeaderInformationCard from '../../components/SessionHeaderInformationCard'
import StudentSessionButton from '../../components/StudentSessionButton'
import Title from '../../components/Title'
import SentMessageConfirmation from '../../components/SentMessageConfirmation'
import { useSocket } from '../../contexts/SocketContext'

type InteractionType =
    | 'question'
    | 'dontUnderstand'
    | 'iUnderstand'
    | 'slow'
    | 'iFinish'

export default function StudentSession() {
    const { id: sessionCode } = useParams<{ id: string }>()
    const location = useLocation()
    const navigate = useNavigate()
    const userName = location.state?.userName || 'Élève'
    const { socket } = useSocket()

    const [sessionStatus, setSessionStatus] = useState<
        'pending' | 'active' | 'initial'
    >('initial')
    const [canSendInteraction, setCanSendInteraction] = useState(true)
    const [hasUnreadInteraction, setHasUnreadInteraction] = useState(false)
    const [lastInteractionId, setLastInteractionId] = useState<string | null>(
        null
    )

    const [activeInteraction, setActiveInteraction] = useState<string | null>(
        null
    )
    const interactions: Array<InteractionType> = [
        'question',
        'dontUnderstand',
        'iUnderstand',
        'slow',
        'iFinish',
    ]

    useEffect(() => {
        if (!socket) return

        const tryReconnect = () => {
            socket.emit('student_reconnect_session', { sessionCode, userName })
        }

        const handleSessionRestored = (data: {
            sessionCode: string
            status: 'pending' | 'active'
            hasUnreadInteraction?: boolean
        }) => {
            setSessionStatus(data.status)
            if (data.hasUnreadInteraction) {
                setHasUnreadInteraction(true)
                setCanSendInteraction(false)
            } else {
                setHasUnreadInteraction(false)
                setCanSendInteraction(true)
            }
        }

        const handleInteractionError = (error: { message: string }) => {
            if (error.message.includes('précédente interaction')) {
                setHasUnreadInteraction(true)
                setCanSendInteraction(false)
            }
        }

        const handleInteractionRead = ({
            interactionId,
            studentName,
        }: {
            interactionId: string
            studentName: string
        }) => {
            if (studentName === userName) {
                setHasUnreadInteraction(false)
                setCanSendInteraction(true)
                setLastInteractionId(null)
            }
        }

        const handleEndSessionForStudents = () => {
            navigate('/student', {
                replace: true,
                state: { sessionEnded: true },
            })
        }

        const handleForceRedirectHome = () => {
            navigate('/student', {
                replace: true,
                state: { sessionEnded: true },
            })
        }

        const handleRemovedFromSession = () => {
            navigate('/student', { replace: true })
        }

        socket.on('student_session_restored', handleSessionRestored)
        socket.on('interaction_error', handleInteractionError)
        socket.on('interaction_read', handleInteractionRead)
        socket.on('end_session_for_students', handleEndSessionForStudents)
        socket.on('force_redirect_home', handleForceRedirectHome)
        socket.on('removed_from_session', handleRemovedFromSession)

        tryReconnect()

        return () => {
            socket.off('student_session_restored', handleSessionRestored)
            socket.off('interaction_error', handleInteractionError)
            socket.off('interaction_read', handleInteractionRead)
            socket.off('end_session_for_students', handleEndSessionForStudents)
            socket.off('force_redirect_home', handleForceRedirectHome)
            socket.off('removed_from_session', handleRemovedFromSession)
        }
    }, [
        socket,
        navigate,
        userName,
        sessionCode,
        lastInteractionId,
        hasUnreadInteraction,
    ])

    const sendInteraction = (type: string | null) => {
        if (socket) {
            const interactionData = {
                sessionCode,
                userName,
                type,
            }

            socket.emit('student_send_interaction', interactionData)
            setCanSendInteraction(false)
            setHasUnreadInteraction(true)
            setActiveInteraction(null)
        }
    }

    return (
        <div className="flex justify-center items-center h-screen bg-[#9787FE]">
            <div className="flex flex-col bg-white w-[60rem] rounded-lg">
                <div className="p-6 flex justify-between items-center">
                    <Title>Session d’interaction avec Enseignant</Title>
                    <SessionHeaderInformationCard
                        type="student"
                        studentName={userName}
                    />
                </div>
                {hasUnreadInteraction ? (
                    <SentMessageConfirmation />
                ) : (
                    <div className="flex flex-col justify-center items-center px-20 py-16">
                        <div className="flex flex-wrap justify-center gap-6 items-center mb-16">
                            {interactions.map((interaction) => (
                                <InteractionCard
                                    key={interaction}
                                    type={interaction}
                                    isActive={activeInteraction === interaction}
                                    setActiveInteraction={() =>
                                        setActiveInteraction(interaction)
                                    }
                                />
                            ))}
                        </div>
                        <StudentSessionButton
                            disabled={activeInteraction === null}
                            onClick={() => sendInteraction(activeInteraction)}
                            type={'send'}
                        />
                    </div>
                )}
            </div>
        </div>
    )
}
