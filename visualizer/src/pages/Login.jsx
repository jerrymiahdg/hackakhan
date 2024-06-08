import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import react from "react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const submitHandler = (e) => {
    e.preventDefault();
    if (e.target[0].value == "" || e.target[1].value == "") return;
    signInWithEmailAndPassword(auth, e.target[0].value, e.target[1].value).then(
      (userCredential) => {
        const user = userCredential.user;
        console.log("logged in!");
        navigate("/student");
      }
    );
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
          placeholder="email"
          type="email"
        ></input>
        <input
          className="text-center w-full border rounded-2xl p-5"
          placeholder="password"
          type="password"
        ></input>
        <button className="bg-neutral-400 p-5 rounded-xl w-full">Login</button>
        <p>
          Not a user? <Link to="/signup">Sign up!</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
