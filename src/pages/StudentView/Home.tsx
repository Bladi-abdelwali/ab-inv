import React, { useState, ChangeEvent, FormEvent } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import Input from '../../components/Input'
import Paragraph from '../../components/Paragraph'
import StudentSessionButton from '../../components/StudentSessionButton'
import JoinRoomLoading from '../../components/JoinRoomLoading'
import Card from '../../components/Card'
import Illustration from '../../components/icons/Illustration'
import { useSocket } from '../../contexts/SocketContext'
import RejectStudentIcon from '../../components/icons/RejectStudentIcon'

const Home: React.FC = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const { socket } = useSocket()
    const [isLoading, setIsLoading] = useState(false)
    const [userName, setUserName] = useState('')
    const [accessCode, setAccessCode] = useState('')
    const [joinError, setJoinError] = useState<string | null>(null)
    const [codeError, setCodeError] = useState<boolean>(false)
    const [sessionEnded, setSessionEnded] = useState<boolean>(
        location.state?.sessionEnded || false
    )

    const handleUserNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setUserName(e.target.value)
        setJoinError(null)
        setCodeError(false)
    }

    const handleAccessCodeChange = (e: ChangeEvent<HTMLInputElement>) => {
        setAccessCode(e.target.value)
        setJoinError(null)
        setCodeError(false)
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (socket && userName && accessCode) {
            setIsLoading(true)
            setJoinError(null)
            setCodeError(false)

            if (accessCode.trim().length !== 4) {
                setJoinError(
                    'Le code de session doit être un code à 4 chiffres'
                )
                setCodeError(true)
                setIsLoading(false)
                return
            }

            socket.emit('join_session', { userName, sessionCode: accessCode })

            socket.on('join_session_pending', () => {
                setIsLoading(true)
                setJoinError(null)
            })

            socket.on('join_request_response', (response) => {
                if (response.accepted) {
                    navigate(`/student/session/${response.sessionCode}`, {
                        state: {
                            userName: userName,
                            studentId: response.studentId,
                            sessionCode: response.sessionCode,
                        },
                    })
                } else {
                    setIsLoading(false)
                    setJoinError(
                        'Votre demande a été refusée par le professeur.'
                    )
                    setCodeError(true)
                }
            })

            socket.on('join_session_error', (error) => {
                setJoinError(error.message || 'Erreur de connexion')
                setCodeError(true)
                setIsLoading(false)
            })
        }
    }

    const handleDismissSessionEnded = () => {
        setSessionEnded(false)
    }

    const isFormValid = userName.trim() !== '' && accessCode.trim() !== ''

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-[#9787FE]">
            {sessionEnded && (
                <div
                    className="w-full bg-[#EAEFFD] rounded-b text-teal-900 px-4 py-3 shadow-md absolute top-0"
                    role="alert"
                >
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <div className="py-1">
                                <svg
                                    className="fill-current h-6 w-6 text-[#295FEC] mr-4"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                >
                                    <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-sm">
                                    L'enseignant a mis fin à la session
                                    d'interaction.
                                </p>
                            </div>
                        </div>
                        <div onClick={handleDismissSessionEnded}>
                            <RejectStudentIcon />
                        </div>
                    </div>
                </div>
            )}
            <Card>
                <div className="p-8 pt-0 h-full flex flex-col gap-6">
                    {!isLoading ? (
                        <div className="flex flex-1">
                            <div className="flex flex-col pt-8">
                                <h4 className="text-[#9787FE] font-semibold text-[24px] text-left">
                                    Rejoindre une session d'interactions
                                </h4>
                                <Paragraph className="text-[16px] font-normal leading-[24px] text-left w-[22.5rem] my-4 mb-10">
                                    Entre ton nom et le code partagé par <br />{' '}
                                    ton enseignant pour pouvoir lui <br />
                                    envoyer un message.
                                </Paragraph>
                                <form
                                    onSubmit={handleSubmit}
                                    className="w-full"
                                >
                                    <div className="mb-12">
                                        <Input
                                            type="userName"
                                            className="mb-6"
                                            value={userName}
                                            onChange={handleUserNameChange}
                                        />
                                        <div>
                                            <Input
                                                type="code"
                                                value={accessCode}
                                                onChange={
                                                    handleAccessCodeChange
                                                }
                                                error={joinError}
                                            />
                                        </div>
                                    </div>
                                    <StudentSessionButton
                                        type="join"
                                        className="w-full"
                                        disabled={!isFormValid}
                                    />
                                </form>
                            </div>
                            <div className="w-1/2 flex items-center justify-center overflow-hidden">
                                <Illustration className="w-full max-w-[10rem] max-h-[10rem] text-[#111728]" />
                            </div>
                        </div>
                    ) : (
                        <JoinRoomLoading />
                    )}
                </div>
            </Card>
        </div>
    )
}

export default Home
