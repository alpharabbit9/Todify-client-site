import { useContext } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import axios from "axios";
import Swal from "sweetalert2";


const AddTask = () => {

    const { user } = useContext(AuthContext);

    const HandleSubmit = (e) => {
        e.preventDefault();

        const form = e.target;
        const title = form.title.value;
        const description = form.description.value;
        const category = form.category.value;


        console.log(title, description ,category)

        const taskData = {
            title: title,
            description: description,
            email: user?.email,
            category:category
        }

        axios.post("https://todify-server-site.vercel.app/tasks", taskData)
            .then(res => {
                console.log(res.data);
                if (res.data.insertedId) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Task is added",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }

            })
            .catch(err => {
                console.log(err.message);
            })


    }
    return (
        <div className="p-12">
            <h3 className="text-3xl">Add Task</h3>
            <div className="divider"></div>

            <div>
                <form onSubmit={HandleSubmit} className="card-body">
                    <div className="form-control">
                        <label className="label">
                            {/* <p className="label-text">Email</p> */}
                        </label>
                        <input name="title" type="text" placeholder="Task Title" className="input mb-3 input-bordered w-full bg-transparent border border-black rounded-3xl" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            {/* <span className="label-text">Password</span> */}
                        </label>
                        <input name="description" type="text" placeholder="Task Description" className="input input-bordered border border-black rounded-3xl h-28 w-full bg-transparent" required />
                        <label className="label">
                            {/* <a href="#" className="label-text-alt link link-hover">Forgot password?</a> */}
                        </label>
                    </div>
                    <select name="category" className="select w-full max-w-lg mt-3 bg-transparent rounded-3xl">
                        <option disabled selected>Choose Category</option>
                        <option>TO-DO</option>
                        <option>Pending</option>
                        <option>Done</option>
                        
                    
                    </select>
                    <div className="form-control mt-6">
                        <button className="btn bg-[#B3D8A8] rounded-3xl">Add Task</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddTask;