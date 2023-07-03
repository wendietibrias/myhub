import { useState,useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../hooks/redux.hook";
import { IoIosClose } from "react-icons/io";
import { closeProfileModal } from "../store/updateProfileModal";
import Input from "./Input";
import InputError from "./InputError";
import { IUserResponseState } from "../interfaces/global.interface";
import APIProfile from "../api/APIProfile";
import { setToken } from "../store/user.store";

interface UpdateProfileProps {
  userData : IUserResponseState;
  fetchUser: () => void
}

const UpdateProfileModal = ({
  userData,
  fetchUser
} : UpdateProfileProps ) => {
   const dispatch = useAppDispatch();
   const { auth:{ token } } = useAppSelector(state=>state);
   const { register,formState:{ errors },handleSubmit,setValue } = useForm();


   const submitHandler = async (data : any) => {
        try{
          const { data:response } = await APIProfile.put(`/update/${userData?.id}`,data , {
             headers: {
               Authorization:`Bearer ${token}`
             }
          });

          if(response && response.statusCode === 200) {
             fetchUser();
             dispatch(closeProfileModal());
             dispatch(setToken(response.data.access_token));
          }

        } catch(err) {
          return err;
        }
   }

   useEffect(() => {
       setValue('name', userData?.name);
       setValue('email',  userData?.email);
       setValue('profession',userData?.profile?.profession);
       setValue('location' , userData?.profile?.location);
       setValue('birthday' , userData?.profile?.birthday);
       setValue('website' , userData?.profile?.website);
       setValue('address', userData?.profile?.location);
       setValue('bio' , userData?.profile?.bio);
   },[])

    return (
        <div className="w-full z-[99999] px-5 h-screen flex items-center justify-center fixed top-0 left-0 bg-gray-800/50">
             <div className="w-[600px] bg-white rounded-md py-5 px-5">
                 <h2 className="text-xl font-semibold">Update Profile</h2>
                 <form onSubmit={handleSubmit(submitHandler)} className="mt-4 flex flex-col gap-y-2">
                     <div className="flex gap-y-2 flex-col">
                         <Input
                            type="text"
                            name="name"
                            placeholder="Username"
                            register={register}
                            error={errors.name ? true : false}
                         />
                        {errors.name && (
                          <InputError
                            message="name field is required"
                          />
                        )}
                     </div>
                        <div className="flex gap-y-2 flex-col">
                         <Input
                            type="email"
                            name="email"
                            placeholder="Email"
                            register={register}
                            error={errors.email ? true : false}
                         />
                        {errors.name && (
                          <InputError
                            message="email field is required"
                          />
                        )}
                     </div>
                        <div className="flex gap-y-2 flex-col">
                         <Input
                            type="text"
                            name="profession"
                            placeholder="Profession"
                            register={register}
                            error={errors.profession ? true : false}
                         />
                        {errors.name && (
                          <InputError
                            message="profession field is required"
                          />
                        )}
                     </div>
                     <div className="flex gap-y-2 flex-col">
                         <Input
                            type="date"
                            name="birthday"
                            placeholder="Birthday"
                            register={register}
                            error={errors.birthday ? true : false}
                         />
                        {errors.birthday && (
                          <InputError
                            message="birthday field is required"
                          />
                        )}
                     </div>
                    <div className="flex gap-y-2 flex-col">
                         <Input
                            type="text"
                            name="address"
                            placeholder="Address"
                            register={register}
                            error={errors.address ? true : false}
                         />
                        {errors.address && (
                          <InputError
                            message="address field is required"
                          />
                        )}
                     </div>
                     <div className="flex gap-y-2 flex-col">
                        <textarea placeholder="Bio" {...register('bio')} name="bio" className="w-full border py-2 px-2 outline-none focus:ring-1 focus:ring-blue-400 border-gray-200 bg-gray-100 h-[100px] resize-none"></textarea>
                     </div>
                     <button className="w-full mt-4 text-sm bg-blue-400 text-white font-semibold py-2">Update</button>
                 </form>
             </div>
            <button onClick={()=>dispatch(closeProfileModal())} className="text-white text-3xl font-bold absolute top-4 right-4"><IoIosClose/></button>

        </div>
    )
}

export default UpdateProfileModal;