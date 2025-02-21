import { createBrowserRouter } from "react-router-dom";

import Root from "./Root";
import Login from "../Pages/Login/Login";
import Home from "../Pages/Home/Home";
import TODO from "../Pages/Dashboard/Categories/TODO";
import Pending from "../Pages/Dashboard/Categories/Pending";
import Done from "../Pages/Dashboard/Categories/Done";
import AddTask from "../Pages/Dashboard/Add Task/AddTask";
import PrivateRoutes from "./PrivateRoute";


const Router = createBrowserRouter(
    [
        {
            path: '/',
            element: <Root></Root>,
            children: [
                {
                    path: '/',
                    element: <Login></Login>
                },
                {
                    path: 'home',
                    element: <PrivateRoutes>
                        <Home></Home>
                    </PrivateRoutes>,
                    children: [
                        {
                            path: '/home/todo',
                            element: <TODO></TODO>
                        },
                        {
                            path: '/home/pending',
                            element: <Pending></Pending>
                        },
                        {
                            path: '/home/done',
                            element: <Done></Done>
                        },
                        {
                            path: '/home/addTask',
                            element: <AddTask></AddTask>
                        }
                    ]
                }
            ]
        }
    ]
)

export default Router;