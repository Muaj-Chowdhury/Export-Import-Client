import React, { useContext, useState } from "react";

import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  // useTitle("Login");
  const { signIn, googleSignIn } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    setError("");
    signIn(email, password)
      .then((result) => {
        console.log(result);
        setSuccess(true);
        setTimeout(() => {
          navigate(`${location.state ? location.state : "/"}`);
        }, 5000);
      })
      .catch((error) => {
        const errorCode = error.code;
        setError(errorCode);
      });
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
    <div className="flex justify-center min-h-screen items-center ">
      <div className="card  w-full max-w-sm shrink-0 shadow-2xl py-5  ">
        <h2 className="font-semibold text-2xl text-center">
          Login Your Account
        </h2>
        <form onSubmit={handleSubmit} className="card-body">
          <fieldset className="fieldset">
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
            <div>
              <Link className="link link-hover">Forgot password?</Link>
            </div>
            {error && <p className="text-red-500 text-xm">{error}</p>}
            {success && (
              <p>
                <small className="text-black">Successfully logged in</small>
              </p>
            )}
            <button type="submit" className="btn btn-neutral mt-4 ">
              Login
            </button>
          </fieldset>
          <p className="font-semibold text-center pt-5">
            Dont’t Have An Account ?{" "}
            <Link className="text-red-500" to="/register">
              Register
            </Link>
          </p>
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

export default Login;
