import { postActionTypes, messageActionTypes } from '../../configs';
import { PostService } from '../../services';

const getAllPosts = () => (dispatch) => {
    dispatch({type: postActionTypes.FETCH_POSTS_REQUEST});
    return PostService.getAllPosts()
    .then(response => {
        dispatch({
            type: postActionTypes.FETCH_POSTS_SUCCESS,
            payload: response.posts
        });
        // dispatch({
        //     type: messageActionTypes.SET_MESSAGE,
        //     payload : {
        //         message: "All posts successfully fetched",
        //         success: true
        //     }
        // });

    })
    .catch(error => {
        dispatch({
            type: postActionTypes.FETCH_FAIL,
            payload: error.message
        });
        dispatch({
            type: messageActionTypes.SET_MESSAGE,
            payload : {
                message: error.message,
                success: false
            }
        });
    })
}

const post = (postData) => (dispatch) => {
    dispatch({type: postActionTypes.ADD_POST_REQUEST});
    return PostService.post(postData)
    .then(response => {
        dispatch({
            type: postActionTypes.ADD_POST_SUCCESS,
            payload: response.post
        });
        dispatch({
            type: messageActionTypes.SET_MESSAGE,
            payload : {
                message: "Post successfully added",
                success: true
            }
        });
    })
    .catch(error => {
        dispatch({
            type: postActionTypes.ADD_POST_FAILURE,
            payload: error.message
        })
        dispatch({
            type: messageActionTypes.SET_MESSAGE,
            payload : {
                message: error.message,
                success: false
            }
        })
    })
}

const deletePost = (id) => (dispatch) => {
    dispatch({type: postActionTypes.DELETE_POST_REQUEST});
    return PostService.deletePost(id)
    .then(response => {
        dispatch({
            type: postActionTypes.DELETE_POST_SUCCESS,
            payload: id
        });
        dispatch({
            type: messageActionTypes.SET_MESSAGE,
            payload : {
                message: "Successfully deleted",
                success: true
            }
        });
    })
    .catch(error => {
        dispatch({
            type: postActionTypes.DELETE_POST_FAILURE,
            payload: error.message
        })
        dispatch({
            type: messageActionTypes.SET_MESSAGE,
            payload : {
                message: error.message,
                success: false
            }
        })
    })
}

const sendMessage = (id, message) => (dispatch) => {
    dispatch({type: postActionTypes.SEND_MESSAGE_REQUEST});
    return PostService.sendMessage(id, message)
    .then(response => {
        dispatch({
            type: postActionTypes.SEND_MESSAGE_SUCCESS,
            payload: {
                id: id,
                message: response.message
            }
        })
        dispatch({
            type: messageActionTypes.SET_MESSAGE,
            payload: {
                message: 'Successfully message sent',
                success: true
            }
        })
    })
    .catch(error => {
        dispatch({
            type: postActionTypes.SEND_MESSAGE_FAILURE,
        })
        dispatch({
            type: messageActionTypes.SET_MESSAGE,
            payload: {
                message: error.message,
                success: false
            }
        })
    })
}

export const postActions = {
    getAllPosts,
    post,
    deletePost,
    sendMessage
}