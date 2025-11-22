import React, { useContext, useState } from "react";

import { Link, useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";

const Register = () => {
  // useTitle("Register");
  const { createUser, setUser, updateUser,user ,googleSignIn } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const photo = form.photo.value;
    const email = form.email.value;
    const password = form.password.value;

    console.log(name, photo, email, password);

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if(!passwordRegex.test(password)){
        setError("Password must have at least one uppercase, one lowercase, and be 6+ characters long.");
        return
    }

    setError("");
    setSuccess(false)

    createUser(email,password)
    .then((result)=>{
        console.log(result.user)
        setSuccess(true);

        updateUser({displayName: name, photoURl: photo})
        .then(()=>{
            setUser({...user,displayName:name , photoURl:photo})
            navigate('/')
        })
        .catch((error)=>{
            console.log(error)
            setUser(user)
        })
    })
    .catch(err =>{
        const errorMessage = err.message;
        console.log(errorMessage);
    })
  };

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((result) => {
        console.log(result.user);
        setSuccess(true);
        navigate(location.state || "/");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
  <div className="flex justify-center min-h-screen items-center bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] p-4">
    <div className="card w-full max-w-sm shrink-0 shadow-2xl py-6 rounded-2xl 
    bg-white/10 backdrop-blur-md border border-white/20">

      <h2 className="font-bold text-3xl text-center mb-4 text-white drop-shadow">
        Register Your Account
      </h2>

      <form onSubmit={handleRegister} className="card-body">
        <fieldset className="fieldset space-y-2">

          <label className="label text-white">Name</label>
          <input name="name" type="text" className="input bg-white/80 rounded-md" placeholder="Name" required />

          <label className="label text-white">Photo URL</label>
          <input name="photo" type="text" className="input bg-white/80 rounded-md" placeholder="Photo URL" required />

          <label className="label text-white">Email</label>
          <input name="email" type="email" className="input bg-white/80 rounded-md" placeholder="Email" required />

          <label className="label text-white">Password</label>
          <input name="password" type="password" className="input bg-white/80 rounded-md" placeholder="Password" required />

          {error && <p className="text-red-400 pt-2">{error}</p>}
          {success && <p className="text-green-300 pt-2">Successfully registered</p>}

          <button
            type="submit"
            className="btn w-full mt-4 text-white font-semibold bg-gradient-to-r from-[#ff512f] to-[#dd2476] border-none hover:opacity-90"
          >
            Register
          </button>

          <p className="font-semibold text-center pt-5 text-white">
            Already Have An Account?{" "}
            <Link className="text-pink-300" to="/login">Login</Link>
          </p>

        </fieldset>
      </form>

      <div className="flex justify-center card-body pt-0">
        <button
          onClick={handleGoogleSignIn}
          className="btn bg-white text-black w-full hover:bg-gray-200 border-none rounded-md shadow"
        >
          Google Login
        </button>
      </div>

    </div>
  </div>
);

};

export default Register;
