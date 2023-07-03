import { useState,useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams,Link } from "react-router-dom";
import { IPostResponse } from "../../interfaces/home.interface";
import { FiTrash } from "react-icons/fi";
import { AiOutlineEdit } from "react-icons/ai";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { useAppSelector } from "../../hooks/redux.hook";
import { Input, LoadingSpinner } from "../../components";
import APIComment from "../../api/APIComment";
import APIPost from "../../api/APIPost";
import profile from "../../assets/images/profile.png";

const Post = () => {
   const { register,formState:{ errors },handleSubmit,setValue } = useForm();
   const { auth:{ user,token } } = useAppSelector(state=>state);
   const { id } = useParams();

   const [loading,setLoading] = useState<boolean>(false);
   const [post,setPost] = useState<IPostResponse | any>(null);

   const fetchPost = async () => {
      try {
        const { data } = await APIPost.get(`/${id}`);
        if(data && data.statusCode === 200) {
           setPost(data.data);
        }

      } catch(err) {
        return err;
      }
   }

   const deleteComment = async (id : number) => {
      setLoading(true);
        try {
          const { data } = await APIComment.delete(`/delete/${id}`, {
              headers: {
                Authorization:`Bearer ${token}`
              }
          });
          if(data && data.statusCode === 200) {
              fetchPost();
              setLoading(false);
          }

        } catch(err) {
           setLoading(false);
           return err;
        }
   }

   const submitHandler = async (form : any) => {
    setLoading(true);
       try {
        const { data } = await APIComment.post(`/create/${post?.id}`,form, {
           headers:{
             Authorization:`Bearer ${token}`
           }
        });
        if(data && data.statusCode === 200) {
           fetchPost();
           setLoading(false);
           setValue("comment" , "");
        }

       } catch(err) {
           setLoading(false);
          return err;
       }
   }

   useEffect(()=>{
      fetchPost();
   },[]);

    return (
        <div className="w-full sm:px-0 px-16 lg:px-7  flex items-start gap-x-6 relative">
            <div className="sm:w-full sm:py-0 lg:w-full w-[75%] py-7 mx-auto flex flex-col">
            <Link to="/">
                <button className="sm:bg-white sm:py-3 sm:px-4 sm:w-full flex items-center text-blue-400 font-semibold text-sm gap-x-3">
                    <HiOutlineArrowLeft className="text-lg"/>
                    Back
                </button>
            </Link>
            <div className="sm:mt-0 w-full sm:rounded-none rounded-md overflow-hidden mx-auto mt-3 bg-white sm:flex-col flex items-stretch">
                 <div className="sm:w-full sm:h-[250px] w-[40%] h-[500px]">
                 <img src={`${process.env.REACT_APP_BASE_IMAGE_URL}/posts/${post?.postImage}`} className="w-full object-fill h-full" alt={`${post?.title}`} />
                 </div>
                <div className="flex-1 py-4 px-4 bg-white h-full">
                <div className='w-full flex justify-between items-center'>
                <Link to={`/profile/${post?.user?.id}`}>
                    <div className='flex items-center gap-x-3'>
                    <img src={post?.user?.profile && post?.user?.profile?.avatar ? `${process.env.REACT_APP_BASE_IMAGE_URL}/avatar/${post?.user?.profile?.avatar}` : profile} alt="profile" className="w-[40px] h-[40px] rounded-full"/>
                    <div>
                        <h4 className="font-semibold text-md">{post?.user?.name}</h4>
                        <h5 className="text-gray-400 text-[13px]">{new Date(post?.createdAt).toDateString()}</h5>
                    </div>
                </div>
                </Link>
                {post?.user?.id == user?.id && (
                    <div className="flex items-center gap-x-2">
                    <button  className="text-md cursor-pointer text-red-400"><FiTrash/></button>
                    <button  className="text-blue-400 cursor-pointer text-md"><AiOutlineEdit/></button>
                </div>
               )}
             </div>
             <p className="mt-3 text-gray-500 text-[15px] mb-3">{post?.title}</p>
             <div className="w-full">
                <h5 className="text-sm font-medium text-left text-gray-600">{post?.comments?.length} comments</h5>
                {loading ? (
                   <div className="flex sm:h-[120px] h-[310px] items-center justify-center">
                     <LoadingSpinner width="30px" height="30px" />
                   </div>
                ) : (
                   <div className="w-full py-3 sm:h-[290px] h-[310px] overflow-y-scroll">
                     {Array.isArray(post?.comments) && post?.comments?.map((comment : any,idx : number) => (
                        <div key={idx} className="w-full">
                        <div className="flex items-center justify-between">
                         <div className='flex items-center gap-x-3'>
                        <img src={comment?.user?.profile && comment?.user?.profile?.avatar ? `${process.env.REACT_APP_BASE_IMAGE_URL}/avatar/${post?.user?.profile?.avatar}` : profile} alt="profile" className="w-[40px] h-[40px] rounded-full"/>
                        <div>
                           <h4 className="font-semibold text-md">{comment?.user?.name}</h4>
                           <h5 className="text-gray-400 text-[13px]">{new Date(comment?.createdAt).toDateString() || new Date().toDateString()}</h5>
                        </div>
                        </div>
                        {comment?.user?.id === user?.id && (
                       <div className="flex items-center gap-x-2">
                       <button onClick={()=>deleteComment(comment?.id)} className="text-md cursor-pointer text-red-400"><FiTrash/></button>
                       </div>
                     )}
                       </div>
                         <p className="mt-3 text-gray-500 text-[15px] mb-3">{comment?.comment}</p>
                        </div>
                     ))}
                   </div>
                )}
                <form onSubmit={handleSubmit(submitHandler)} className="flex items-center sm:mt-0 mt-3 gap-x-2">
                    <Input
                      name="comment"
                      type="text"
                      register={register}
                      placeholder="Write your comment"
                      error={errors?.comment ? true : false}
                    />
                    <button type="submit" className="bg-blue-400 text-white font-semibold text-sm py-3 px-4 rounded-sm">Submit</button>
                </form>
             </div>
          </div>
         </div>
       </div>
        </div>
    )
}

export default Post;