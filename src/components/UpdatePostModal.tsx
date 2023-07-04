import { useState,useRef,useEffect } from "react";
import { useForm } from "react-hook-form"
import { IUpdatePostModalState } from "../interfaces/global.interface";
import { IoIosClose } from 'react-icons/io';
import Input from "./Input";
import InputError from "./InputError";
import { useAppDispatch, useAppSelector } from "../hooks/redux.hook";
import APIPost from "../api/APIPost";
import LoadingSpinner from "./LoadingSpinner";
import { closeUpdatePostModal } from "../store/updatePostModal.store";

interface IUpdatePostModal {
   fetchPosts: () => void
}

const UpdatePostModal = ({
    fetchPosts
} : IUpdatePostModal) => {
   const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IUpdatePostModalState>();
  const dispatch = useAppDispatch();
  const { postId } = useAppSelector(state=>state.updatePostModal);
  const { token } = useAppSelector(state=>state.auth);
  const imagePreview = useRef<any>("");

  const [loading,setLoading] = useState<boolean>(false);

  const fetchPost = async () => {
     try {
        const { data } = await APIPost.get(`/update/get-data/${postId}`, {
             headers:{
                Authorization:`Bearer ${token}`
             }
        });

        if(data && data.statusCode === 200) {
            setValue("title" , data.data.title);
            setValue("postImage" , data.data.postImage);
            imagePreview.current = `${process.env.REACT_APP_BASE_IMAGE_URL}/posts/${data.data.postImage}`;
        }

     } catch(err) {
         return err;
     }
  }

  const updatePost = async (data : any) => {
    setLoading(true);
     try {
      const formData = new FormData();
      formData.append('title',data.title);
      formData.append('postImage'  , data.postImage[0].file);
      const { data:response } = await APIPost.put(`/update/${postId}`, formData, {
           headers: {
             Authorization:`Bearer ${token}`
           }
      });

      if(response && response.statusCode === 200) {
          setLoading(false);
          dispatch(closeUpdatePostModal());
          fetchPosts();
      }
       
     } catch(err) {
        return err;
     }
  }

  useEffect(()=>{
     fetchPost();
  },[postId])

  return (
    <div className="w-full z-[99999] px-5 fixed top-0 left-0 h-screen bg-gray-800/50 flex items-center justify-center">
          {loading ? (
            <div className="w-[650px] bg-white rounded-sm py-10 flex justify-center items-center">
                <LoadingSpinner width="30px" height="30px"/>
            </div>
          ) : (
            <div className="w-[650px]  bg-white rounded-sm py-5 px-5">
             <h4 className="text-lg font-bold">Update Post</h4>
             <form onSubmit={handleSubmit(updatePost)} className="mt-3">
                 <div className="flex flex-col gap-y-2">
                     <Input
                        type="text"
                        name="title"
                        placeholder="Post title"
                        register={register}
                        error={errors.title ? true : false} 
                     />
                     {errors.title && (
                      <InputError 
                        message={errors.title ? "title field is required" : ""}
                     />
                  )}
                 </div>
                 <div className="w-full mt-2 flex flex-col gap-y-2">
                     <input {...register('postImage')} type="file" name="postImage" id="postImage" className="hidden"/>
                     <div className="flex items-center gap-x-2">
                      <label htmlFor="postImage" className="bg-blue-400 cursor-pointer text-white text-[13px] font-semibold py-2 px-4 rounded-full">
                        Upload Image
                     </label>
                     </div>
                     {errors.postImage && (
                        <InputError
                         message={errors.postImage ? "image field is required" : ""}
                      />
                   )}
                 </div>
                 <button className="text-sm mt-7 bg-blue-400 w-full text-white font-semibold py-2 rounded-full">Update</button>
             </form>
         </div>
          )}
         <button onClick={()=>dispatch(closeUpdatePostModal())} className="text-white text-3xl font-bold absolute top-4 right-4"><IoIosClose/></button>
    </div>
  )
}

export default UpdatePostModal