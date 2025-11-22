import React, { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { logOut, user } = useContext(AuthContext);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const navigate = useNavigate();

  const handleLogout = () => {
    logOut()
      .then(() => console.log("Logged out"))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    const html = document.querySelector("html");
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleTheme = (checked) => {
    setTheme(checked ? "dark" : "light");
  };

  const navLinks = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "font-semibold text-white"
              : "text-white/80 hover:text-white"
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/allProducts"
          className={({ isActive }) =>
            isActive
              ? "font-semibold text-white"
              : "text-white/80 hover:text-white"
          }
        >
          All Products
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/myExports"
          className={({ isActive }) =>
            isActive
              ? "font-semibold text-white"
              : "text-white/80 hover:text-white"
          }
        >
          My Exports
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/myImports"
          className={({ isActive }) =>
            isActive
              ? "font-semibold text-white"
              : "text-white/80 hover:text-white"
          }
        >
          My Imports
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/addExport"
          className={({ isActive }) =>
            isActive
              ? "font-semibold text-white"
              : "text-white/80 hover:text-white"
          }
        >
          Add Export
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/support"
          className={({ isActive }) =>
            isActive
              ? "font-semibold text-white"
              : "text-white/80 hover:text-white"
          }
        >
          Support
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="sticky top-0 z-50 bg-[#001D3D] shadow-md">
      <div className="navbar w-11/12 mx-auto py-3 flex items-center justify-between">
        {/* Left Section - Logo + Dropdown */}
        <div className="navbar-start flex items-center">
          {/* Mobile dropdown */}
          <div className="dropdown lg:hidden">
            <div
              tabIndex={0}
              role="button"
              className="md:btn btn-ghost text-white "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 sm:h-4 sm:w-4 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 p-3 shadow  rounded-box w-52 text-black bg-linear-to-r from-[#023E8A] to-[#48CAE4]"
            >
              <input
                onChange={(e) => handleTheme(e.target.checked)}
                defaultChecked={localStorage.getItem("theme") === "dark"}
                type="checkbox"
                value="synthwave"
                className="toggle theme-controller col-span-2 col-start-1 row-start-1 border-sky-400 bg-blue-400 [--tglbg:var(--color-sky-500)] checked:border-blue-800 checked:bg-blue-300 checked:[--tglbg:var(--color-blue-900)]"
              />
              {navLinks}
            </ul>
          </div>

          {/* Logo */}
          <button
            onClick={() => navigate("/")}
            className="text-lg md:text-2xl text-white font-extrabold tracking-wide ml-2 md:ml-0 hover:text-[#7ed0ff] transition-all"
          >
            Trade<span className="text-[#48CAE4]">Flow</span>
          </button>
        </div>

        {/* CENTER LINKS */}

        <div className="navbar-center hidden lg:flex justify-between">
          <div>
            <ul className="menu menu-horizontal px-1 flex gap-6 text-lg">
              {navLinks}
            </ul>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="navbar-end flex items-center gap-3">
          <div className="hidden lg:block">
            <input
              onChange={(e) => handleTheme(e.target.checked)}
              defaultChecked={localStorage.getItem("theme") === "dark"}
              type="checkbox"
              value="synthwave"
              className="  toggle theme-controller col-span-2 col-start-1 row-start-1 border-sky-400 bg-blue-400 [--tglbg:var(--color-sky-500)] checked:border-blue-800 checked:bg-blue-300 checked:[--tglbg:var(--color-blue-900)]"
            />
          </div>
          {!user ? (
            <div className="flex items-center gap-2">
              {/* LOGIN */}
              <NavLink
                to="/login"
                className="btn btn-sm md:btn-md border-none text-white bg-linear-to-r from-[#023E8A] to-[#48CAE4]"
              >
                Login
              </NavLink>

              {/* REGISTER */}
              <NavLink
                to="/register"
                className="btn btn-sm md:btn-md border-none text-white bg-linear-to-r from-[#023E8A] to-[#48CAE4]"
              >
                Register
              </NavLink>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              {/* PHOTO */}
              <button onClick={() => navigate("/")}>
                <img
                  src={user.photoURL || "/default-avatar.png"}
                  alt="User"
                  className="w-10 h-10 rounded-full border-2 border-white object-cover"
                />
              </button>

              {/* LOGOUT */}
              <button
                onClick={handleLogout}
                className="btn btn-sm md:btn-md text-white border-none bg-linear-to-r from-[#023E8A] to-[#48CAE4]"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
