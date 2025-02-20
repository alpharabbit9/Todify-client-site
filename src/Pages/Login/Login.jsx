import { useContext } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import './Login.css'
import { FaArrowAltCircleRight } from 'react-icons/fa';
import axios from 'axios';

const Login = () => {

    const { createGoogleUse, setUser } = useContext(AuthContext)
    const navigate = useNavigate();
    const HandleGoogle = () => {

        createGoogleUse()
            .then(result => {
                console.log(result.user);
                setUser(result.user)
                const userInfo = {
                    email : result.user?.email,
                    name : result.user?.displayName
                }
                axios.post('http://localhost:5000/users',userInfo)
                .then(res => {
                    console.log(res.data)
                })
                .catch(error =>{
                    console.log(error.message);
                })

               
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Welcome Back",
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate('/home/todo')

            })
            .catch(error => {
                console.log('ERROR', error.message)

            })
    }

    return (
        <div className="background min-h-screen flex flex-col justify-center items-center px-4 sm:px-8">
            {/* Overlay Content */}
            <div className="  text-center text-gray-950 mb-8">
                <h1 className="text-3xl md:text-6xl font-extrabold mb-2">Todify !!</h1>
                <p className="text-base sm:text-sm">Stay organized and manage your tasks efficiently</p>
            </div>

            {/* Login Card */}
            <div className="w-full max-w-sm md:max-w-md lg:max-w-lg  p-6 sm:p-8 md:p-12  rounded-3xl">
                <div className="flex justify-center">
                    <button onClick={HandleGoogle} className="btn bg-[#00BFFF] text-black w-full rounded-3xl flex items-center justify-center gap-2">
                        Get Started <FaArrowAltCircleRight></FaArrowAltCircleRight>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;
