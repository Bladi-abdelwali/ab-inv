import React, { useEffect, useState } from 'react'
import { useSocket } from '../../contexts/SocketContext'
import { useNavigate, useParams } from 'react-router-dom'
import InteractionsListEmptyState from '../../components/InteractionsListEmptyState'
import MessageCard from '../../components/MessageCard'
import ParticipantsList from '../../components/ParticipantsList'
import SessionHeader from '../../components/SessionHeader'
import CodeModal from '../../components/Modals/CodeModal'
import StopSessionWarningModal from '../../components/Modals/StopSessionModal'

interface Interaction {
    id: string
    studentName: string
    type: 'question' | 'dontUnderstand' | 'iUnderstand' | 'slow' | 'iFinish'
    status: 'unread' | 'read'
    timestamp: number
}

interface Student {
    id: string
    userName: string
    joinedAt: number
}

const formatTimeElapsed = (timestamp: number): string => {
    const now = Date.now()
    const diffInSeconds = Math.floor((now - timestamp) / 1000)
    const diffInMinutes = Math.floor(diffInSeconds / 60)

    if (diffInMinutes < 60) return `Il y a ${diffInMinutes} min`
    const diffInHours = Math.floor(diffInMinutes / 60)
    return `Il y a ${diffInHours} h`
}

const TeacherStartedSessionPage: React.FC = () => {
    const { id: sessionCode } = useParams<{ id: string }>()
    const navigate = useNavigate()
    const { socket } = useSocket()
    const [interactions, setInteractions] = useState<Interaction[]>([])
    const [activeParticipants, setActiveParticipants] = useState<Student[]>([])
    const [pendingParticipants, setPendingParticipants] = useState<Student[]>(
        []
    )
    const [openStudentsList, setOpenStudentsList] = useState(true)
    const [isOpen, setIsOpen] = useState(false)
    const [sessionModalIsOpen, setSessionModalIsOpen] = useState(false)

    useEffect(() => {
        if (!socket) return

        socket.emit('teacher_join_session', { sessionCode })

        socket.on(
            'current_session_data',
            (data: {
                activeStudents: Student[]
                pendingStudents: Student[]
            }) => {
                setActiveParticipants(data.activeStudents || [])
                setPendingParticipants(data.pendingStudents || [])
            }
        )

        socket.on('session_interactions', (data: Interaction[]) => {
            setInteractions(data)
        })

        socket.on('new_student_interaction', (interaction: Interaction) => {
            setInteractions((prev) => [interaction, ...prev])
        })

        socket.on('student_join_request', (data: { student: Student }) => {
            setPendingParticipants((prev) => {
                if (!prev.find((p) => p.id === data.student.id)) {
                    return [...prev, data.student]
                }
                return prev
            })
        })
        socket.emit('fetch_session_interactions', { sessionCode })

        socket.on('removed_from_session', () => {
            navigate('/')
        })

        socket.on('session_ended', () => {
            navigate('/')
        })

        return () => {
            socket.off('current_session_data')
            socket.off('session_interactions')
            socket.off('new_student_interaction')
            socket.off('student_join_request')
            socket.off('removed_from_session')
            socket.off('session_ended')
        }
    }, [socket, sessionCode, navigate])

    useEffect(() => {
        document.title = `Session d'interaction ${pendingParticipants.length !== 0 ? `(${pendingParticipants.length})` : ''}`
    }, [pendingParticipants])

    const handleStopSession = () => {
        if (socket) {
            socket.emit('teacher_end_session', { sessionCode })
            navigate('/teacher')
            window.jimoInit()
        }
    }

    const handleMarkAsRead = (interactionId: string) => {
        if (socket) {
            socket.emit('teacher_mark_interaction_read', {
                sessionCode,
                interactionId,
            })

            const interaction = interactions.find(
                (interaction) => interaction.id === interactionId
            )

            if (interaction) {
                socket.emit('interaction_read', {
                    interactionId,
                    studentName: interaction.studentName,
                })
                setInteractions((prev) =>
                    prev.map((interaction) =>
                        interaction.id === interactionId
                            ? { ...interaction, status: 'read' }
                            : interaction
                    )
                )
            }
        }
    }

    const unreadInteractions = interactions
        .filter((interaction) => interaction.status === 'unread')
        .sort((a, b) => b.timestamp - a.timestamp)

    const allMessagesRead =
        interactions.length > 0 && unreadInteractions.length === 0

    useEffect(() => {
        const interval = setInterval(() => {
            setInteractions((prevInteractions) =>
                prevInteractions.map((interaction) => ({
                    ...interaction,
                    formattedTime: formatTimeElapsed(interaction.timestamp),
                }))
            )
        }, 60000)

        return () => clearInterval(interval)
    }, [])

    return (
        <div>
            <SessionHeader
                code={sessionCode}
                participantCount={activeParticipants.length}
                setOpenStudentsList={setOpenStudentsList}
                setIsOpen={setIsOpen}
                setSessionModalIsOpen={setSessionModalIsOpen}
                pendingCount={pendingParticipants.length}
            />
            <div className="flex h-[calc(100vh-88px)] relative overflow-hidden">
                <div
                    className={`flex-1 px-6 transition-all duration-500 ${openStudentsList ? 'mr-80' : 'mr-0'}`}
                >
                    {allMessagesRead || unreadInteractions.length === 0 ? (
                        <InteractionsListEmptyState
                            isAllMessagesRead={allMessagesRead}
                            noInteractionsMessage="Vous n’avez pas encore d’interaction avec les élèves. Partagez leur le code pour commencer à recevoir les interactions."
                            allMessagesReadMessage={`Nous n’avez pas reçu de nouveaux messages,\n ou vous avez marqué tous les messages comme lus.`}
                        />
                    ) : (
                        <div className="w-[calc(100vw-23rem)]">
                            <p className="uppercase text-[#4A5466] text-xs font-semibold py-3 my-3">
                                Messages reçus ({unreadInteractions.length})
                            </p>
                            <>
                                {unreadInteractions.map((interaction) => (
                                    <MessageCard
                                        className="mb-2"
                                        key={interaction.id}
                                        cardType={interaction.type}
                                        name={interaction.studentName}
                                        onMarkAsRead={() =>
                                            handleMarkAsRead(interaction.id)
                                        }
                                        isRead={interaction.status === 'read'}
                                        timeElapsed={formatTimeElapsed(
                                            interaction.timestamp
                                        )}
                                    />
                                ))}
                            </>
                        </div>
                    )}
                </div>

                <div
                    className={`absolute top-0 right-0 h-full border-l border-l-[#E3E7EF] w-80 transition-transform duration-500 ${
                        openStudentsList ? 'translate-x-0' : 'translate-x-full'
                    }`}
                >
                    <ParticipantsList
                        participants={activeParticipants}
                        pendingParticipants={pendingParticipants}
                        onAcceptStudent={(student) =>
                            socket?.emit('teacher_respond_join_request', {
                                sessionCode,
                                studentId: student.id,
                                accepted: true,
                            })
                        }
                        onRejectStudent={(student) =>
                            socket?.emit('teacher_respond_join_request', {
                                sessionCode,
                                studentId: student.id,
                                accepted: false,
                            })
                        }
                        onAcceptAllStudents={() =>
                            socket?.emit('teacher_accept_all_requests', {
                                sessionCode,
                            })
                        }
                        onRemoveStudent={(student) =>
                            socket?.emit('teacher_remove_student', {
                                sessionCode,
                                studentId: student.id,
                            })
                        }
                        setOpenStudentsList={setOpenStudentsList}
                    />
                </div>
                {isOpen && <CodeModal setIsOpen={setIsOpen} />}

                {sessionModalIsOpen && (
                    <StopSessionWarningModal
                        setSessionModalIsOpen={setSessionModalIsOpen}
                        stopSession={handleStopSession}
                    />
                )}
            </div>
        </div>
    )
}

export default TeacherStartedSessionPage
