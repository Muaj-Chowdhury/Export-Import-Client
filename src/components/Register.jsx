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
    <div className="flex justify-center min-h-screen items-center">
      <div className="card w-full max-w-sm shrink-0 shadow-2xl py-5 ">
        <h2 className="font-semibold text-2xl text-center">
          Register Your Account
        </h2>
        <form onSubmit={handleRegister} className="card-body">
          <fieldset className="fieldset">
            {/* Name */}
            <label className="label">Name</label>
            <input
              name="name"
              type="text"
              className="input "
              placeholder="Name"
              required
            />
            {/* {nameError && <p className="text-red-400">{nameError}</p>} */}
            {/* Photo URL */}
            <label className="label">Photo URL</label>
            <input
              name="photo"
              type="text"
              className="input "
              placeholder="Photo URL"
              required
            />
            {/* email */}
            <label className="label">Email</label>
            <input
              name="email"
              type="email"
              className="input "
              placeholder="Email"
              required
            />
            {/* password */}
            <label className="label">Password</label>
            <input
              name="password"
              type="password"
              className="input "
              placeholder="Password"
              required
            />
          {error && (
            <p className="text-red-700">
              <small>{error}</small>
            </p>
          )}
          {success && (
                <p>
                  <small className="text-black">
                    Successfully registered
                  </small>
                </p>
              )}

            <button type="submit" className="btn btn-neutral mt-4">
              Register
            </button>
            <p className="font-semibold text-center pt-5">
              Already Have An Account ?{" "}
              <Link className="text-red-700" to="/login">
                Login
              </Link>
            </p>
          </fieldset>
        </form>
        {/* Google */}
        <div className="flex justify-center card-body">
          <button
            onClick={handleGoogleSignIn}
            className="btn bg-white text-black border-[#e5e5e5] w-full"
          >
            <svg
              aria-label="Google logo"
              width="16"
              height="16"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <g>
                <path d="m0 0H512V512H0" fill="#fff"></path>
                <path
                  fill="#34a853"
                  d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                ></path>
                <path
                  fill="#4285f4"
                  d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                ></path>
                <path
                  fill="#fbbc02"
                  d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                ></path>
                <path
                  fill="#ea4335"
                  d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                ></path>
              </g>
            </svg>
            Login with Google
          </button>
        </div>
      
      </div>
    </div>
  );
};

export default Register;
