import { IPostResponse } from "./home.interface";
import { IUserResponseState } from "./global.interface";

export interface IProfileUserProps {
   userData: {
      id:string | number;
      name:string;
      email:string;
      password:string;
      createdAt:string;
      profile: {
         location:string;
         website:string;
         birthday:string;
         profession:string;
         phone:string;
      } | any;
      followers:any;
      following:any;
   };
   fetchUser:any;
}

export interface IFollowBoxProps {
   type : string;
   datas : any;
   fetchData:() => void | any;
}

export interface IEmojiProps {
   emojiClick:(args : any) => void
}

export interface IInputProps {
    error:boolean;
    name : string;
    type : string;
    placeholder : string;
    register : any;
}

export interface IPostCardProps {
    post : IPostResponse;
    fetchPosts:() => void;
}
export interface UpdateProfileProps {
  userData : IUserResponseState;
  fetchUser: () => void
}