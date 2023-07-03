import { useState, useEffect } from 'react'
import { AiOutlineSecurityScan,AiOutlineEye,AiOutlineEyeInvisible,AiOutlineCheckCircle } from 'react-icons/ai';
import { IRegisterState } from '../../interfaces/register.interface';
import { useForm,SubmitHandler } from "react-hook-form";
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Input, InputError, LoadingSpinner } from '../../components';
import APIAuth from '../../api/APIAuth';

const Register = () => {

  const [loading,setLoading] = useState<boolean>(false);
  const [alert,setAlert] = useState({
     open:false,
     message:"",
     type:""
  });
  const [showPassword ,setShowPassword] = useState<boolean>(false);
  const { register, formState: { errors }, handleSubmit } = useForm<IRegisterState>();

  const submitHandler = async (responseForm : IRegisterState) => {
      setLoading(true);
      try {
         const { data } = await APIAuth.post(`/register`,responseForm);
 
         if(data && data.statusCode === 200) {
             setLoading(false);
             setAlert({
               open:true,
               message:data.message,
               type:"success"
             });
         }

      } catch(err : any) {
         const { response:{ data } } = err;
         setLoading(false);
         setAlert({
           open:true,
           message:data.message,
           type:"error"
         });
         return err;
      }
  }

    useEffect(()=>{
      document.title = "MyHub | Register";
    },[])

    if(alert.open) {
        return (
           <div className="w-full h-screen flex items-center justify-center">
              <section className="w-[600px] py-5 px-5 xs:w-full xs:h-screen flex flex-col items-center justify-center bg-white shadow-lg shadow-gray-200 rounded-md">
                 {alert.type === "success" ? (
                   <div className='flex flex-col gap-y-3 justify-center items-center'>
                     <AiOutlineCheckCircle className='text-blue-400 text-5xl' />
                     <h4 className='text-xl font-semibold'>{alert?.message}</h4>
                     <Link to="/auth/login" className='mt-5'>
                     <button className="bg-blue-400 rounded-full text-white font-semibold text-sm py-2 px-6">Go Login</button>
                     </Link>
                   </div>
                ) : (
                   <div className='flex flex-col gap-y-3 justify-center items-center'>
                     <h4 className='text-xl font-semibold'>{alert?.message}</h4>
                     <button onClick={()=>setAlert({...alert,open:false})} className="bg-blue-400 rounded-full text-white font-semibold text-sm py-2 px-6">Back</button>
                   </div>
                )}
              </section>
           </div>
        )
    }

  return (
    <div className='w-full h-screen flex items-center justify-center'>
      <section className="w-[600px] xs:w-full xs:h-screen  flex flex-col items-center justify-center bg-white shadow-lg shadow-gray-200 rounded-md py-7">
          {loading ? (
              <div className="flex justify-center items-center">
                 <LoadingSpinner width="30px" height="30px" />
              </div>
          ) : (
             <div className="w-full flex flex-col items-center">
            <AiOutlineSecurityScan className="text-blue-400 text-6xl" />
            <h4 className="text-[20px] text-center font-extrabold uppercase mt-2">Sign Up</h4>
            <form onSubmit={handleSubmit(submitHandler)} className="w-[70%] xs:w-full xs:px-5  mx-auto flex flex-col gap-y-2 mt-5">
                    <div className="form-control flex flex-col gap-y-2">
                      <Input
                        type="text"
                        name="name"
                        placeholder='Username'
                        register={register}
                        error={errors.name ? true : false}
                      />
                      {errors.name && <InputError message="username field is required"/>}
                    </div>
                      <div className="form-control flex flex-col gap-y-2">
                      <Input
                        type="email"
                        name="email"
                        placeholder='Email'
                        register={register}
                        error={errors.email ? true : false}
                      />
                      {errors.email && <InputError message="username field is required"/>}
                    </div>
                     <div className="form-control flex flex-col gap-y-2 w-full relative">
                        <Input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder='Password'
                        register={register}
                        error={errors.password ? true : false}
                        />
                        {errors.password && <InputError message="password field is required"/>}
                       <button type="button" onClick={()=>setShowPassword(!showPassword)} className={`text-lg ${errors.password ? 'text-red-400' : 'text-gray-400'} absolute top-3 right-3 cursor-pointer`}>
                           {showPassword ? (
                               <AiOutlineEyeInvisible  />
                               ) : (
                               <AiOutlineEye/>
                           )}
                        </button>
                     </div>
                       <div className="form-control flex flex-col gap-y-2 w-full relative">
                        <Input
                        type={showPassword ? "text" : "password"}
                        name="confirm"
                        placeholder='Confirm Password'
                        register={register}
                        error={errors.confirm ? true : false}
                        />
                        {errors.confirm && <InputError message="confirm field is required"/>}
                       <button type="button" onClick={()=>setShowPassword(!showPassword)} className={`text-lg ${errors.password ? 'text-red-400' : 'text-gray-400'} absolute top-3 right-3 cursor-pointer`}>
                           {showPassword ? (
                               <AiOutlineEyeInvisible  />
                               ) : (
                               <AiOutlineEye/>
                           )}
                        </button>
                     </div>
                     <button  className="w-full bg-blue-400 mt-4 text-white font-semibold rounded-full text-[15px] py-2">Register</button>
                     <p className="text-center text-gray-400 text-[13px] mt-1">Already have account? <Link to="/auth/login"><span className="text-blue-400 font-semibold">Login</span></Link></p>
                 </form>
             </div>
          )}
      </section>
    </div>
  )
}

export default Register