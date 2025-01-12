import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import Paragraph from "./Paragraph";

const JoinRoomLoading: React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-center h-full w-full">
      <div className="flex flex-col items-center justify-center text-center space-y-4">
        <FontAwesomeIcon 
          icon={faCircleNotch} 
          spin 
          size='xl'
          className="text-[#2B9BF7] text-6xl mb-4"
        />
        <h4 className="text-[#212938] font-semibold text-sm mb-1">
          un instant...
        </h4>
        <Paragraph className="text-center max-w-[22.5rem] text-[#7B869A]">
          En attente que l'enseignant accepte la demande de rejoindre la session
          d'interactions.
        </Paragraph>
      </div>
    </div>
  );
};

export default JoinRoomLoading;