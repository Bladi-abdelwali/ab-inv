import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useLocation } from 'react-router-dom';

const NotFound = () => {
  const location = useLocation();

  const isStudentView = location.pathname.startsWith('/student');
  const homeRoute = isStudentView ? '/student' : '/teacher';

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-gray-100 text-center px-6">
      <h2 className="font-inter text-6xl font-normal leading-[120%] text-[#364052] mb-2">
        404
      </h2>
      <h2 className="font-inter text-6xl font-normal leading-[120%] text-[#364052] mb-6">
        Page introuvable
      </h2>
      <p className="font-inter text-base text-[#111728] mb-1">
        Il semble que cette page n’existe pas
      </p>
      <p className="font-inter text-base text-[#111728] mb-7">
        ou a été déplacée
      </p>
      <Link
        to={homeRoute}
        className="font-inter text-base font-semibold text-[#1B6DDA] leading-[175%]"
      >
       <FontAwesomeIcon icon={faArrowLeft} style={{marginRight: 6}}/>Revenir en arrière
      </Link>
    </div>
  );
};

export default NotFound;
