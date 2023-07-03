interface IInputErrorProps {
    message:string;
}

const InputError = ({ message } : IInputErrorProps) => {
    return <p className="text-red-400 font-medium text-[13px]">{message}</p>
}

export default InputError;