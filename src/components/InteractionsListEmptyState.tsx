import InteractionEmptyStateIcon from './icons/InteractionEmptyStateIcon';
import Title from './Title';

interface InteractionsListEmptyStateProps {
    isAllMessagesRead: boolean;
    noInteractionsMessage: string;
    allMessagesReadMessage: string;
  }
  
  const InteractionsListEmptyState: React.FC<InteractionsListEmptyStateProps> = ({
    isAllMessagesRead,
    noInteractionsMessage,
    allMessagesReadMessage,
  }) => {
    const message = isAllMessagesRead ? allMessagesReadMessage : noInteractionsMessage;
  
    return (
      <div className="flex flex-col justify-center items-center h-full">
        <InteractionEmptyStateIcon />
        {isAllMessagesRead ? (
          <Title className="mt-12">Pas de messages</Title>
        ) : (
          <Title className="mt-12">Session d’interaction</Title>
        )}
        <p className="text-sm text-[#364052] w-[31rem] text-center" style={{ whiteSpace: 'pre-line' }}>
          {message}
        </p>
      </div>
    );
  };
  
  export default InteractionsListEmptyState;
  
  
  
