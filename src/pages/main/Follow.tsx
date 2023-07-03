import { useState,useEffect } from 'react';
import { useAppSelector } from '../../hooks/redux.hook';
import { Link } from 'react-router-dom';
import { LoadingSpinner, ProfileBox } from '../../components';
import APIProfile from '../../api/APIProfile';
import APIFollow from '../../api/APIFollow';
import profile from "../../assets/images/profile.png";

const Follow = () => {
    const { auth:{ token,user } } = useAppSelector(state=>state);
    
    const [loading,setLoading] = useState<boolean>(false);
    const [follows,setFollows] = useState<any>(null);
    const [filterType,setFilterType] = useState<string>("following");
    const [profileUser,setProfileUser] = useState<any>(null);

    const fetchFollowData = async () => {
        setLoading(true);
        try {
            const { data } = await APIFollow.get(`/get/follow?filterType=${filterType}`, {
                 headers: {
                     Authorization:`Bearer ${token}`
                 }
            });

            if(data && data.statusCode === 200) {
                setFollows(data.data);
                setLoading(false);
            }

        } catch(err) {
            setLoading(false);
            return err;
        }
    }

    const fetchUser = async () => {
        try {
            const { data } = await APIProfile.get(`/${user?.id}` , {
            headers: { 
                Authorization:`Bearer ${token}`
            }
            });

            if(data && data.statusCode === 200) {
             setProfileUser(data.data);
            }

        } catch(err) {
            return err;
        }
    }
 
    useEffect(()=>{
       fetchUser();
       fetchFollowData();
    },[filterType])

    return (
        <div className="w-full sm:px-0 sm:py-0 px-16 py-5 flex items-stretch gap-x-8">
           <div className="w-[27%] lg:hidden">
            <ProfileBox fetchUser={fetchUser} userData={profileUser} />
           </div>
           <div className="w-[46%] lg:w-full">
             <div className="bg-white w-full sm:shadow-none sm:border-b sm:border-gray-200 rounded-sm shadow-lg shadow-gray-200 flex items-center">
                <button onClick={()=>setFilterType("following")} className={`py-4 px-3 flex-1 text-sm font-semibold ${filterType === 'following' && 'text-blue-400 border-b-4 border-blue-400'}`}>Following</button>
                <button onClick={()=>setFilterType("follower")} className={`py-4 px-3 flex-1 text-sm font-semibold ${filterType === 'follower' && 'text-blue-400 border-b-4 border-blue-400'}`}>Follower</button>
             </div>
             {loading ? (
                 <div className='mt-7 flex justify-center'>
                    <LoadingSpinner width="30px" height="30px" />
                 </div>
             ) : (
                <div className='flex flex-col gap-y-3 sm:gap-y-0 mt-5'>
                    {Array.isArray(follows) && follows.map((follow,idx) => (
                      <Link to={`/profile/${follow?.followingId || follow?.followerId}`}  key={idx}> 
                           <div className='w-full bg-white sm:shadow-none shadow-lg py-3 px-3 shadow-gray-200'>
                              <div className="flex items-center gap-x-4">
                               <img alt={follow?.name} className="w-[60px] h-[60px]  rounded-full" src={follow?.avatar ? `${process.env.REACT_APP_BASE_IMAGE_URL}/avatar/${follow?.avatar}` : profile}/>
                               <div>
                                 <h5 className="text-lg font-semibold">{follow?.name}</h5>
                                 <p className="text-[13px] text-gray-500 w-[170px] text-ellipsis whitespace-nowrap overflow-hidden">{follow?.bio}</p>
                               </div>
                             </div>
                         </div>
                      </Link>
                    ))}
                </div>
             )}
           </div>
           <div className="w-[27%] lg:hidden"></div>
        </div>
    )
}

export default Follow;