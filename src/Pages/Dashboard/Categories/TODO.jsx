/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { AuthContext } from "../../../Provider/AuthProvider";
import { Link } from "react-router-dom";
import add from "../../../assets/img/icons8-add-100.png";
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";

const TODO = () => {
    const [tasks, setTasks] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await fetch(`https://todify-server-site.vercel.app/tasks?email=${user?.email}`);
                const data = await response.json();
                setTasks(data);
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        };

        fetchTasks();
    }, [user?.email]);

    const moveTask = async (taskId, newCategory) => {
        const updatedTasks = tasks.map(task =>
            task._id === taskId ? { ...task, category: newCategory } : task
        );
        setTasks(updatedTasks);

        await fetch(`https://todify-server-site.vercel.app/tasks/${taskId}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ category: newCategory }),
        });
    };

    const deleteTask = async (taskId) => {
        setTasks(tasks.filter(task => task._id !== taskId));
        await fetch(`https://todify-server-site.vercel.app/tasks/${taskId}`, {
            method: "DELETE",
        });
    };

    const openModal = (task) => {
        setSelectedTask(task);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedTask(null);
    };

    const updateTask = async (updatedTask) => {
        const updatedTasks = tasks.map(task =>
            task._id === updatedTask._id ? updatedTask : task
        );
        setTasks(updatedTasks);

        await fetch(`https://todify-server-site.vercel.app/tasks/${updatedTask._id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedTask),
        });

        closeModal();
    };

    // Group tasks by category
    const categories = {
        "TO-DO": [],
        "Pending": [],
        "Done": [],
    };

    tasks.forEach(task => {
        const categoryName = task.category?.trim();
        if (categories[categoryName]) {
            categories[categoryName].push(task);
        }
    });

    return (
        <div className="p-4 md:p-12">
            <Link to={"/home/addTask"}>
                <div className="card bg-[#FBFFE4] flex justify-center items-center border border-black rounded-3xl py-4 w-full h-80 shadow-xl">
                    <figure>
                        <img src={add} alt="Add Task" />
                    </figure>
                    
                </div>
            </Link>

            <div className="divider mt-6 mb-6"></div>

            {/* Responsive grid layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.keys(categories).map(category => (
                    <TaskColumn
                        key={category}
                        category={category}
                        tasks={categories[category]}
                        moveTask={moveTask}
                        deleteTask={deleteTask}
                        openModal={openModal}
                    />
                ))}
            </div>

            {/* Update Task Modal */}
            {isModalOpen && (
                <UpdateTaskModal
                    task={selectedTask}
                    updateTask={updateTask}
                    closeModal={closeModal}
                />
            )}
        </div>
    );
};

const TaskColumn = ({ category, tasks, moveTask, deleteTask, openModal }) => {
    const [, drop] = useDrop({
        accept: "TASK",
        drop: (item) => moveTask(item.id, category),
    });

    return (
        <div ref={drop} className="p-4 border border-gray-300 rounded-xl bg-transparent shadow-md min-h-[300px]">
            <h2 className="text-xl font-bold text-center mb-4">{category}</h2>
            <div className="space-y-4">
                {tasks.length === 0 ? (
                    <p className="text-center">No tasks in {category}</p>
                ) : (
                    tasks.map((task) => (
                        <TaskCard
                            key={task._id}
                            task={task}
                            deleteTask={deleteTask}
                            openModal={openModal}
                        />
                    ))
                )}
            </div>
        </div>
    );
};

const TaskCard = ({ task, deleteTask, openModal }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: "TASK",
        item: { id: task._id },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }));

    // Conditional background color based on category
    const categoryBgColor = task.category === "TO-DO" ? "bg-[#FAE588]" :
                            task.category === "Pending" ? "bg-[#FEDEBE]" :
                            task.category === "Done" ? "bg-[#B8D53D]" : "bg-white";

    return (
        <div
            ref={drag}
            className={`card border border-gray-400 shadow-md p-4 rounded-lg ${categoryBgColor} ${isDragging ? "opacity-50" : ""}`}
        >
            <div className="card-body">
                <h3 className="text-lg font-semibold">{task.title}</h3>
                <p className="text-sm">{task.description || "No description"}</p>
                <div className="mt-4 flex justify-between">
                    <button
                        onClick={() => openModal(task)}
                        className="btn px-5 btn-primary"
                    >
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
    );
};

const UpdateTaskModal = ({ task, updateTask, closeModal }) => {
    const [updatedTask, setUpdatedTask] = useState({ ...task });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedTask((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateTask(updatedTask);
    };

    return (
        <div className="modal modal-open">
            <div className="modal-box">
                <h2 className="text-lg font-semibold mb-4">Update Task</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block mb-2">Title</label>
                        <input
                            type="text"
                            name="title"
                            value={updatedTask.title}
                            onChange={handleChange}
                            className="input input-bordered w-full"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2">Description</label>
                        <textarea
                            name="description"
                            value={updatedTask.description}
                            onChange={handleChange}
                            className="textarea textarea-bordered w-full"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2">Category</label>
                        <select
                            name="category"
                            value={updatedTask.category}
                            onChange={handleChange}
                            className="select select-bordered w-full"
                        >
                            <option value="TO-DO">To-Do</option>
                            <option value="Pending">Pending</option>
                            <option value="Done">Done</option>
                        </select>
                    </div>
                    <div className="modal-action">
                        <button type="submit" className="btn btn-primary">
                            Save
                        </button>
                        <button onClick={closeModal} className="btn">
                            Close
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TODO;
