import { AiOutlineHome,AiOutlineUser,AiOutlineSearch,AiOutlineUsergroupAdd } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useAppSelector } from '../hooks/redux.hook';

const BottomBar = () => {
    const { auth:{ user } } = useAppSelector(state=>state);
    const { pathname } = useLocation();

    return (
        <div className=" w-full py-2 px-2 hidden fixed bottom-0 left-0 bg-white sm:flex items-center justify-around border-t border-gray-300">
           <Link to="/">
             <button className={`flex flex-col gap-y-1 items-center text-center text-[12px] font-medium ${pathname === "/" ? "text-blue-400" : "text-gray-500"}`}>
                <AiOutlineHome className='text-[20px]'/>
                Home
             </button>
           </Link>
           <Link to="/search">
             <button className={`flex flex-col gap-y-1 items-center text-center text-[12px] font-medium ${pathname === "/search" ? "text-blue-400" : "text-gray-500"}`}>
                <AiOutlineSearch className='text-[20px]'/>
                Search
             </button>
           </Link>
           <Link to="/">
             <button className={`flex flex-col gap-y-1 items-center text-center text-[12px] font-medium ${pathname === "/follow" ? "text-blue-400" : "text-gray-500"}`}>
                <AiOutlineUsergroupAdd className='text-[20px]'/>
                Following
             </button>
           </Link>
           <Link to={`/profile/${user?.id}`}>
             <button className={`flex flex-col gap-y-1 items-center text-center text-[12px] font-medium ${pathname.includes("profile") ? "text-blue-400" : "text-gray-500"}`}>
                <AiOutlineUser className='text-[20px]'/>
                Profile
             </button>
           </Link>
        </div>
    )
}

export default BottomBar;