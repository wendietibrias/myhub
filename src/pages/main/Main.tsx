import { Navigate, Outlet } from "react-router-dom";
import { BottomBar, Navbar } from "../../components";
import { useAppSelector } from "../../hooks/redux.hook";

const Main = () => {
  const { auth:{ token } } = useAppSelector(state=>state);

  if(!token) {
     return <Navigate to="/auth/login"/>
  }

  return (
    <main className="w-full">
         <Navbar/>
          <div className="w-full mt-14 sm:h-[93vh]  sm:flex sm:flex-col sm:bg-white sm:overflow-y-scroll">
          <Outlet/>
         </div>
         <BottomBar/>
    </main>
  )
}

export default Main