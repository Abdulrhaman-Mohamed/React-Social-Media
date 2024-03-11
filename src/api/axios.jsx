import axios from 'axios'


export const api = axios.create({
    baseURL: 'https://react-backend-socialmedia.onrender.com/'
})

export const getPostsPage = async (pageParam = 1, options = {}) => {
    console.log(options);
    const response = await api.get(`/post?page=${pageParam}`, options)
    return response.data
}

export const api_v2= axios.create({
    baseURL:"https://react-backend-socialmedia.onrender.com/users/"
})