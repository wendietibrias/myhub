import axios from "axios";

const APIProfile = axios.create({
    baseURL:`${process.env.REACT_APP_BASE_API_URL}/profile`
});

export default APIProfile;