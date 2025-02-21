import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import img4 from "../assets/img/icons8-reminders-50.png";
import { AuthContext } from "../Provider/AuthProvider";
import { ThemeContext } from "../Provider/ThemeProvider";
 // Import Theme Context

const Navbar = () => {
  const { userLogOut, user } = useContext(AuthContext);
  const { darkMode, toggleDarkMode } = useContext(ThemeContext); // Get dark mode state
  const navigate = useNavigate();

  const HandleLogout = () => {
    userLogOut()
      .then(() => {
        console.log("Successfully logged out");
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Logged Out Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/");
      })
      .catch((error) => console.log(error.message));
  };

  return (
    <div>
      {/* Navbar */}
      <div className={`navbar ${darkMode ? "bg-gray-900 text-white" : "bg-[#A3D1C6]"} p-6`}>
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost text-xl flex items-center">
            TODIFY <img className="w-10 ml-2" src={img4} alt="Logo" />
          </Link>
        </div>
        <div className="flex items-center gap-3">
          {/* Dark Mode Toggle */}
          <button 
            onClick={toggleDarkMode} 
            className="btn btn-sm border rounded-full px-4"
          >
            {darkMode ? "🌙 Dark" : "☀️ Light"}
          </button>

          {/* Logout Button */}
          {user && (
            <button 
              className="btn bg-[#B3D8A8] text-black dark:bg-gray-700 dark:text-white rounded-3xl" 
              onClick={HandleLogout}
            >
              Logout
            </button>
          )}

          {/* Profile Dropdown */}
          {user && (
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full border-2 border-gray-300 dark:border-gray-600">
                  <img alt="User Avatar" src={user?.photoURL} />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 dark:bg-gray-800 dark:text-white rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                <li>
                  <a className="justify-between">
                    Profile <span className="badge">New</span>
                  </a>
                </li>
                <li><a>Settings</a></li>
                <li><button onClick={HandleLogout}>Logout</button></li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
