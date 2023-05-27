import axios from 'axios';
// Users can modify according to their own background system
export const HttpResponse = {
    status: Number,
    msg: String,
    code: Number,
    data: Object
}

axios.interceptors.request.use(
    (config) => {
        // Configure the request here
        return config;
    },
    (error) => {
        // What to do with request errors
        return Promise.reject(error);
    }
);
// Add response interceptor
axios.interceptors.response.use(
    (response) => {
        const res = response.data;
        // if the custom code is not 20000, it is judged as an error.
        if (res.code !== 20000) {
            // remind users

            // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
            if (
                [50008, 50012, 50014].includes(res.code)
            ) {
                // do something
            }
            return Promise.reject(new Error(res.msg || 'Error'));
        }
        return res;
    },
    (error) => {
        return Promise.reject(error);
    }
);