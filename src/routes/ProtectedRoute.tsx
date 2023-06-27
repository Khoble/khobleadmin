import { Navigate, useLocation } from 'react-router-dom';

export default function RecruiterProtectedRoute({ children }: { children: any }){
    let location = useLocation();

    if (localStorage.getItem("khoble-session")) {
        return children;
    }else{
        return (
            <Navigate to='/login' state={{ from: location }} replace />
        );
    }
};

