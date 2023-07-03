import axios from "axios";

const APIComment = axios.create({
    baseURL:`${process.env.REACT_APP_BASE_API_URL}/comment`
});

export default APIComment;