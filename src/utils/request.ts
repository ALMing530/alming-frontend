import axios from 'axios'
import {AxiosInstance} from 'axios'
const instance:  AxiosInstance= axios.create({
    baseURL:'http://localhost:53000'
})
export const get=instance.get
export const post=instance.post
export  default instance
