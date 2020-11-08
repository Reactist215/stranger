import axios from "axios";
import { API_URL } from '../configs'
import { makeheaders } from '../helpers/util';

const getAllPosts = () => {
    return new Promise((resolve, reject) => {
        axios.get(API_URL + '/posts', {
            headers: makeheaders()
        })
        .then(response => {
            const { data } = response.data;
            resolve(data);
        })
        .catch(error => {
            const { data } = error.response;
            reject(data.error)
        })
    })
}

const post = (data) => {
    return new Promise((resolve, reject) => {
        axios.post(API_URL + '/posts', 
            { post: data },
            { headers: makeheaders()}
        )
        .then(response => {
            const { data } = response.data;
            resolve(data);
        })
        .catch(error => {
            const { data } = error.response;
            reject(data.error)
        })
    })
}

const deletePost = (id) => {
    return new Promise((resolve, reject) => {
        axios.delete(API_URL + '/posts/' + id, 
            { headers: makeheaders()}
        )
        .then(response => {
            const { data } = response.data;
            resolve(data);
        })
        .catch(error => {
            const { data } = error.response;
            reject(data.error)
        })
    });
}

const sendMessage = (id, message) => {
    return new Promise((resolve, reject) => {
        axios.post(API_URL + '/posts/' + id + '/messages', 
            {
                message: {
                    content: message
                }
            },
            { headers: makeheaders()}
        )
        .then(response => {
            const { data } = response.data;
            resolve(data);
        })
        .catch(error => {
            const { data } = error.response;
            reject(data.error)
        })
    });
}

export const PostService = {
    getAllPosts,
    post,
    deletePost,
    sendMessage
}