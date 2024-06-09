import { useNavigate } from "react-router-dom";

const Launcher = ({ setLearning }) => {
  const navigate = useNavigate();
  const el = document.documentElement;

  const openFullscreen = () => {
    if (el.requestFullscreen) {
      el.requestFullscreen();
    } else if (el.webkitRequestFullscreen) {
      /* Safari */
      el.webkitRequestFullscreen();
    } else if (el.msRequestFullscreen) {
      /* IE11 */
      el.msRequestFullscreen();
    }
    navigator.keyboard.lock();
  };

  const enterHandler = () => {
    setLearning(true);
    openFullscreen();
    // uncomment this for the actual app
    navigate("/student");
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <button
        onClick={enterHandler}
        className="border-b w-1/2 text-xl hover:w-3/4 transition-all duration-300 p-3"
      >
        Start Learning
      </button>
    </div>
  );
};

export default Launcher;
