import { useState, useEffect, useRef } from "react";
import List from "../components/List";
import KanBan from "../components/KanBan";
import { auth } from "../firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import {
  query,
  doc,
  collection,
  where,
  onSnapshot,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import Pomodoro from "../components/Pomodoro";
import MindMap from "../components/MindMap";

const Student = ({ userDocRef, uid }) => {
  const navigate = useNavigate();
  const modalRef = useRef();
  const [visualization, setVisualization] = useState("list");
  const [assignments, setAssignments] = useState([
    { name: "Physics | Ch 5 HW 3", id: 1 },
    { name: "Calculus BC | Ch 12 HW 11", id: 2 },
    { name: "Calculus BC | Ch 12 HW 11", id: 2 },
  ]);
  const [popupOpen, setPopupOpen] = useState(false);
  const [teachers, setTeachers] = useState([]);
  const [viewableTeachers, setViewableTeachers] = useState([]);
  const [viewableAssignments, setViewableAssignments] = useState([]);

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
    let currTeachers = [];
    let viewableTeachers = [];
    let assignments = [];
    console.log(userDocRef.current);
    if (userDocRef.current !== null) {
      if (!userDocRef.current.isStudent) navigate("/teacher");
      else {
        const q2 = query(
          collection(db, "users"),
          where("isStudent", "==", false)
        );
        const getData2 = onSnapshot(q2, (snapshot) => {
          console.log("SNAPSHOT2");
          currTeachers = [];
          console.log(snapshot);
          snapshot.forEach((doc) => {
            console.log(doc.id);
            currTeachers.push({
              id: doc.id,
              firstName: doc.data().firstName,
              lastName: doc.data().lastName,
              email: doc.data().email,
              students: doc.data().students,
            });
          });
          console.log(currTeachers);
          setTeachers(currTeachers);
        });
        const q1 = query(
          collection(db, "assignments"),
          where("teacher", "!=", "")
        );
        const getData1 = onSnapshot(q1, (snapshot) => {
          console.log("SNAPSHOT 1");
          assignments = [];
          console.log(assignments);
          console.log(currTeachers);
          console.log(uid.current);
          // const filteredTeachers = currTeachers.filter((teacher) => {
          //   return teacher.students.includes(uid.current);
          // });
          // console.log(filteredTeachers);
          // setViewableTeachers(filteredTeachers);
          console.log(viewableTeachers);
          snapshot.forEach((doc) => {
            console.log(currTeachers);
            console.log(doc.data().teacher);
            const currTeacherObj = currTeachers.find(
              (teacher) => teacher.id == doc.data().teacher
            );
            // console.log(currTeacherObj);
            // if (!currTeacherObj) return;
            assignments.push({
              id: doc.id,
              name: doc.data().name,
              teacher: currTeacherObj.firstName + " " + currTeacherObj.lastName,
              teacherId: doc.data().teacher,
              desc: doc.data().desc,
            });
          });
          console.log(assignments);
          setAssignments(assignments);
        });
      }
    }
  }, [userDocRef.current]);

  useEffect(() => {
    const filteredTeachers = teachers.filter((teacher) => {
      return teacher.students.includes(uid.current);
    });
    setViewableTeachers(filteredTeachers);
    console.log(assignments);
    const beep = assignments.filter((assignment) =>
      filteredTeachers.map((item) => item.id).includes(assignment.teacherId)
    );
    console.log(assignments);
    setViewableAssignments(beep);
    console.log(viewableAssignments);
  }, [assignments, teachers]);

  const logoutHandler = () => {
    signOut(auth)
      .then(() => {
        console.log("logged out");
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const closePopup = (e) => {
    if (modalRef.current.contains(e.target)) return;
    setPopupOpen(false);
  };

  const addTeacherHandler = (id) => {
    console.log(id);
    const newStudents = teachers.find((teacher) => teacher.id == id).students;
    newStudents.push(uid.current);
    updateDoc(doc(db, "users", id), {
      students: newStudents,
    })
      .then(() => console.log("added student"))
      .catch((err) => console.log(err));
  };

  const removeTeacherHandler = (id) => {
    const newStudents = teachers
      .find((teacher) => teacher.id == id)
      .students.filter((student) => student !== uid.current);
    updateDoc(doc(db, "users", id), {
      students: newStudents,
    })
      .then(() => console.log("removed student"))
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="flex flex-col gap-10 p-5">
        <h1 className="text-left font-bold text-7xl">Visualize</h1>
        <div className="flex flex-col lg:flex-row justify-between gap-5">
          <div className="bg-neutral-100 p-5 rounded-3xl flex flex-col gap-5">
            <div className="pb-3">
              <h1 className="font-bold text-4xl">Assignments</h1>
            </div>
            {viewableAssignments.map((el, i) => (
              <div key={i}>
                <h1 className=" text-xl">{el.name}</h1>
                <h1>{el.teacher}</h1>
              </div>
            ))}
            <div className="pt-3">
              <button
                className="w-full p-5 border border-neutral-300 rounded-2xl text-center hover:bg-neutral-200 transition-all"
                onClick={() => setPopupOpen(true)}
              >
                Select Teachers
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-5 w-full">
            <div className="flex w-full gap-5 justify-between">
              <button
                className={`bg-red-200 w-full rounded-3xl p-5 text-center ${
                  visualization === "list" && "shadow-lg"
                }`}
                onClick={() => setVisualization("list")}
              >
                List
              </button>
              <button
                className={`bg-orange-200 w-full rounded-3xl p-5 text-center ${
                  visualization === "kanban" && "shadow-lg"
                }`}
                onClick={() => setVisualization("kanban")}
              >
                KanBan
              </button>
              <button
                className={`bg-green-200 w-full rounded-3xl p-5 text-center ${
                  visualization === "pomodoro" && "shadow-lg"
                }`}
                onClick={() => setVisualization("pomodoro")}
              >
                Pomodoro
              </button>
              <button
                className={`bg-blue-200 w-full rounded-3xl p-5 text-center ${
                  visualization === "mindmap" && "shadow-lg"
                }`}
                onClick={() => setVisualization("mindmap")}
              >
                MindMap
              </button>
            </div>
            <div className="w-full h-full bg-neutral-300 p-5 rounded-3xl">
              {visualization === "list" && (
                <List assignments={viewableAssignments} />
              )}
              {visualization === "kanban" && (
                <KanBan assignments={viewableAssignments} />
              )}
              {visualization === "pomodoro" && (
                <Pomodoro assignments={viewableAssignments} />
              )}
              {visualization == "mindmap" && (
                <MindMap assignments={viewableAssignments} />
              )}
            </div>
          </div>
        </div>
        <button onClick={logoutHandler} className="border rounded-2xl p-5">
          Log out
        </button>
      </div>
      {popupOpen && (
        <div
          onClick={closePopup}
          className="absolute top-0 left-0 w-full h-screen bg-[rgba(0,0,0,0.5)] flex items-center justify-center"
        >
          <div
            ref={modalRef}
            className="w-1/2 h-1/2 bg-white rounded-2xl flex flex-col items-center p-5 gap-5"
          >
            <div className="text-2xl w-full border-b text-center pb-2">
              Teachers
            </div>
            <div className="flex flex-col gap-5 w-full">
              {teachers.map((teacher) => (
                <div
                  key={teacher.id}
                  className="w-full flex justify-between items-center border-b py-2 border-neutral-100"
                >
                  <span>
                    {teacher.firstName} {teacher.lastName}
                  </span>
                  {viewableTeachers.includes(teacher) ? (
                    <button
                      className="p-2 rounded-2xl text-center hover:bg-neutral-200 transition-all"
                      onClick={() => removeTeacherHandler(teacher.id)}
                    >
                      Remove
                    </button>
                  ) : (
                    <button
                      className="p-2 rounded-2xl text-center hover:bg-neutral-200 transition-all"
                      onClick={() => addTeacherHandler(teacher.id)}
                    >
                      Add
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Student;
