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
    <div className="w-full h-screen flex justify-center items-center p-5">
      <form
        onSubmit={submitHandler}
        className="border border-black w-full rounded-2xl p-5 max-w-xl flex flex-col items-center gap-10"
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
        <button className="p-5 rounded-xl w-full border border-black hover:bg-neutral-200 transition-all">
          Login
        </button>
        <p>
          Not a user? <Link to="/signup">Sign up!</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
