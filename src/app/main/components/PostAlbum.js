import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PostCard } from '../components';
import { makeStyles } from "@material-ui/core/styles";
import { postActions } from '../../store/actions';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import SearchIcon from '@material-ui/icons/Search';
import { Paper, TextField } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '95%',
        marginBottom: '20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        color: 'Black',
        paddingLeft: "1em",
        paddingRight: "1em",
        position: 'relative',
        marginTop: '2em'
    },
    search : {
        paddingLeft: '.8rem',
        paddingRight: '.8rem',
        paddingTop: '.6rem',
        paddingBottom: '.6rem',
        '& .input-wrapper' : {
            borderRadius: "2.4rem",
            display: 'flex',
            width: '300px',
            color: 'rgba(0, 0, 0, 0.97)',
            transition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
            backgroundColor: '#FFFFFF',
            position: 'relative',
            '& .img-btn' : {
                fontSize: '1.4em',
                paddingRight: '',
                marginRight: '0.6em',
                marginTop: '0.3em'
            }
        }
    }
}));

const PostAlbum = () => {
    const classes = useStyles();
    const { posts } = useSelector(state => state.posts);
    const [searchKey, setSearchKey] = useState('');
    const [filteredPosts, setFilteredPosts] = useState([]);

    const dispatch = useDispatch();
    const handleChange = useCallback((e) => {
        const searchKey = e.target.value;
        setSearchKey(searchKey);
    }, []);
    
    const postMatches = useCallback((post, searchKey) => {
        return post.title.toLowerCase().includes(searchKey) ||
        post.description.toLowerCase().includes(searchKey)
    }, []);
    
    useEffect(() => {
        dispatch(postActions.getAllPosts());
    }, [])

    useEffect(() => {
        setFilteredPosts(posts.filter(post => postMatches(post, searchKey)));
    }, [posts, searchKey])

    return (
        <Container className={classes.root}>
            <form className={classes.search}>
                <Paper className="input-wrapper" elevation={3}>
                    <TextField 
                        autoFocus={false}
                        name="search"
                        className="flex-1"
                        InputProps={{
                            disableUnderline: true,
                            classes : {
                                root : "flex flex-grow flex-no-shrink ml-16 mr-28 my-8 text-9",
                                input: ""
                            },
                            placeholder     : "Search posts..."
                        }}
                        InputLabelProps={{
                            shrink   : false,
                            className: classes.bootstrapFormLabel
                        }}
                        value={searchKey}
                        onChange={handleChange}
                    />
                    <SearchIcon className="img-btn"/>
                </Paper>
            </form>
            <Grid container>
                {
                    filteredPosts &&
                    filteredPosts.map(post => {
                        return (
                            <PostCard key={post._id} {...post}/>
                        )
                    })
                }
            </Grid>
        </Container>
    )
}

export default PostAlbum;