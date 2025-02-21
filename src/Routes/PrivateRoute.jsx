/* eslint-disable react/prop-types */
import { useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import { Navigate } from 'react-router-dom';
import Loading from '../Components/Loading';


const PrivateRoutes = ({children}) => {
    const {user,loading} = useContext(AuthContext);

    

    if(loading)
    {
        return <Loading></Loading>
    }

    if(user && user?.email){
        return children ;
    }

    return <Navigate  to = {'/'}></Navigate>
};

export default PrivateRoutes;