export interface ILoginState {
    email : string;
    password : string;
    remember : boolean;
}

export interface IErrorState {
    message : string;
    open : boolean;
}