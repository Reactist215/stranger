import { authActionTypes, messageActionTypes } from '../../configs';
import { AuthService } from '../../services';

const login = (username, password) => (dispatch) => {
    dispatch({type: authActionTypes.LOGIN_REQUEST});
    return AuthService.login(username, password)
    .then(response => {
        dispatch({
            type: authActionTypes.LOGIN_SUCCESS, 
            payload: username
        });
        dispatch({
            type: messageActionTypes.SET_MESSAGE, 
            payload : {
                message: response.message,
                success: true
            }
        });
    })
    .catch(error => {
        dispatch({
            type: authActionTypes.LOGIN_FAILURE, 
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

const register = (username, password) => (dispatch) => {
    dispatch({type: authActionTypes.REGISTER_REQUEST});
    return AuthService.register(username, password)
    .then(response => {
        dispatch({
            type: authActionTypes.REGISTER_SUCCESS, 
            payload: username
        });
        dispatch({
            type: messageActionTypes.SET_MESSAGE, 
            payload : {
                message: response.message,
                success: true
            }
        });
    })
    .catch(error => {
        dispatch({
            type: authActionTypes.REGISTER_FAILURE, 
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

const isLoggedIn = () => (dispatch) => {
    dispatch({type: authActionTypes.LOGIN_REQUEST});
    return AuthService.isLoggedIn()
    .then(response => {
        dispatch({
            type: authActionTypes.LOGIN_SUCCESS,
            payload: response.user.username
        });
        dispatch({
            type: messageActionTypes.SET_MESSAGE, 
            payload : {
                message: response.message,
                success: true
            }
        });
    })
    .catch(error => {
        dispatch(authActions.logout());
        dispatch({
            type: messageActionTypes.SET_MESSAGE, 
            payload : {
                message: error.message,
                success: false
            }
        });
    })
    
}

const logout = () => (dispatch) => {
    AuthService.logout();
    dispatch({type: authActionTypes.LOGOUT});
    dispatch({
        type: messageActionTypes.SET_MESSAGE, 
        payload : {
            message: 'You logged out!',
            success: true
        }
    });
}

export const authActions = {
    register,
    login,
    logout,
    isLoggedIn
}