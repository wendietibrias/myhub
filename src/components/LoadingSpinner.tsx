import ReactLoading from "react-loading";

interface ILoadingProps {
    width:string;
    height:string;
}

const LoadingSpinner = ({
    width,
    height
} : ILoadingProps) => {
    return (
        <ReactLoading
            type={"spin"}
            width={width}
            height={height}
            color={"#60a5fa"}
         />
    )
}

export default LoadingSpinner;