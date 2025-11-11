import axios from "axios";

const axiosInstance = axios.create({
    baseURL: `https://echoverse-server-1.onrender.com`
    // baseURL: `https://echoverseserver.vercel.app`
})

const useAxios = () => {
    return axiosInstance;
};

export default useAxios;