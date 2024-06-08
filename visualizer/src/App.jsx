import { useState, useEffect, useRef } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import Student from "./pages/Student";
import Teacher from "./pages/Teacher";
import SignUp from "./pages/Signup";
import Login from "./pages/Login";
import Launcher from "./pages/Launcher";
import { auth, db } from "./firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { onSnapshot, doc } from "firebase/firestore";

function App() {
  const [showMessage, setShowMessage] = useState(false);
  const el = document.documentElement;
  const navigate = useNavigate();
  const location = useLocation();

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

  const closeFullscreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      /* Safari */
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      /* IE11 */
      document.msExitFullscreen();
    }
  };

  const uid = useRef(null);
  const userDocRef = useRef(null);

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("logged in!!!");
        uid.current = user.uid;
        console.log(uid.current);
        const checkUser = onSnapshot(
          doc(db, "users", uid.current),
          (docSnap) => {
            userDocRef.current = docSnap.data();
            if (docSnap.data().isStudent) navigate("/student");
            else navigate("/teacher");
          }
        );
      } else {
        console.log(
          "NOT LOGGED IN!!! SEND THIS FELLA BACK TO WHERE HE CAME FROM!!!!!!"
        );
        navigate("/login");
      }
    });
  }, []);

  const onKeyDown = (e) => {
    console.log(location, "/");
    if (e.key == "Escape" && location.pathname != "/") {
      setShowMessage(true);
    }
  };

  const returnHandler = () => {
    openFullscreen();
    setShowMessage(false);
  };

  const exitHandler = () => {
    navigate("/");
    setShowMessage(false);
    closeFullscreen();
  };

  const logoutHandler = () => {
    signOut(auth)
      .then(() => {
        console.log("logged out");
      })
      .catch((error) => {
        console.log;
      });
  };

  return (
    <div>
      {showMessage && (
        <div className="absolute top-0 left-0 w-full h-screen flex items-center justify-center bg-[rgba(0,0,0,.5)]">
          <div className="w-1/2 h-1/3 bg-black text-red-500 rounded-2xl flex flex-col items-center justify-center gap-10">
            <div className="text-xl">
              Are you sure that you want to stop learning?
            </div>
            <div className="flex gap-5">
              <button
                className="p-5 bg-green-500 text-white rounded-2xl"
                onClick={returnHandler}
              >
                No, return to the app
              </button>
              <button
                className="p-5 bg-red-500 text-white rounded-2xl"
                onClick={exitHandler}
              >
                Yes, exit the app
              </button>
            </div>
          </div>
        </div>
      )}
      <Routes>
        <Route path="/" element={<Launcher />} />
        <Route path="/student" element={<Student userDocRef={userDocRef} />} />
        <Route path="/teacher" element={<Teacher userDocRef={userDocRef} />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <button onClick={logoutHandler}>Log out</button>
    </div>
  );
}

export default App;
