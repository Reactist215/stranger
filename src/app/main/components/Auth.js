import React from 'react';
import { useDispatch } from "react-redux";
import { authActions } from "../../store/actions";
import { getToken } from '../../helpers/util';
/**
 * 
 * @param {*} param0 
 * This component gets the user info from token when refresing the page.
 */
const Auth = ({children}) => {

    const dispatch = useDispatch();
    /**
     * If there is a token stored in localstorage, it will fetch its user from the server.
     */
    if(getToken()) {
        dispatch(authActions.isLoggedIn());
    }
    
    return (
        <>
            {children}
        </>
    )
}

export default Auth;