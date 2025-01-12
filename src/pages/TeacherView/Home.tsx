import React from "react";
import { useSocket } from "../../contexts/SocketContext";
import Button from "../../components/Button";
import StartSessionIcon from "../../components/icons/StartSessionIcon";
import Paragraph from "../../components/Paragraph";
import Title from "../../components/Title";
import { useNavigate } from "react-router-dom";
import { useJimo } from "../../hooks/useJimo";

const StartSessionPage = () => {
  const { socket } = useSocket();
  const navigate = useNavigate();

  useJimo({
    url: 'https://undercity.usejimo.com/jimo-invader.js',
    projectId: '4d0df4f5-6fab-453d-a4c3-951fd6fdd95f',
    userId:  'default-user-id',
  });
  
  const handleStartSession = () => {
    if (socket) {
      socket.emit("create_session");

      socket.on("session_created", (data) => {
        navigate(`/teacher/session/${data.sessionCode}`);
      });
    }
  };

  return (
    <>
      <Title className="py-5 pl-6 border-b border-b-[#E3E7EF]">
        Interactions avec les élèves
      </Title>
      <div className="flex flex-col items-center justify-center h-[calc(100vh-2.5rem)]">
        <StartSessionIcon />
        <Title className="mt-12">Session d'interaction</Title>
        <Paragraph className="text-center w-[34.9rem] my-4">
          Une session d'interaction va vous permettre de recevoir des
          messages pré-configurés de vos élèves afin de faciliter les
          échanges et encourager la participation sans interrompre le
          cours !
        </Paragraph>
        <Button 
          type="start" 
          onClick={handleStartSession}
        />
      </div>
    </>
  );
};

export default StartSessionPage;
