import axios from 'axios';

const APIUser = axios.create({
    baseURL:`${process.env.REACT_APP_BASE_API_URL}/user`
});

export default APIUser;