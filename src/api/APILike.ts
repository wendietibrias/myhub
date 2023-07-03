import axios from 'axios';

const APILike = axios.create({
    baseURL:`${process.env.REACT_APP_BASE_API_URL}/like`
});

export default APILike;