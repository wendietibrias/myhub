import { Link, useNavigate } from "react-router-dom";
import { AiOutlineSecurityScan,AiOutlineLogout, AiOutlineUser } from "react-icons/ai";
import { useAppSelector } from "../hooks/redux.hook";
import { LiaMoonSolid } from "react-icons/lia";
import { BiSearch } from "react-icons/bi";
import { useState } from "react";
import { useAppDispatch } from "../hooks/redux.hook";
import APIAuth from "../api/APIAuth";
import profile from "../assets/images/profile.png";
import { removeToken } from "../store/user.store";

const Navbar = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [openDropdown,setOpenDropdown] = useState<boolean>(false);
    const { auth:{ user } } = useAppSelector(state=>state);

    const logoutHandler = async () => {
         try {
            const { data } = await APIAuth.delete(`/logout/${user?.id}`);
            if(data && data.statusCode === 200) {
                dispatch(removeToken())
                setOpenDropdown(false);
                navigate("/auth/login");
            }

         } catch(err) {
             return err;
         }
    }

    return (
        <nav className="w-full z-[999] fixed top-0 left-0 py-3 px-16 lg:px-8 sm:px-3 flex items-center justify-between bg-white shadow-sm shadow-gray-200">
           <div className="flex items-center gap-x-7">
            <Link to="/" className="flex items-center gap-x-2">
             <AiOutlineSecurityScan className="text-blue-400 text-3xl" />
              <span className="text-[18px] font-extrabold text-blue-400">MyHub</span>
            </Link>
            <ul className="flex items-center gap-x-3 sm:hidden">
                <Link to="/follow"><li className="text-[13px] font-medium text-gray-600 hover:text-blue-400">Following</li></Link>
                <Link to="/search"><li className="text-[13px] font-medium text-gray-600 hover:text-blue-400">Search</li></Link>
            </ul>
           </div>
           <div className="flex items-center gap-x-2">
               <button className="text-gray-500 hover:text-blue-400 text-[18px] mt-1 cursor-pointer"><BiSearch/></button>
               <button className="text-gray-500 hover:text-blue-400 text-[21px] cursor-pointer"><LiaMoonSolid/></button>
               {user?.profile ? null : (
                 <button onClick={() => setOpenDropdown(!openDropdown)} className="flex items-center gap-x-3 xs:ml-3 ml-4 cursor-pointer">
                     <img src={user?.avatar ? `${process.env.REACT_APP_BASE_IMAGE_URL}/avatar/${user?.avatar}` : profile} alt="profile" className="w-[32px] object-cover h-[32px] rounded-full"/>
                     <h5 className="text-gray-500 xs:hidden font-semibold text-[13px]">{user?.name || "John Doe"}</h5>
                 </button>
               )}
           </div>
           {openDropdown && (
             <div className="py-3 absolute xs:right-3 right-12 top-16 px-7 bg-white flex flex-col gap-y-3 justify-center z-[999] shadow-lg shadow-gray-200">
                <button onClick={logoutHandler} className="flex items-center gap-x-2">
                     <AiOutlineLogout className="text-md"/>
                     <span className="text-gray-500 text-[13px] font-medium">Logout</span>
                </button>
               <Link to={`/profile?${user?.id}`}>
                 <button onClick={logoutHandler} className="flex items-center gap-x-2">
                     <AiOutlineUser className="text-md"/>
                     <span className="text-gray-500 text-[13px] font-medium">Profile</span>
                </button>
               </Link>
             </div>
           )}
        </nav>
    )
}

export default Navbar;