import APIFollow from "../api/APIFollow"
import { useAppSelector } from "../hooks/redux.hook"
import { IFollowBoxProps } from "../interfaces/props.interface"


const FollowBox = ({
   type ,
   datas,
   fetchData
} : IFollowBoxProps) => {
  const { auth:{ token } } = useAppSelector(state=>state);

  const unfollowHandler = async (id : number) => {
     try {
       const { data } = await APIFollow.delete(`/unfollow/${id}`, {
          headers: {
             Authorization:`Bearer ${token}`
          }
       });
       if(data && data.statusCode === 200) {
          fetchData();
       }
     } catch(err) {
       return err;
     }
  }
 
  return (
    <div className="w-full  bg-white shadow-lg shadow-gray-200 rounded-lg py-3 px-3">
         <h2 className="text-md capitalize font-bold">{type}</h2>
         <div className="mt-3">
           {datas.length === 0 ? (
             <p className="text-[13px] text-gray-500 text-center">Follow Other People</p>
           ) : (
              <div className="w-full flex flex-col gap-y-3">
                 {datas.slice(0,4).map((data : any , idx : number) => (
                   <div className="flex items-center justify-between" key={idx}>
                     <div className="flex items-center gap-x-3">
                     <img src={`${process.env.REACT_APP_BASE_IMAGE_URL}/avatar/${data.avatar}`} alt={data.name} className="w-[40px] h-[40px] rounded-full"/>
                     <div>
                       <h5 className="text-[15px] font-semibold">{data?.name}</h5>
                       <p className="text-[13px] text-gray-500 w-[160px] text-ellipsis whitespace-nowrap overflow-hidden">{data?.bio}</p>
                     </div>
                     </div>
                     {type === "following" && <button onClick={()=>unfollowHandler(data?.id)} className="py-1 px-2 rounded-full border-blue-400 border-2 text-blue-400 text-[12px] font-semibold">Unfollow</button> }
                   </div>
                 ))}
              </div>
           )}
         </div>
    </div>
  )
}

export default FollowBox