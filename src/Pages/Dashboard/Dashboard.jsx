import { NavLink, Outlet } from "react-router-dom";
import todo from '../../assets/img/icons8-reminders-50.png';
import pending from '../../assets/img/icons8-pending-48.png';

const Dashboard = () => {
    return (
        <div className="flex">
            {/* Sidebar */}
            <div className="w-64 min-h-screen bg-[#3D8D7A]  py-6 px-3">
                {/* Navigation links */}
                <NavLink to="/home/todo">
                    <button className="btn w-full mt-3 mb-3 flex items-center justify-between">
                        TO-DO <img className="w-8 text-[#B3D8A8]" src={todo} alt="To-Do" />
                    </button>
                </NavLink>

                <NavLink to="/home/profile">
                    <button className="btn w-full mt-3 mb-3 flex items-center justify-between">
                        My Profile <img className="w-8" src={pending} alt="Profile" />
                    </button>
                </NavLink>
            </div>

            {/* Content area */}
            <div className="flex-1 border">
                <Outlet />
            </div>
        </div>
    );
};

export default Dashboard;
