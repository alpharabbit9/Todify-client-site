import { Link } from 'react-router-dom';
import add from '../../../assets/img/icons8-add-100.png'

const TODO = () => {
    return (
        <div className="p-12">
            <Link to={'/home/addTask'}>
                <div className="card bg-transparent border border-black rounded-3xl py-4 w-64 h-80shadow-xl">
                    <figure>
                        <img
                            src={add}
                            alt="Shoes" />
                    </figure>
                    <div className="card-body">
                        <h2 className=" text-center">Add New  Task</h2>


                    </div>
                </div>
            </Link>
        </div>
    );
};

export default TODO;