import { useParams } from 'react-router-dom'
import Title from '../Title'

interface Props {
    className?: string
    setIsOpen: (isOpen: boolean) => void
}
const Modal = ({ className, setIsOpen }: Props) => {
    const { id: sessionCode } = useParams<{ id: string }>()
    return (
        <div
            className={`${className} flex items-center justify-center min-h-screen bg-gray-100`}
        >
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white rounded-lg shadow-lg w-[35rem]">
                    <div className="flex justify-between items-center border-b border-b-[#E3E7EF] p-6">
                        <Title>Code d’accès à la session</Title>
                        <button
                            type="button"
                            onClick={() => setIsOpen(false)}
                            className="text-3xl text-gray-400 hover:text-gray-600"
                        >
                            &times;
                        </button>
                    </div>
                    <div className="p-6">
                        <p className="text-sm text-[#364052] mb-4">
                            Code à entrer pour rejoindre la session
                        </p>
                        <div className="flex justify-start items-center gap-2">
                            {sessionCode &&
                                sessionCode.split('').map((number) => {
                                    return (
                                        <div className="font-bold text-3xl border border-[#E3E7EF] rounded-lg px-12 py-5">
                                            {number}
                                        </div>
                                    )
                                })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal
