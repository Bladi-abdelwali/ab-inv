import CheckIcon from './icons/CheckIcon'
import DontUnderstandIcon from './icons/DontUnderstandIcon'
import PermissontToSpeakIcon from './icons/PermissontToSpeakIcon'
import IunderstandIcon from './icons/IunderstandIcon'
import IfinishIcon from './icons/IfinishIcon'
import SlowIcon from './icons/SlowIcon'

interface Props {
    className: string;
    cardType: 'question' | 'dontUnderstand' | 'iUnderstand' | 'slow' | 'iFinish';
    name: string;
    onMarkAsRead: () => void;
    isRead: boolean;
    timeElapsed: string;
  }
  
  const MessageCard = ({
    className,
    cardType,
    name,
    onMarkAsRead,
    isRead,
    timeElapsed,
  }: Props) => {
    const cards = {
      question: {
        icon: <PermissontToSpeakIcon />,
        description: 'a une question',
      },
      dontUnderstand: {
        icon: <DontUnderstandIcon />,
        description: "n'a pas compris",
      },
      iUnderstand: {
        icon: <IunderstandIcon />,
        description: 'a compris',
      },
      slow: {
        icon: <SlowIcon />,
        description: 'demande à ralentir le rythme',
      },
      iFinish: {
        icon: <IfinishIcon />,
        description: 'a terminé',
      },
    };
  
    return (
      <div
        className={`${className} border border-[#E3E7EF] bg-[#F8FAFC] py-2 pl-3 pr-6 flex justify-between items-center rounded-lg`}
      >
        <div className="flex justify-center items-center gap-3">
          {cards[cardType].icon}
          <div className="text-[#111728]">
            <p className="font-bold">{name}</p>
            <p className="font-xs font-light text-xs">
              {cards[cardType].description} • {timeElapsed}
            </p>
          </div>
        </div>
        {!isRead && (
          <button
            onClick={onMarkAsRead}
            className="border border-[#1B6DDA] px-3 py-2 text-[#1B6DDA] flex items-center justify-center gap-2 bg-[#F8FAFC] rounded-lg"
          >
            Marquer comme lu
            <CheckIcon />
          </button>
        )}
        {isRead && (
          <p className="text-sm text-green-500">Marqué comme lu</p>
        )}
      </div>
    );
  };
  export default MessageCard
