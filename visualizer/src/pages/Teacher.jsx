import react from "react";
import { useNavigate } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { useState, useRef, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";

const Teacher = ({ userDocRef }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (userDocRef.isStudent) navigate("/student");
  }, []);

  const [assignment, setAssignment] = useState("");

  const postAssignment = (e) => {
    e.preventDefault();
    if (assignment == "") return;
    addDoc(collection(db, "assignments"), {
      name: assignment,
      teacher: uid.current,
    })
      .then(() => {
        console.log("created!");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <input
        placeholder="assignment name"
        onChange={(e) => setAssignment(e.target.value)}
      ></input>
      <button onClick={postAssignment}>Post Assignment!</button>
    </>
  );
};

export default Teacher;
