import { useState,useEffect } from 'react'
import { LoadingSpinner, ProfileBox,PostCard, UpdateProfileModal, UpdatePostModal } from '../../components';
import { useAppSelector } from '../../hooks/redux.hook';
import { IPostResponse } from '../../interfaces/home.interface';
import { useParams } from 'react-router-dom';
import APIProfile from '../../api/APIProfile';

const Profile = () => {
  const { id } = useParams();
  const { token } = useAppSelector(state=>state.auth);
  const { open:openProfileModal } = useAppSelector(state=>state.updateProfileModal);
  const { open:openUpdatePostModal } = useAppSelector(state=>state.updatePostModal);
 
  const [profileUser,setProfileUser] = useState<any>(null);
  const [loading,setLoading] = useState<boolean>(false);
  const [posts,setPosts] = useState<IPostResponse[]>([]);

  const fetchUser = async () => {
     try {

      const { data } = await APIProfile.get(`/complete/${id}`, {
          headers: {
             Authorization:`Bearer ${token}`
          }
      });
      if(data && data.statusCode === 200) {
          setProfileUser(data.data);
          setPosts(data.data?.posts);

      }

     } catch(err) {
        return err;
     }  
  }
  
  useEffect(() => {
     document.title = "MyHub | Profile";
     fetchUser();
  } , [id])

  return (
    <div className='sm:px-0 sm:py-0 sm:flex-col px-16 py-5 flex items-start gap-x-6'>
       <div className="w-[27%] sm:w-full">
         <ProfileBox fetchUser={fetchUser} userData={profileUser}/>
       </div>
       <main className="w-[46%] sm:w-full ">
           {loading ? (
             <div className="flex justify-center items-center py-5">
                 <LoadingSpinner width="30px" height="30px"/>
             </div>
          ) : (
              <div className="w-full flex flex-col sm:gap-y-0 gap-y-3">
             {posts && Array.isArray(posts) && posts.map((post,idx) => <PostCard key={idx} post={post} fetchPosts={fetchUser} />)}
             {loading && posts.length > 0 && (
                 <div className="flex justify-center items-center">
                    <LoadingSpinner width="30px" height="30px" />
                 </div>
             )}
          </div>
          )}
       </main>
       <div className="w-[27%] sm:hidden"></div>
       {openProfileModal && <UpdateProfileModal fetchUser={fetchUser} userData={profileUser} />}
       {openUpdatePostModal && <UpdatePostModal fetchPosts={fetchUser} /> }
    </div>
  )
}

export default Profile