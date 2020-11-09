import { authActionTypes } from '../../configs';

const initialState = { 
    isLoggedIn: false, 
    user: null, 
    isProcessing: false 
};

/**
 * 
 * @param {*} state 
 * @param {*} action 
 * This is the part where the disptched auth action is handled to change the redux store, 
 * leading to rerender the related components.
 */
const authorization = (state = initialState, action) => {
    const { type, payload } = action;
    switch(type) {
        case authActionTypes.LOGIN_REQUEST: 
        case authActionTypes.REGISTER_REQUEST:
            return {
                ...state,
                isProcessing: true
            }
        case authActionTypes.REGISTER_SUCCESS: 
        case authActionTypes.LOGIN_SUCCESS: 
            return {
                ...state,
                isProcessing: false,
                isLoggedIn: true,
                user: payload
            }
        case authActionTypes.REGISTER_FAILURE: 
        case authActionTypes.LOGIN_FAILURE:
        case authActionTypes.LOGOUT:
            return {
                ...state,
                isProcessing: false,
                isLoggedIn: false,
                user: null
            } 
        default: 
            return state;
    }
}

export default authorization;