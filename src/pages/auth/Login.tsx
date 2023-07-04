import { ChangeEvent, useEffect, useRef, useState } from "react";
import { AiOutlineSecurityScan,AiOutlineEye,AiOutlineEyeInvisible } from 'react-icons/ai';
import { ILoginState,IErrorState } from "../../interfaces/login.interface";
import { useForm } from "react-hook-form";
import { Link,Navigate,useNavigate } from "react-router-dom";
import { Input,InputError, LoadingSpinner } from "../../components";
import { VscError } from "react-icons/vsc";
import { useAppDispatch } from "../../hooks/redux.hook";
import APIAuth from "../../api/APIAuth";
import { setToken } from "../../store/user.store";

const Login = () => {
    const { register, formState: { errors }, handleSubmit,getValues } = useForm<ILoginState>();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
   
    const [loading,setLoading] = useState<boolean>(false);
    const [error,setError] = useState<IErrorState>({
        message:"",
        open:false
    });
    const [showPassword,setShowPassword] = useState<boolean>(false);
 
    const submitData = async (data : any) => {
        const { email,password,remember } = data;

        setLoading(true);

        if(remember) {
            localStorage.setItem("email" , JSON.stringify(email));
        }

        if(!remember) {
            localStorage.removeItem("email");
        }

        try {
            const { data } = await APIAuth.post(`/login`, { email,password });
            if(data && data.statusCode === 200) {  
                const { access_token } = data.data;
                setLoading(false);
                setError({
                    ...error,
                    open:false
                });
               dispatch(setToken(access_token));
               navigate("/");
            }

        } catch(err : any) {
            setLoading(false);
            const { response:{ data } } = err;
            setError({
                open:true,
                message:data.message
            });
        }
    }

    useEffect(()=>{
        document.title = "MyHub | Login";
    },[]);

   

    if(error.open) {
      return (
          <div className="w-full h-screen flex items-center justify-center">
             <section className="w-[600px] xs:w-full  xs:h-screen flex flex-col justify-center bg-white shadow-lg shadow-gray-200 rounded-md py-7">
                 <div className="w-full flex flex-col justify-center items-center gap-y-4">
                    <VscError className="text-5xl text-blue-400" />
                    <h2 className="text-2xl font-semibold">{error.message || "Error"}</h2>
                    <button onClick={()=>setError({...error,open:false,message:""})} className="bg-blue-400 text-[14px] text-white py-[6px] px-6 font-semibold rounded-full">Back</button>
                 </div>
             </section>
        </div>
      )
    }

    return (
        <div className="w-full h-screen flex items-center justify-center">
            <section className="w-[600px] xs:w-full xs:h-screen flex flex-col justify-center bg-white shadow-lg shadow-gray-200 rounded-md py-7">
                {loading ? (
                     <div className="w-full flex flex-col items-center justify-center">
                         <LoadingSpinner width="35px" height="35px" />
                         <p className="text-center font-semibold text-blue-400 text-md mt-3">Redirecting</p>
                     </div>
                ) : (
                    <div className="w-full flex flex-col items-center justify-center">
                    <AiOutlineSecurityScan className="text-blue-400 text-7xl" />
                    <h4 className="text-[20px] text-center font-extrabold uppercase mt-2">Sign In</h4>
                    <form onSubmit={handleSubmit(submitData)} className="w-[70%] xs:w-full xs:px-5  mx-auto flex flex-col gap-y-2 mt-5">
                        <div className="form-control flex flex-col gap-y-2">
                        <Input
                            type="email"
                            name="email"
                            placeholder="Email"
                            error={errors.email ? true : false}
                            register={register}
                        />
                        {errors.email && <InputError message="email field required"/>}
                        </div>

                        <div className="w-full relative flex flex-col gap-y-2">
                            <Input
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            placeholder="Password"
                            error={errors.password ? true : false}
                            register={register}
                        />
                        {errors.password && <InputError message={"password field required"} />}
                            <button type="button" onClick={()=>setShowPassword(!showPassword)} className={`text-lg ${errors.password ? 'text-red-400' : 'text-gray-400'} absolute top-3 right-3 cursor-pointer`}>
                            {showPassword ? (
                                <AiOutlineEyeInvisible  />
                                ) : (
                                <AiOutlineEye/>
                            )}
                            </button>
                        </div>
                        <div className="flex items-center justify-between">
                        <div className="relative mt-[10px] flex items-center gap-x-2">
                            <input {...register("remember")} checked={getValues('remember')} type="checkbox" name="remember"/>
                            <p className="text-[13px] text-gray-400 font-medium">Remember me?</p>
                        </div>
                        {/* <p className="text-blue-400 font-medium text-[13px]">Forgot Password?</p> */}
                        </div>
                        <button  className="w-full bg-blue-400 mt-4 text-white font-semibold rounded-full text-[15px] py-2">Login</button>
                        <p className="text-center text-gray-400 text-[13px] mt-1">Don't have account? <Link to="/auth/register"><span className="text-blue-400 font-semibold">Register</span></Link></p>
                    </form>
                    </div>
                )}
            </section>
        </div>
    )
}

export default Login;