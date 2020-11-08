/**
 * 
 * @param {token} token - which sets the token in localStorage 
 */
export const setToken = (token) => {
    localStorage.setItem('access_token', token); 
};

/**
 * - which clears the token in localStorage
 */
export const removeToken = () => {
    localStorage.removeItem('access_token'); 
}

/**
 * to retrieve the token stored in localstorage
 */
export const getToken = () => {
    return localStorage.getItem('access_token');
};
/**
 * to set the header authorization token for the axios
 */
export const makeheaders = () => {
    const token = getToken();
    if (token) {
        return { 'Authorization': 'Bearer ' + token };
    } else {
        return {};
    }
}