import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useToasts } from 'react-toast-notifications'
import { messageActionTypes } from '../../configs';

const Toaster = ({children}) => {

    const { addToast } = useToasts();
    const dispatch = useDispatch();

    const { message, success, info } = useSelector(state => state.message);
    useEffect(() => {
        if(!message) {
            return;
        }
        addToast(message, {
            appearance: info ? 'warning' : (success ? 'success' : 'error'),
            autoDismiss: true
        })
        const timeId = setTimeout(() => dispatch({type: messageActionTypes.CLEAR_MESSAGE}), 5000)
        return () => {
            clearTimeout(timeId);
        }
    }, [message]);
    
    return (
        <>
            {children}
        </>
    )
}

export default Toaster;