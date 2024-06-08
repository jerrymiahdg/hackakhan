import { createUserWithEmailAndPassword } from "firebase/auth";
import React from "react";
import { useState } from "react";
import { auth, db } from "../firebase";
import { useNavigate, Link } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";

const SignUp = () => {
  const [isStudent, setIsStudent] = useState(true);
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    if (
      e.target[0].value == "" ||
      e.target[1].value == "" ||
      e.target[2].value == "" ||
      e.target[3].value == ""
    )
      return;
    console.log(e.target[2].value);
    createUserWithEmailAndPassword(auth, e.target[2].value, e.target[3].value)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("user created!");
        setDoc(doc(db, "users", user.uid), {
          firstName: e.target[0].value,
          lastName: e.target[1].value,
          email: e.target[2].value,
          isStudent: isStudent,
        })
          .then(() => {
            navigate("/student");
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  };
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <form
        onSubmit={submitHandler}
        className="border border-black rounded-2xl p-10 w-1/2 flex flex-col items-center gap-10"
      >
        <h1 className="text-left font-bold text-7xl">Visualize</h1>
        <input
          className="text-center w-full border rounded-2xl p-5"
          placeholder="first name"
          type="text"
        ></input>
        <input
          className="text-center w-full border rounded-2xl p-5"
          placeholder="last name"
          type="text"
        ></input>
        <input
          className="text-center w-full border rounded-2xl p-5"
          placeholder="email"
          type="email"
        ></input>
        <input
          className="text-center w-full border rounded-2xl p-5"
          placeholder="password"
          type="password"
        ></input>
        <button
          className="p-5 border border-black rounded-xl w-full"
          onClick={(e) => {
            e.preventDefault();
            setIsStudent(!isStudent);
          }}
        >
          I am a {isStudent ? "Student" : "Teacher"}
        </button>
        <button className="bg-neutral-400 p-5 rounded-xl w-full">Login</button>
        <p>
          Already a user? <Link to="/login">Log in!</Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
