import { postActionTypes } from '../../configs';

const initialState = {
    isProcessing: false,
    posts: []
};

const posts = (state = initialState, action) => {
    const { type, payload } = action;
    switch(type) {
        case postActionTypes.FETCH_POSTS_REQUEST:
        case postActionTypes.DELETE_POST_REQUEST:
        case postActionTypes.SEND_MESSAGE_REQUEST:{
            console.log('delete post request', state)
            return {
                ...state,
                isProcessing: true
            }
        }
        case postActionTypes.ADD_POST_REQUEST:
            return {
                ...state,
                isAddProcessing: true
            }
        case postActionTypes.FETCH_POSTS_SUCCESS:
            return {
                ...state,
                isProcessing: false,
                posts: payload
            }
        case postActionTypes.ADD_POST_SUCCESS:
            return {
                ...state,
                isAddProcessing: false,
                posts: [
                    ...state.posts,
                    payload
                ]
            }
        case postActionTypes.ADD_POST_FAILURE:
            return {
                ...state,
                isAddProcessing: false,
            }
        case postActionTypes.DELETE_POST_SUCCESS:
            const index = state.posts.findIndex(post => post._id === payload);
            const newPosts = [
                ...state.posts.slice(0, index), 
                ...state.posts.slice(index + 1)
            ]
            return {
                ...state,
                isProcessing: false,
                posts: newPosts
            }
        case postActionTypes.SEND_MESSAGE_SUCCESS:
            state.posts[state.posts.findIndex(post => post._id === payload.id)].messages.push(payload.message); 
            return {
                ...state,
                isProcessing: false,
                posts: state.posts
            }
        case postActionTypes.FETCH_POSTS_FAILURE:
        case postActionTypes.DELETE_POST_FAILURE:
            return {
                ...state,
                isProcessing: false,
            }
        default:
            return state;
    }
}

export default posts;