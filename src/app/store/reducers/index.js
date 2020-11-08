import { combineReducers } from 'redux';
import authorization from './auth.reducer';
import message from './message.reducer';
import posts from './post.reducer';

const rootReducer = combineReducers({
    authorization,
    message,
    posts
})

export default rootReducer;