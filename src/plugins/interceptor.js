import axios from 'axios'
import router from "@/router";

const request = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
})
request.interceptors.request.use(function (config) {
    return config
}, function (err) {
    return Promise.reject(err)
})

request.interceptors.response.use(async response => {
        return response.data
    }, async error => {
        if (error.response.status === 404) {
            await router.push({name: 'PageNotFound'})
        }
        return Promise.reject(error)
    }
)

export default request
