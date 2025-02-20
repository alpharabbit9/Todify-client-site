import { useContext } from "react";

import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import img4 from '../assets/img/icons8-reminders-50.png'
import { AuthContext } from "../Provider/AuthProvider";


const Navbar = () => {

  const { userLogOut , user} = useContext(AuthContext);
  const navigate = useNavigate();

  const HandleLogout = () => {
    userLogOut()
      .then(result => {
        console.log('Successfully logged out');
        Swal.fire({
          position: "Center",
          icon: "success",
          title: "Logged Out Succesfully",
          showConfirmButton: false,
          timer: 1500
        });
        navigate('/')
      })
      .catch(error =>
        console.log(error.message)
      )
  }

  return (
   <div>
    {/* NAvbbar  */}
    <div className="navbar bg-[#A3D1C6] p-9">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">TODIFY <img className="w-10" src= {img4} alt="" /></a>
      </div>
      <div className="flex gap-3">
      <Link><button className="btn bg-[#B3D8A8]  rounded-3xl" onClick={HandleLogout}>Logout</button></Link>
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src={user?.photoURL} />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li><a>Settings</a></li>
            <li><a>Logout</a></li>
          </ul>
        </div>
      </div>
    </div>

   </div>
  );
};

export default Navbar;