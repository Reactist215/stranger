import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/actions";
import { getToken } from '../../helpers/util';

const Auth = ({children}) => {
    const dispatch = useDispatch();
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