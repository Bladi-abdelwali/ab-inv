import AcceptStudentIcon from "./icons/AcceptStudentIcon";
import RejectStudentIcon from "./icons/RejectStudentIcon";

interface Props {
  studentName: string;
  isAccepted?: boolean;
  onAccept?: () => void;
  onReject?: () => void;
}

const ParticipantCard = ({ studentName, isAccepted = false, onAccept, onReject }: Props) => {
  return (
    <div className="flex justify-between items-center gap-16 bg-[#F8FAFC] rounded-lg p-3">
      <p className="font-bold">{studentName}</p>
      <div className="flex justify-center items-center">
        <button onClick={onReject}>
          <RejectStudentIcon />
        </button>
        {!isAccepted && (
          <button onClick={onAccept} className="ml-2">
            <AcceptStudentIcon />
          </button>
        )}
      </div>
    </div>
  );
};

export default ParticipantCard;
