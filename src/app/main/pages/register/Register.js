import React, { useState, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import { Link, Redirect } from 'react-router-dom';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import HomeIcon from '@material-ui/icons/Home';
import IconButton from "@material-ui/core/IconButton";
import { authActions } from "../../../store/actions";

const required = (value) => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

const vusername = (value) => {
    if (value.length < 3 || value.length > 20) {
        return (
            <div className="alert alert-danger" role="alert">
                The username must be between 3 and 20 characters.
            </div>
        );
    }
};

const vpassword = (value) => {
    if (value.length < 6 || value.length > 40) {
        return (
            <div className="alert alert-danger" role="alert">
                The password must be between 6 and 40 characters.
            </div>
        );
    }
};

const vmatch = (value, props, components) => {
    if(value !== components['password'][0].value) {
        return (
            <div className="alert alert-danger" role="alert">
                The password doesn't match.
            </div>
        );
    }
}

const Register = () => {
    const form = useRef();
    const checkBtn = useRef();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const { isLoggedIn } = useSelector(state => state.authorization);
    const { isProcessing } = useSelector(state => state.authorization);
    const dispatch = useDispatch();
    const history = useHistory();

    const onChangeUsername = useCallback((e) => {
        const username = e.target.value;
        setUsername(username);
    }, [username]);

    const onChangePassword = useCallback((e) => {
        const password = e.target.value;
        setPassword(password);
    }, [password]);

    const handleRegister = useCallback((e) => {
        e.preventDefault();

        form.current.validateAll();
        if (checkBtn.current.context._errors.length === 0) {
            dispatch(authActions.register(username, password))
        }
    }, [username, password]);

    
    const gotoHomePage = () => {
        return history.push('/');
    }

    if (isLoggedIn) {
        return <Redirect to="/" />
    }

    return (
        <div className="container">
            <div className="card card-container">
                <div className="row">
                    <IconButton aria-label="" onClick={gotoHomePage}>
                        <HomeIcon />
                    </IconButton>
                </div>
                <img
                    src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                    alt="profile-img"
                    className="profile-img-card"
                />
                <Form onSubmit={handleRegister} ref={form}>
                    <div>
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <Input
                                type="text"
                                className="form-control"
                                name="username"
                                value={username}
                                onChange={onChangeUsername}
                                validations={[required, vusername]}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <Input
                                type="password"
                                className="form-control"
                                name="password"
                                value={password}
                                onChange={onChangePassword}
                                validations={[required, vpassword]}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Confirm Password</label>
                            <Input
                                type="password"
                                className="form-control"
                                name="password-confirm"
                                validations={[required, vmatch]}
                            />
                        </div>

                        <div className="form-group">
                            <button className="btn btn-primary btn-block" disabled={isProcessing}>
                                {isProcessing && (
                                    <span className="spinner-border spinner-border-sm"></span>
                                )}
                                Sign Up
                            </button>
                        </div>
                        <div className="form-group text-center">
                            Already registered? <Link to={'/signin'}>Signin</Link>
                        </div>

                    </div>
                    <CheckButton style={{ display: "none" }} ref={checkBtn} />
                </Form>
            </div>
        </div>
    );
};

export default Register;