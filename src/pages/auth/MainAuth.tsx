import { Outlet,Navigate } from "react-router-dom";
import { useAppSelector } from "../../hooks/redux.hook";

const MainAuth = () => {
    const { auth:{ token } } = useAppSelector(state=>state);

     if(token) {
        return <Navigate to="/"/>
    }

    return (
        <Outlet/>
    )
}

export default MainAuth;