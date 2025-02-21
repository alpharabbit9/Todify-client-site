import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import { FaTrash } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";

const Done = () => {
    const [doneTasks, setDoneTasks] = useState([]);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const fetchDoneTasks = async () => {
            try {
                const response = await fetch(`https://todify-server-site.vercel.app/tasks?email=${user?.email}&category=Done`);
                const data = await response.json();
                setDoneTasks(data);
            } catch (error) {
                console.error("Error fetching done tasks:", error);
            }
        };

        fetchDoneTasks();
    }, [user?.email]);

    const deleteTask = async (taskId) => {
        setDoneTasks(doneTasks.filter(task => task._id !== taskId));
        await fetch(`https://todify-server-site.vercel.app/tasks/${taskId}`, {
            method: "DELETE",
        });
    };

    return (
        <div className="p-4 md:p-12">
            <h1 className="text-2xl font-bold mb-6">All Tasks</h1>

            {/* Display the tasks if they exist */}
            <div className="space-y-4">
                {doneTasks.length === 0 ? (
                    <p>No tasks marked as Done.</p>
                ) : (
                    doneTasks.map((task) => (
                        <div
                            key={task._id}
                            className="card border border-gray-400 shadow-md p-4 rounded-lg bg-[#B8D53D]"
                        >
                            <div className="card-body">
                                <h3 className="text-lg font-semibold">{task.title}</h3>
                                <p className="text-sm">{task.description || "No description"}</p>
                                <div className="mt-4 flex justify-between">
                                    <button className="btn px-5 btn-primary">
                                        <FaEdit />
                                    </button>
                                    <button
                                        onClick={() => deleteTask(task._id)}
                                        className="btn px-5 bg-red-600 text-white"
                                    >
                                        <FaTrash />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Done;
