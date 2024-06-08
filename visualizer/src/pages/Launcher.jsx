import { useNavigate } from "react-router-dom";

const Launcher = () => {
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
    openFullscreen();
    navigate("/student");
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <button onClick={enterHandler}>Enter</button>
    </div>
  );
};

export default Launcher;
