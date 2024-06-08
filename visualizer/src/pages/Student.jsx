import { useState, useEffect } from "react";
import List from "../components/List";
import KanBan from "../components/KanBan";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Student = ({ userDocRef }) => {
  // const navigate = useNavigate();

  // onAuthStateChanged(auth, (user) => {
  //   if (user) {
  //     console.log("logged in!!!");
  //     const uid = user.uid;
  //   } else {
  //     console.log(
  //       "NOT LOGGED IN!!! SEND THIS FELLA BACK TO WHERE HE CAME FROM!!!!!!"
  //     );
  //     navigate("/login");
  //   }
  // });

  useEffect(() => {
    if (userDocRef.isStudent == "false") navigate("/teacher");
  }, []);

  const [visualization, setVisualization] = useState("list");
  const [assignments, setAssignments] = useState([
    "Physics | Ch 5 HW 3",
    "Calculus BC | Ch 12 HW 11",
  ]);

  return (
    <div className="flex flex-col gap-10 p-5">
      <h1 className="text-left font-bold text-7xl">Visualize</h1>
      <div className="flex flex-col lg:flex-row justify-between gap-5">
        <div className="bg-neutral-300 p-5 rounded-3xl flex flex-col gap-5">
          <div className="pb-2">
            <h1 className="font-bold text-4xl">Assignments</h1>
          </div>
          {assignments.map((el, i) => (
            <h1 key={i}>{el}</h1>
          ))}
        </div>
        <div className="flex flex-col gap-5 w-full">
          <div className="flex w-full gap-5 justify-between">
            <button
              className="bg-red-200 w-full rounded-3xl p-5 text-center"
              onClick={() => setVisualization("list")}
            >
              List
            </button>
            <button
              className="bg-orange-200 w-full rounded-3xl p-5 text-center"
              onClick={() => setVisualization("kanban")}
            >
              KanBan
            </button>
            <button
              className="bg-green-200 w-full rounded-3xl p-5 text-center"
              onClick={() => setVisualization("pomodoro")}
            >
              Pomodoro
            </button>
            <button
              className="bg-blue-200 w-full rounded-3xl p-5 text-center"
              onClick={() => setVisualization("mindmap")}
            >
              MindMap
            </button>
          </div>
          <div className="w-full h-full bg-neutral-300 p-5 rounded-3xl">
            {visualization === "list" && <List assignments={assignments} />}
            {visualization === "kanban" && <KanBan assignments={assignments} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Student;
