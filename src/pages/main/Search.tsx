import { useState,useEffect } from "react";
import { Input, LoadingSpinner, ProfileBox } from "../../components";
import { useAppSelector } from "../../hooks/redux.hook";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import profile from "../../assets/images/profile.png";
import APIProfile from "../../api/APIProfile";
import APIUser from "../../api/APIUser";

const Search = () => {
   const { register,formState:{ errors } , handleSubmit } = useForm();
   const { auth:{ token,user } } = useAppSelector(state=>state);
    
   const [loading,setLoading] = useState<boolean>(false);
   const [users,setUsers] = useState<any>(null);
   const [profileUser,setProfileUser] = useState<any>(null);

   const fetchAllUser = async () => {
      setLoading(true);
      try {
         const { data } = await APIUser.get(`/all`,{
            headers: {
                Authorization:`Bearer ${token}`
            }
         });

         if(data && data.statusCode === 200) {
            setUsers(data.data);
            setLoading(false);
         }

      } catch(err) {
         setLoading(false);
         return err;
      }
   }

    const fetchUser = async (query : string = "") => {
     try {
        const { data } = await APIProfile.get(`/${user?.id}?search=${query}` , {
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

  const searchHandler = async (response : any) => {
   setLoading(true);
    try {
      const searchValue : string = response.search;
      const { data } = await APIUser.get(`/search?search=${searchValue}`, {
           headers: {
             Authorization:`Bearer ${token}`
           }
      });

      if(data && data.statusCode === 200) {
          setLoading(false);
          setUsers(data.data);
      }
      
    } catch(err) {
        setLoading(false);
        return err;
    }
  }

  useEffect(()=> {
     fetchUser();
     fetchAllUser();
  },[])

    return (
        <div className="w-full py-5 px-16 sm:px-0 sm:py-0 flex items-stretch gap-x-8 ">
            <div className="w-[27%] lg:hidden">
                <ProfileBox fetchUser={fetchUser} userData={profileUser} />
            </div>
            <div className="w-[46%] lg:w-full">
                <form onSubmit={handleSubmit(searchHandler)} className="w-full bg-white shadow-lg py-3 px-3 flex items-center gap-x-2 sm:shadow-none sm:pt-5 sm:pb-0 shadow-gray-200">
                   <Input
                     type="text"
                     name="search"
                     placeholder="Find user"
                     register={register}
                     error={errors.search ? true : false}
                   />
                   <button className="bg-blue-400 text-white py-3 px-4 font-semibold text-sm rounded-sm">Search</button>
                </form>
                {loading ? (
                  <div className="flex items-center justify-center w-full mt-7">
                     <LoadingSpinner width="30px" height="30px" />
                  </div>
                ) : (
                  <div className="flex flex-col sm:gap-y-0 gap-y-3 w-full mt-5 sm:mt-3">
                      {Array.isArray(users) && users.map((user,idx) => (
                         <Link to={`/profile/${user?.id}`} key={idx}>
                           <div className="w-full shadow-lg bg-white shadow-gray-200 sm:shadow-none py-3 px-3 rounded-sm">
                             <div className="flex items-center gap-x-4">
                               <img alt={user?.name} className="w-[60px] h-[60px]  rounded-full" src={user?.profile?.avatar ? `${process.env.REACT_APP_BASE_IMAGE_URL}/avatar/${user?.profile?.avatar}` : profile}/>
                               <div>
                                 <h5 className="sm:text-sm text-md font-semibold">{user?.name}</h5>
                                 <p className="text-[13px] text-gray-500 w-[170px] text-ellipsis whitespace-nowrap overflow-hidden">{user?.profile?.bio}</p>
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

export default Search;