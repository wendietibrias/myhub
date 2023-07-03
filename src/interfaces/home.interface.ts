export interface IPostFormState {
    title : string;
    postImage : any;
}

export interface IPostResponse {
    id : number | string;
    title : string;
    postImage : string;
    likes : any[];
    comments : any[];
    user : any;
    createdAt : string;
}