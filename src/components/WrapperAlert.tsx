import { useAppSelector,useAppDispatch } from '../hooks/redux.hook';
import { MdErrorOutline } from 'react-icons/md';
import { BsCheck2Circle } from 'react-icons/bs';
import { IoIosClose } from 'react-icons/io';
import { closeWrapperAlert } from '../store/wrapperAlert.store';

const WrapperAlert = () => {
    const dispatch = useAppDispatch();
    const { message,type } = useAppSelector(state=>state.wrapperAlert);
    return (
        <div className={`absolute -top-3 left-[50%]  shadow-md shadow-gray-300 translate-x-[-50%] flex items-center gap-x-7 py-2 px-2 z-[999]  ${type === 'error' ? 'text-red-500' : 'text-green-500'} ${type === 'error' ? 'border-t-2 border-red-500' : 'border-t-2 border-green-500'} bg-white`}>
          <div className="flex items-center gap-x-2 text-xl">
             {type === 'error' ? (
                 <MdErrorOutline/>
             ) : (
                 <BsCheck2Circle/>
             )}
             <h5 className='text-[13px] font-semibold'>{message}</h5>
          </div>
          <button onClick={() => dispatch(closeWrapperAlert())} className="font-bold text-[22px]"><IoIosClose/></button>
        </div>
    )
}

export default WrapperAlert;