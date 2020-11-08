import axios from "axios";
import { API_URL } from '../configs'
import { setToken, removeToken, makeheaders } from '../helpers/util';

/**
 * 
 * @param {username} username 
 * @param {password} password 
 * to control the register
 */
const register = (username, password) => {
    return  new Promise((resolve, reject) => {
        axios.post(API_URL + "/users/register", {
            user: {
                username,
                password
            }
        }).then(response => {
            const { data } = response.data; 
            setToken(data.token);
            resolve(data);
        })
        .catch(error => {
            const { data } = error.response;
            reject(data.error)
        })
    });
};

/**
 * 
 * @param {username} username 
 * @param {password} password 
 * to control the login
 */
const login = (username, password) => {
    return  new Promise((resolve, reject) => {
        axios.post(API_URL + "/users/login", {
            user: {
                username,
                password
            }
        })
        .then((response) => {
            const { data } = response.data;
            setToken(data.token);
            resolve(data);
        })
        .catch(error => {
            const { data } = error.response;
            reject(data.error);
        })
    });
};

/**
 * which lets the app know if there's a user logged in now by checking the token stored in localstorage
 */
const isLoggedIn = () => {
    return new Promise((resolve, reject) => {
        axios.get(API_URL + '/test/me', {
            headers: makeheaders()
        })
        .then(response => {
            const { data } = response.data;
            resolve(data);
        })
        .catch(error => {
            const { data } = error.response;
            reject(data.error);
        })
    }) 
};

/**
 * log out
 */
const logout = () => {
    removeToken();
};

export const AuthService = {
    register,
    login,
    logout,
    isLoggedIn
};