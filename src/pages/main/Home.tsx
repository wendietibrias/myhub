import { ChangeEvent, useState,useEffect,useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux.hook";
import { EmojiBox, FollowBox, LoadingSpinner, ProfileBox, UpdatePostModal, WrapperAlert } from "../../components";
import { AiOutlineFileImage,AiOutlineSmile } from "react-icons/ai";
import { IPostFormState, IPostResponse } from "../../interfaces/home.interface";
import { openWrapperAlert } from "../../store/wrapperAlert.store";
import profile from "../../assets/images/profile.png";
import APIPost from "../../api/APIPost";
import PostCard from "../../components/PostCard";
import APIProfile from "../../api/APIProfile";

const Home = () => {
  const dispatch = useAppDispatch();
  const { 
   auth:{ user,token } , 
   wrapperAlert:{ open }, 
   updatePostModal:{ open:openUpdateModal } 
} = useAppSelector(state=>state);

  const imagePreview = useRef<any>("");
  
  const [openEmoji,setOpenEmoji] = useState<boolean>(false);
  const [profileUser,setProfileUser] = useState<any>(null);
  const [loading,setLoading] = useState<boolean>(false);
  const [posts,setPosts] = useState<IPostResponse[]>([]);
  const [postForm,setPostForm] = useState<IPostFormState>({
      title:"",
      postImage:""
  });

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

  const fetchPosts = async () => {
      setLoading(true);
      try {
         const { data } = await APIPost.get(`/all` , {
             headers: {
                Authorization:`Bearer ${token}`
             }
         });

         if(data && data.statusCode === 200) {
            setPosts(data.data);
            setTimeout(()=> setLoading(false) ,1500);
         }

      } catch(err) {
         setLoading(false);
         return err;
      }
  }

  const uploadImageHandler = (e : any) => {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onloadend = function() {
          imagePreview.current = this.result;
          setPostForm({
            ...postForm,
            postImage:file
          })
      }

      reader.readAsDataURL(file);
  }

  const changeHandler = (e : ChangeEvent<HTMLInputElement>) => {
      const name = e.target.name;
      const value = e.target.value;

      setPostForm({
         ...postForm,
         [name]:value
      })
  }

  const createPost = async () => {
      try {
         const formData = new FormData();
         formData.append('title' , postForm.title);
         formData.append('postImage' , postForm.postImage);

         const { data } = await APIPost.post(`/create`, formData , {
             headers: {
               Authorization:`Bearer ${token}`
             }
         });

         if(data && data.statusCode === 200) {
              fetchPosts();
              setPostForm({
                 title:"",
                 postImage:""
              });
              imagePreview.current = "";
              dispatch(openWrapperAlert({
                  message:data.message,
                  type:"success"
              }));
         }

      } catch(err : any) {
         const { response:{ data } } = err
          dispatch(openWrapperAlert({
                  message:data.message,
                  type:"error"
          }));
      }
  }

  const emojiHandler = (args : any) => {
      setPostForm({
         ...postForm,
         title:postForm.title.concat(`${args.emoji}`)
      });
  }

  useEffect(()=> {
     document.title = "MyHub | Home"
     fetchPosts();
     fetchUser();
  },[])

  return (
    <section className="sm:px-0 sm:py-0 px-16 py-5 lg:px-7 flex items-start gap-x-6 relative">
       { openUpdateModal && <UpdatePostModal fetchPosts={fetchPosts} /> }
       { open && <WrapperAlert/> }
       <div className="w-[27%] lg:hidden">
          <ProfileBox fetchUser={null} userData={profileUser} />
       </div>
       <div className="w-[46%] lg:w-full relative">
          <div className="w-full rounded-sm shadow-lg bg-white shadow-gray-200 sm:border sm:border-gray-200">
             <div className="flex items-start gap-x-3  py-3 px-3 sm:border-none border-b border-gray-200">
                { user?.avatar ? (
                  <img src={`${process.env.REACT_APP_BASE_IMAGE_URL}/avatar/${user?.avatar}`} alt="profile" className="w-[40px] h-[40px] rounded-full"/>
                ) : (
                  <img src={profile} alt="profile" className="w-[40px] h-[40px] rounded-full"/>
                )}
                <div className="flex-1">
                   <input onChange={changeHandler} value={postForm.title} placeholder="Write something.." type="text" name="title" className="w-full text-sm rounded-full outline-none focus:ring-1 focus:ring-blue-400 py-3 px-4 bg-gray-100 border-gray-200"/>
                   {imagePreview.current !== "" && <img src={imagePreview.current} alt="preview image" className="w-full h-[230px] mt-2" />}
                </div>
             </div>
             <div className="w-full sm:pb-2 sm:pt-0 py-2 px-4 flex justify-between items-center">
                <div className="flex items-center gap-x-4">
                    <button>
                       <input onChange={uploadImageHandler} type="file" name="postImage" id="postImage" className="hidden"/>
                       <label htmlFor="postImage" className="flex items-center cursor-pointer gap-x-[6px] text-gray-500">
                         <AiOutlineFileImage className="text-lg" />
                         <span className="text-[12px] font-semibold">Image</span>
                       </label>
                    </button>
                     <button onClick={() => setOpenEmoji(!openEmoji)}>
                       <label className="flex items-center cursor-pointer gap-x-[6px] text-gray-500">
                         <AiOutlineSmile className="text-lg" />
                         <span className="text-[12px] font-semibold">Emojis</span>
                       </label>
                    </button>
                </div>
               <button onClick={createPost} disabled={postForm.title === "" ? true : false} className={`bg-blue-400 ${postForm.title.length === 0 ? "cursor-not-allowed" : "cursor-pointer"} text-white text-[13px] font-semibold py-2 px-4 rounded-full`}>Submit</button>
             </div>
          </div>
          {openEmoji && <EmojiBox emojiClick={emojiHandler} />}
          {loading ? (
             <div className="flex justify-center items-center py-5">
                 <LoadingSpinner width="30px" height="30px"/>
             </div>
          ) : (
              <div className="w-full flex flex-col sm:gap-y-0 gap-y-3 sm:mt-0 mt-5">
             {posts && Array.isArray(posts) && posts.map((post,idx) => <PostCard key={idx} post={post} fetchPosts={fetchPosts} />)}
             {loading && posts.length > 0 && (
                 <div className="flex justify-center items-center">
                    <LoadingSpinner width="30px" height="30px" />
                 </div>
             )}
          </div>
          )}
       </div>
       <div className="w-[27%] lg:hidden">
         <div className="w-[24%] fixed top-15 right-16 flex flex-col gap-y-4">
           <FollowBox fetchData={fetchUser} type="following" datas={profileUser?.following || []} />
           <FollowBox fetchData={fetchUser} type="follower" datas={profileUser?.followers || []} />
         </div>
       </div>
    </section>
  )
}

export default Home