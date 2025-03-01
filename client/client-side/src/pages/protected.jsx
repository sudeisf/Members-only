
import { Navigate ,Outlet } from 'react-router-dom';
import { useAuth} from '../Context/AuthContext'

const ProtectedRoute = ()=> {
    const {isAuthenticated, isloading } = useAuth();

    if(isloading){
        return <h1>Loading...</h1>  
    }

    if (!isAuthenticated) {
        return <Navigate to='/'/>
    }
    
    return (
        <>
        <Outlet />
        </>
    )


}




export default ProtectedRoute;