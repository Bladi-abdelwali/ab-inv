import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

declare global {
  interface Window {
    jimo: unknown[];
    JIMO_PROJECT_ID: string;
    JIMO_MANUAL_INIT: boolean
    jimoInit: () => void;
    jimoKill: () => void;
  }
}

interface JimoOptions {
  url: string;
  projectId: string;
  userId?: string;
}

export const useJimo = ({ url, projectId, userId }: JimoOptions): void => {
    const location = useLocation();
  
    useEffect(() => {
      if (!userId) return;
  
      if (!window.jimo || window.jimo.length === 0) {
        window.jimo = [];
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.async = true;
        script.src = url;
        window.JIMO_PROJECT_ID = projectId;
        window.JIMO_MANUAL_INIT= true
        document.getElementsByTagName('head')[0].appendChild(script);
      }
    }, [url, projectId, userId]);
  };
  




