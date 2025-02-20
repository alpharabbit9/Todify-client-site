import { NavLink, Outlet } from "react-router-dom";
import todo from '../../assets/img/icons8-reminders-50.png'
import pending from '../../assets/img/icons8-pending-48.png'
import done from '../../assets/img/icons8-done-50.png'


const Dashboard = () => {
    return (
        <div className="flex">
        <div className="w-72  min-h-screen bg-[#3D8D7A] py-6 px-3">
            <NavLink><button className="btn w-full mt-3 mb-3">TO-DO <img className="w-8 text-[#B3D8A8]" src={todo} alt="" /></button></NavLink>
            <NavLink><button className="btn w-full mt-3 mb-3">Pending<img className="w-8" src={pending} alt="" /></button></NavLink>
            <NavLink><button className="btn w-full mt-3 mb-3">Done   <img src={done} alt="" /></button></NavLink>
            

        </div>
        <div className="flex-1 border bg-[#FBFFE4]">
            <Outlet></Outlet>
        </div>
        </div>
    );
};

export default Dashboard;