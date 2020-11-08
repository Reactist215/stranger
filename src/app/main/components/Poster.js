import React, { useState, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Textarea from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { postActions } from '../../store/actions';
import { messageActionTypes } from '../../configs';

const Poster = () => {
    const form = useRef();
    const checkBtn = useRef();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [location, setLocation] = useState("");
    const [willDeliver, setWillDeliver] = useState(false);
    
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.authorization);
    const { isAddProcessing } = useSelector(state => state.posts);
    const history = useHistory();

    const onChangeTitle = useCallback((e) => {
        const title = e.target.value;
        setTitle(title);
    }, [title]);

    const onChangeDescription = useCallback((e) => {
        const description = e.target.value;
        setDescription(description);
    }, [description]);
    
    const onChangePrice = useCallback((e) => {
        const price = e.target.value;
        setPrice(price);
    }, [price]);

    const onChangeLocation = useCallback((e) => {
        const location = e.target.value;
        setLocation(location);
    }, [location]);

    const onChangeWillDeliver = useCallback((e) => {
        const willDeliver = e.target.checked;
        setWillDeliver(willDeliver);
    }, [willDeliver])

    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        form.current.validateAll();
        if(user) {   
            if (checkBtn.current.context._errors.length === 0) {
                dispatch(postActions.post({
                    title,
                    description,
                    price,
                    location,
                    willDeliver
                }));
                setLocation('');
                setTitle('');
                setPrice('');
                setWillDeliver(false);
                setDescription('');
            }
        } else {
            dispatch({type: messageActionTypes.SET_MESSAGE, payload: {
                message: 'You have to login first.',
                success: true,
                info: true
            }})
            history.push('/signin');
        }
    }, [title, description, price, location, willDeliver, user]);


    return (
        <div className="poster-wrapper container">
            <div className="poster-content">
                <div className="row text-center ml-auto">
                    <h5>
                        Create a New Post
                    </h5>
                </div>
                <div className="row">
                    <Form onSubmit={handleSubmit} ref={form}>
                        <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <Input 
                                id="title"
                                type="text"
                                name="title"
                                className="form-control"
                                value={title}
                                onChange={onChangeTitle}
                                placeholder="title"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <Textarea 
                                id="description"
                                type="text"
                                className="form-control"
                                name="description"
                                value={description}
                                onChange={onChangeDescription}
                                placeholder="description"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="price">Price</label>
                            <Input 
                                id="price"
                                type="text"
                                name="price"
                                className="form-control"
                                value={price}
                                onChange={onChangePrice}
                                placeholder="price"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="location">Location</label>
                            <Input 
                                id="location"
                                type="text"
                                name="location"
                                className="form-control"
                                value={location}
                                onChange={onChangeLocation}
                                placeholder="location"
                            />
                        </div>
                        <div className="form-check">
                            <input
                                type="checkbox" 
                                id="willdeliver"
                                name="willdeliver"
                                className="form-check-input"
                                checked={willDeliver}
                                onChange={onChangeWillDeliver}
                            />
                            <label className="form-check-label" htmlFor ="willdeliver">WillDeliver</label>
                        </div>
                        <div className="form-group">
                            <button className="btn btn-primary btn-block">
                                {isAddProcessing && (
                                    <span className="spinner-border spinner-border-sm"></span>
                                )}
                                Submit
                            </button>
                        </div>
                        <CheckButton style={{ display: "none" }} ref={checkBtn} />
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default Poster;
