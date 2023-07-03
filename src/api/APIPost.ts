import axios from "axios";

const APIPost = axios.create({
    baseURL:`${process.env.REACT_APP_BASE_API_URL}/post`
});

export default APIPost;