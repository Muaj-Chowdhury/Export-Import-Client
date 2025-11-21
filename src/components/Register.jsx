import React, { useContext, useState } from "react";

import { Link, useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";

const Register = () => {
  // useTitle("Register");
  const { createUser, setUser, updateUser,user } = useContext(AuthContext);
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
    if(!passwordRegex.text(password)){
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
      
      </div>
    </div>
  );
};

export default Register;
