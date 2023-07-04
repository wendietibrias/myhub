import { IInputProps } from '../interfaces/props.interface';

const Input = ({
   error,
   type,
   name,
   placeholder,
   register
} : IInputProps) => {
    const email = JSON.parse(localStorage.getItem("email") || "null");

    return (
        <input {...register(name,{ required:true })} defaultValue={type === "email" ? email : ""} placeholder={placeholder} type={type} name={name} className={`w-full ${error ? 'border-2' : 'border'} ${error ? 'border-red-300' : 'border-gray-200'} outline-none ring-0 focus:ring-1 focus:ring-blue-400 focus:shadow-blue-100 bg-gray-100  text-sm  py-[11px] px-2 rounded-sm`}/>
    )
}

export default Input;