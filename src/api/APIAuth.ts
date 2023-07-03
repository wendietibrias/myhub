import axios from "axios";

const APIAuth = axios.create({
    baseURL:`${process.env.REACT_APP_BASE_API_URL}/auth`
});

export default APIAuth;