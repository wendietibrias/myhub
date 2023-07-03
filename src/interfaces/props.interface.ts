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