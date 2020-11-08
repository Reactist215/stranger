import axios from "axios";
import { API_URL } from '../configs'
import { makeheaders } from '../helpers/util';

/**
 * This function gets all the data from the server. 
 * If the token exists, the posts done by the active user will include the messages he received.
 */
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

/**
 * 
 * @param {post data} data 
 * to create a new post.
 */
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

/**
 * 
 * @param {deleted post id} id 
 * to delete the selected post
 */
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

/**
 * 
 * @param {postId} id 
 * @param {message being sent} message 
 * to send the message to the post author
 */
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