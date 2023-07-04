import { FiBriefcase } from 'react-icons/fi';
import { AiOutlineEdit,AiOutlineCalendar, AiFillCamera } from 'react-icons/ai';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import { useAppDispatch, useAppSelector } from "../hooks/redux.hook";
import { Link,useLocation } from "react-router-dom";
import { openProfileModal } from "../store/updateProfileModal";
import { setToken } from "../store/user.store";
import profile from "../assets/images/profile.png";
import APIProfile from "../api/APIProfile";
import APIFollow from "../api/APIFollow";
import { IProfileUserProps } from "../interfaces/props.interface";

const ProfileBox = ({
  userData,
  fetchUser 
} : IProfileUserProps) => {
 
    const dispatch = useAppDispatch();
    const { pathname } = useLocation();
    const { auth:{ user,token } } = useAppSelector(state=>state);

    const checkFollowing = userData?.followers?.find((follower : any) => follower.followerId === user.id) ;

    const uploadImage =  (e : any) => {
        try {
         const file = e.target.files[0];
         const reader = new FileReader();
         const formData = new FormData();

         reader.onloadend = async function() {
            formData.append('avatarImage' , file);
            const { data } = await APIProfile.post(`/update/avatar/${userData?.id}`,formData,{
                headers: {
                  Authorization:`Bearer ${token}`
                }
            });

            if(data && data.statusCode === 200) {
                fetchUser();
                dispatch(setToken(data.data.access_token));
            }
         }

         reader.readAsDataURL(file);

        } catch(err) {
           return err;
        }
    }

    const followHandler = async () => {
       try {
         const { data } = await APIFollow.patch(`/follow/${userData?.id}`,null, {
             headers: {
                Authorization:`Bearer ${token}`
             }
         });

         if(data && data.statusCode === 200) {
             fetchUser();
         }

       } catch(err) {
          return err;
       }
    }

    if(pathname === "/") {
       return (
          <Link to={`/profile/${userData?.id}`}>
          <div className="w-[24%] shadow-lg rounded-lg shadow-gray-200 bg-white fixed top-19 left-16">
            <div className="py-3 px-4 flex items-center justify-between border-b border-gray-200">
               <div className="flex items-center gap-x-4">
                 {userData?.profile && userData?.profile?.avatar ? (
                   <img src={`${process.env.REACT_APP_BASE_IMAGE_URL}/avatar/${userData?.profile?.avatar}`} className="w-[45px] h-[45px] object-cover rounded-full"/>
                ) : (
                  <img src={profile} className="w-[45px] h-[45px] object-cover rounded-full"/>
                )}
                <div>
                    <h4 className="font-semibold text-[16px]">{userData?.name}</h4>
                    <div className="flex items-center gap-x-3">
                      <h5 className="text-[13px] text-gray-400">{userData?.following?.length} Following </h5>
                      <h5 className="text-[13px] text-gray-400">{userData?.followers?.length} Follower</h5>
                    </div>
                </div>
               </div>
            </div>
            <div className="w-full py-4 px-4">
                {userData?.profile ? (
                   <div className="w-full flex flex-col gap-y-3">
                  <p className="text-[13px] text-gray-600 mb-2">
                     {userData?.profile?.bio ? userData?.profile?.bio : "No bio"}
                  </p>
                   <p className="text-[13px] flex items-center gap-x-3 leading-none text-gray-600">
                        <FiBriefcase className="text-[16px]"/>
                        {userData?.profile?.profession}
                     </p>
                        <p className="text-[13px] flex items-center gap-x-3 leading-none text-gray-600">
                        <HiOutlineLocationMarker className="text-[16px]"/>
                        {userData?.profile?.location}
                     </p>
                      <p className="text-[13px] flex items-center gap-x-3 leading-none text-gray-600">
                        <AiOutlineCalendar className="text-[16px]"/>
                        {userData?.profile?.birthday}
                     </p>
                   </div>
                ) : (
                   <div className="w-full">
                     {userData?.id === user?.id ? (
                        <Link to={`/profile/${user?.id}`}><button className="w-full hover:bg-blue-400 hover:text-white transition-all py-2 border-blue-400 border text-blue-400 font-semibold text-sm">Complete Profile</button></Link>
                     ) : (
                         <p className="text-sm text-gray-400 font-medium text-center">No Profile</p>
                     )}
                   </div>
                )}
            </div>
        </div>
          </Link>
       )
    }

    return (
        <div className="sm:relative sm:top-0 sm:left-0 sm:w-full sm:shadow-none w-[24%] shadow-lg rounded-lg shadow-gray-200 bg-white fixed top-19 left-16">
            <div className="py-3 px-4 flex items-center justify-between border-b border-gray-200">
               <div className="flex items-center gap-x-5">
               {userData?.id === user?.id ? (
                  <div className="w-[45px] h-[45px] object-cover relative rounded-full">
                   <img src={`${process.env.REACT_APP_BASE_IMAGE_URL}/avatar/${userData?.profile?.avatar}`} className="w-[45px] h-[45px] object-cover rounded-full"/>
                   <input onChange={uploadImage} type="file" name="avatarImage" id="avatarImage" className="hidden"/>
                   <label htmlFor="avatarImage" className="text-[17px] text-gray-500 absolute bottom-0 -right-1 cursor-pointer">
                     <AiFillCamera/>
                   </label>
                  </div>
               ) : (
                   <img src={userData?.profile && userData?.profile?.avatar ? `${process.env.REACT_APP_BASE_IMAGE_URL}/avatar/${userData?.profile?.avatar}` : profile} className="w-[45px] h-[45px] object-cover rounded-full"/>
               )}
                <div>
                    <h4 className="font-semibold text-[16px]">{userData?.name}</h4>
                    <div className="flex items-center gap-x-3">
                      <h5 className="text-[13px] text-gray-400">{userData?.following?.length} Following </h5>
                      <h5 className="text-[13px] text-gray-400">{userData?.followers?.length} Follower</h5>
                    </div>
                </div>
               </div>
               {userData?.id === user?.id ? (
                 <button onClick={()=>dispatch(openProfileModal(userData?.id))} className="text-gray-600 text-[18px] cursor-pointer">
                  <AiOutlineEdit />
                 </button>
               ) : (
                  <div>
                     {checkFollowing ? (
                      <button onClick={()=>followHandler()} className="py-1 px-2 rounded-full border-blue-400 border-2 text-blue-400 text-[13px] font-semibold">Unfollow</button> 
                     ) : (
                      <button onClick={()=>followHandler()} className="py-1 px-2 rounded-full text-white bg-blue-400 text-[13px] font-semibold">Follow</button>
                     )}
                  </div>
               )}

            </div>
            <div className="w-full py-4 px-4">
                {userData?.profile ? (
                   <div className="w-full flex flex-col gap-y-3">
                     <p className="text-[13px] text-gray-600 mb-1">
                        {userData?.profile?.bio ? userData?.profile?.bio : "No bio"}
                     </p>
                     <p className="text-[13px] flex items-center gap-x-3 leading-none text-gray-600">
                        <FiBriefcase className="text-[16px]"/>
                        {userData?.profile?.profession}
                     </p>
                     <p className="text-[13px] flex items-center gap-x-3 leading-none text-gray-600">
                        <HiOutlineLocationMarker className="text-[16px]"/>
                        {userData?.profile?.location}
                     </p>
                       <p className="text-[13px] flex items-center gap-x-3 leading-none text-gray-600">
                        <AiOutlineCalendar className="text-[16px]"/>
                        {userData?.profile?.birthday}
                     </p>
                   </div>
                ) : (
                   <div className="w-full">
                     {userData?.id === user?.id ? (
                        <button onClick={()=>dispatch(openProfileModal(userData?.id))} className="w-full hover:bg-blue-400 hover:text-white transition-all py-2 border-blue-400 border text-blue-400 font-semibold text-sm">Complete Profile</button>
                     ) : (
                         <p className="text-sm text-gray-400 font-medium text-center">No Profile</p>
                     )}
                   </div>
                )}
            </div>
        </div>
    )
}

export default ProfileBox;