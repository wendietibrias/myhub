export interface IProfileBoxState {
    name:string;
    email:string;
    profile: {
        avatar:string;
        location:string;
        profession:string;
        phone:string;
        website:string;
    } | any
}

export interface IUpdatePostModalState {
     title : string;
     postImage : string;
     
}

export interface IUserResponseState {
    id:string | number;
    name : string;
    email : string;
    profile : {
        location:string;
        website:string;
        phone:string;
        birthday:string;
        profession:string;
        address:string;
    } | any
}