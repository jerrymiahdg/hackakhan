import react from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { useState, useRef, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import {
  query,
  doc,
  addDoc,
  collection,
  where,
  onSnapshot,
  deleteDoc,
} from "firebase/firestore";

const Teacher = ({ userDocRef, uid }) => {
  const navigate = useNavigate();
  const [popupOpen, setPopupOpen] = useState(false);
  const modalRef = useRef();

  // useEffect(() => {
  //   console.log("is this running");
  //   console.log(userDocRef.current.isStudent);
  //   if (userDocRef.current.isStudent) navigate("/student");
  // }, []);

  useEffect(() => {
    console.log(userDocRef.current);

    if (userDocRef.current != null) {
      console.log("poopy");
      if (userDocRef.current.isStudent) navigate("/");
      else {
        console.log("banana");
        const q = query(
          collection(db, "assignments"),
          where("teacher", "==", uid.current)
        );
        const getDocs = onSnapshot(q, (snapshot) => {
          const currAssignments = [];
          console.log(snapshot);
          snapshot.forEach((doc) => {
            console.log(doc.data());
            currAssignments.push({ id: doc.id, name: doc.data().name });
          });
          setAssignments(currAssignments);
        });
      }
    }
  }, [userDocRef.current]);

  const [assignment, setAssignment] = useState("");
  const [assignments, setAssignments] = useState([]);
  const [description, setDescription] = useState("");

  const postAssignment = (e) => {
    e.preventDefault();
    if (assignment == "" || userDocRef.current.isStudent != false) return;
    addDoc(collection(db, "assignments"), {
      name: assignment,
      teacher: uid.current,
      desc: description,
    })
      .then(() => {
        console.log("created!");
      })
      .catch((err) => {
        console.log(err);
      });
  };

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

  const removeAssignment = (id) => {
    deleteDoc(doc(db, "assignments", id))
      .then(() => {
        console.log("deleted");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const closePopup = (e) => {
    if (modalRef.current.contains(e.target)) return;
    setPopupOpen(false);
  };

  return (
    <>
      <div className="flex flex-col items-center p-10 gap-5 w-full">
        <h1 className="font-bold text-7xl">Visualize</h1>

        {/* <div className="text-3xl">
          Hello, {userDocRef.current.firstName} {userDocRef.current.lastName}!
        </div> */}

        <h1 className="font-bold text-2xl w-full text-left">
          Your Assignments
        </h1>
        {assignments.map((el, i) => (
          <div
            key={i}
            className="w-full flex items-center border-b pb-5 justify-between"
          >
            <h1>{el.name}</h1>
            <button
              onClick={() => removeAssignment(el.id)}
              className="p-2 bg-neutral-100 border rounded-xl hover:bg-neutral-200 transition-all"
            >
              Remove Assignment
            </button>
          </div>
        ))}
        <button
          onClick={() => setPopupOpen(true)}
          className="w-full border rounded-2xl p-5 hover:bg-neutral-100 transition-all"
        >
          Add an assignment
        </button>
        <button
          onClick={logoutHandler}
          className="w-full border rounded-2xl p-5 hover:bg-neutral-100 transition-all"
        >
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
            className="w-1/2 bg-white rounded-2xl flex flex-col items-center p-5 gap-5"
          >
            <div className="text-2xl font-bold">New Assignment</div>
            <input
              placeholder="assignment name"
              onChange={(e) => setAssignment(e.target.value)}
              className="text-center w-full p-5 border rounded-2xl"
            ></input>
            <textarea
              onChange={(e) => setDescription(e.target.value)}
              className="text-center w-full p-5 border rounded-2xl"
              placeholder="description"
            ></textarea>
            <button
              onClick={postAssignment}
              className="w-full p-5 border rounded-2xl border-black hover:bg-neutral-100 transition-all"
            >
              Post Assignment!
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Teacher;
