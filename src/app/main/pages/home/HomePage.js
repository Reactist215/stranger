import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Grid } from '@material-ui/core';
import Layout from '../../../layout/Layout';
import { Poster, PostAlbum } from '../../components'

const useStyles = makeStyles(() => ({
    root: {
        minHeight: `calc(100vh - 125px)`,
        margin: '90px 0 0',
        maxWidth: '100%'
    }
}));

const HomePage = () => {
    const classes = useStyles();
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