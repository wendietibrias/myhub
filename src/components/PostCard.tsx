import { useAppSelector,useAppDispatch } from "../hooks/redux.hook";
import { FiTrash } from 'react-icons/fi';
import { AiOutlineEdit,AiOutlineHeart,AiFillHeart } from 'react-icons/ai';
import { BsChat } from 'react-icons/bs';
import { Link } from "react-router-dom";
import { openWrapperAlert } from "../store/wrapperAlert.store";
import { openUpdatePostModal } from "../store/updatePostModal.store";
import { IPostCardProps } from '../interfaces/props.interface';
import profile from "../assets/images/profile.png";
import APIPost from "../api/APIPost";
import APILike from "../api/APILike";

const PostCard = ({ 
   post ,
   fetchPosts
} : IPostCardProps) => {
   
  let checkLike; 
  const dispatch = useAppDispatch();
  const { auth:{ user,token } } = useAppSelector(state=>state);
  checkLike = post?.likes?.find((item : any)=>item.user.id == user.id);

  const likePost = async () => {
      try {
         const { data } = await APILike.post(`/${post?.id}`, {}, {
             headers: {
                Authorization:`Bearer ${token}`
             }
         });
         if(data && data.statusCode === 200) {
             fetchPosts();
         }

      } catch(err) {
         return err;
      }
  }

  const deletePost = async () => {
     try {
        const { data } = await APIPost.delete(`/delete/${post?.id}` , {
           headers: {
              Authorization:`Bearer ${token}`
           }
        });
        if(data && data.statusCode === 200) {
           fetchPosts();
           dispatch(openWrapperAlert({
              message:data.message,
              type:"success"
           }))
        }
     } catch(err : any) {
        const { response:{ data } } = err
          dispatch(openWrapperAlert({
               message:data.message,
               type:"error"
         }));
     }
  }

  return (
    <div className='w-full bg-white shadow-md shadow-gray-200 rounded-md py-3 px-4'>
         <div className='w-full flex justify-between items-center'>
            <Link to={`/profile/${post?.user?.id}`}>
                <div className='flex items-center gap-x-3'>
                <img src={post?.user?.profile && post?.user?.profile?.avatar ? `${process.env.REACT_APP_BASE_IMAGE_URL}/avatar/${post?.user?.profile?.avatar}` : profile} alt="profile" className="w-[40px] h-[40px] rounded-full"/>
                <div>
                    <h4 className="font-semibold sm:text-sm text-md">{post?.user?.name}</h4>
                    <h5 className="text-gray-400 text-[13px]">{new Date(post?.createdAt).toDateString()}</h5>
                </div>
             </div>
            </Link>
             {post?.user?.id == user?.id && (
                <div className="flex items-center gap-x-2">
                 <button onClick={deletePost} className="text-md cursor-pointer text-red-400"><FiTrash/></button>
                 <button onClick={() => dispatch(openUpdatePostModal(post.id))} className="text-blue-400 cursor-pointer text-md"><AiOutlineEdit/></button>
             </div>
             )}
         </div>
         <p className="mt-3 text-gray-500 text-[15px] mb-3">{post?.title}</p>
         <img src={`${process.env.REACT_APP_BASE_IMAGE_URL}/posts/${post?.postImage}`} className="w-full" />
         <div className="pt-3 flex items-center gap-x-5 text-gray-500">

           {checkLike ? (
              <button onClick={likePost} className="flex text-md items-center gap-x-2">
               <AiFillHeart className="text-red-400"/>
               <span className="text-[14px]">{post?.likes?.length} likes</span>
            </button>
          ) : ( 
             <button onClick={likePost} className="flex text-md items-center gap-x-2">
               <AiOutlineHeart/>
               <span className="text-[14px]">{post?.likes?.length} likes</span>
            </button>
          )}
           <Link to={`/post/${post?.id}`}>
             <button className="flex text-md items-center gap-x-2">
               <BsChat/>
               <span className="text-[14px]">{post?.comments?.length} comments</span>
            </button>
           </Link>
         </div>
    </div>
  )
}

export default PostCard