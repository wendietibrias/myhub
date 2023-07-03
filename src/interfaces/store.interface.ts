
export interface IUserStore {
    user : {
        id:number | string 
    } | any;
    token : string | any 
}

export interface IWrapperAlertStore {
    type:string;
    open:boolean;
    message:string 
}

export interface IUpdateProfileModalStore {
    open:boolean;
    userId:string;
}

export interface IUpdatePostModalStore {
    open:boolean;
    postId:string;
}