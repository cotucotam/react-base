import axios from "axios";
import NProgress from "nprogress"
NProgress.configure({
    showSpinner: false,
    trickleSpeed: 100
});
const instance = axios.create({
    baseURL: 'http://localhost:8081/api/',
});

// Add a request interceptor
instance.interceptors.request.use(function (config) {
    NProgress.start();
    // Do something before request is sent
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use(function (response) {
    NProgress.done();
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    // console.log("response: ", response)
    return response && response.data;
}, function (error) {
    // console.log("error: ", error)
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return error && error.response && error.response.data ? error.response.data : Promise.reject(error);
});
export default instance;