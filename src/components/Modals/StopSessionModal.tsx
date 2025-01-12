import WarningIcon from '../icons/WarningIcon'

interface Props {
    className?: string
    setSessionModalIsOpen: (isOpen: boolean) => void
    stopSession: () => void
}
const StopSessionWarningModal = ({
    className,
    setSessionModalIsOpen,
    stopSession,
}: Props) => {
    return (
        <div
            className={`${className} flex items-center justify-center min-h-screen bg-gray-100`}
        >
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white rounded-lg shadow-lg w-[35rem]">
                    <div className="flex flex-col pt-4 px-4 pb-6">
                        <button
                            type="button"
                            onClick={() => setSessionModalIsOpen(false)}
                            className="text-3xl text-gray-400 hover:text-gray-600 flex justify-end items-center"
                        >
                            &times;
                        </button>
                        <div className="flex flex-col justify-center items-center gap-5 mt-5">
                            <WarningIcon />
                            <p className="text-sm text-[#364052] text-center w-64">
                                Voulez-vous vraiment fermer la session ? Tous
                                les messages seront supprimés. Vous pourrez
                                recommencer une autre session plus tard.
                            </p>
                            <div className="flex justify-center items-center gap-4">
                                <button
                                    onClick={() => stopSession()}
                                    className="text-white rounded-lg text-sm font-semibold flex bg-[#F44336] items-center px-2 py-1"
                                >
                                    Oui, arrêter la session
                                </button>
                                <button
                                    onClick={() => setSessionModalIsOpen(false)}
                                    className="text-sm font-semibold px-2 py-1 rounded-lg border border-[#E3E7EF] shadow-sm"
                                >
                                    Annuler
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StopSessionWarningModal
