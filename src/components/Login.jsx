import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
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
      .then(() => {
        setSuccess(true);
        setTimeout(() => {
          navigate(location.state || "/");
        }, 1500);
      })
      .catch((error) => {
        setError(error.code);
      });
  };

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then(() => {
        setSuccess(true);
        navigate(location.state || "/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-900 via-slate-900 to-black">
      <div className="card w-full max-w-sm py-8 px-6 backdrop-blur-xl bg-white/10 shadow-2xl rounded-2xl border border-white/10">

        {/* TITLE */}
        <h2 className="text-center text-3xl font-bold text-white tracking-wide mb-4">
          Welcome Back
        </h2>
        <p className="text-center text-gray-300 mb-6 text-sm">
          Login to continue your journey
        </p>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <label className="text-gray-200 font-medium">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            required
            className="input w-full bg-white/20 border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Password */}
          <label className="text-gray-200 font-medium">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            required
            className="input w-full bg-white/20 border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <div className="text-right">
            <Link className="text-blue-300 hover:text-blue-400 text-sm">
              Forgot password?
            </Link>
          </div>

          {/* Error */}
          {error && <p className="text-red-400 text-sm">{error}</p>}

          {/* Success */}
          {success && (
            <p className="text-green-400 text-sm">
              Successfully logged in!
            </p>
          )}

          {/* Login Btn */}
          <button
            type="submit"
            className="btn w-full mt-2 bg-gradient-to-r from-blue-600 to-indigo-700 border-none text-white font-semibold shadow-lg hover:opacity-90"
          >
            Login
          </button>
        </form>

        {/* Register Link */}
        <p className="text-center text-gray-300 mt-6">
          Don’t have an account?{" "}
          <Link className="text-blue-400 font-semibold hover:underline" to="/register">
            Register
          </Link>
        </p>

        {/* Google Login */}
        <div className="mt-6">
          <button
            onClick={handleGoogleSignIn}
            className="btn w-full bg-white text-black font-semibold shadow-lg border-none hover:bg-gray-200 flex items-center gap-2"
          >
            <svg
              aria-label="Google logo"
              width="18"
              height="18"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <g>
                <path fill="#fff" d="m0 0H512V512H0"></path>
                <path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path>
                <path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path>
                <path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path>
                <path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path>
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
