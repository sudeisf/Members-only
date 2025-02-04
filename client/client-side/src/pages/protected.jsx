
import { Navigate ,Outlet } from 'react-router-dom';
import { useAuth} from '../Context/AuthContext'

const ProtectedRoute = ()=> {
    const {isAuthenticated} = useAuth();

    // return  isAuthenticated ? <Outlet /> : <Navigate to='/register/login'/> ;
    return (
        <>
            <div>
                {isAuthenticated ? <Outlet /> : <Navigate to='/'/> }
            </div>
        </>
    )


}




export default ProtectedRoute;