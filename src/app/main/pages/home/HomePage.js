import React, { useEffect } from 'react';
import { Poster, PostAlbum } from '../../components'
import { useDispatch, useSelector } from "react-redux";
import Layout from '../../../layout/Layout';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { useToasts } from 'react-toast-notifications'
import { messageActionTypes } from '../../../configs';

const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: `calc(100vh - 125px)`,
        margin: '90px 10px 0',
        maxWidth: '100%'
    }
}));


const HomePage = () => {
    const classes = useStyles();
    const { addToast } = useToasts();
    const dispatch = useDispatch();

    const { message, success } = useSelector(state => state.message);
    useEffect(() => {
        if(!message) {
            return;
        }
        addToast(message, {
            appearance: success ? 'success' : 'error',
            autoDismiss: true
        })
        const timeId = setTimeout(() => dispatch({type: messageActionTypes.CLEAR_MESSAGE}), 5000)
        return () => {
            clearTimeout(timeId);
        }
    }, [message])
    return (
        <Layout>
            <Container className={classes.root}>
                <Grid
                    container
                    spacing={3}
                >
                    <Grid container item md={9} spacing={3}>
                        <PostAlbum />
                    </Grid>
                    <Grid container item md={3} spacing={3} className="flex flex-column">
                        <Poster />
                    </Grid>
                </Grid>
            </Container>
        </Layout>
    )
}

export default HomePage;