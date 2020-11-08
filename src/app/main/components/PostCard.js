import React, { useState, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { postActions } from '../../store/actions';
import { makeStyles } from "@material-ui/core/styles";
import { 
    Tooltip, 
    Card, 
    CardHeader, 
    CardContent, 
    Avatar, 
    IconButton, 
    Typography, 
    Paper, 
    Slide, 
    Button, 
    TextField, 
    Grid, 
    Dialog, 
    DialogTitle, 
    DialogActions, 
    DialogContent, 
    DialogContentText 
} from '@material-ui/core';
import { red } from "@material-ui/core/colors";
import LocationOnIcon from '@material-ui/icons/LocationOn';
import MoneyIcon from '@material-ui/icons/Money';
import DeleteIcon from '@material-ui/icons/Delete';
import FlightTakeoffIcon from '@material-ui/icons/FlightTakeoff';
import DescriptionIcon from '@material-ui/icons/Description';
import MessageIcon from '@material-ui/icons/Message';
import SendIcon from '@material-ui/icons/Send';
import RecordVoiceOverIcon from '@material-ui/icons/RecordVoiceOver';
import { months, messageActionTypes} from '../../configs';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

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
    media: {
        height: 0,
        paddingTop: "56.25%" // 16:9
    },
    expand: {
        transform: "rotate(0deg)",
        marginLeft: "auto",
        transition: theme.transitions.create("transform", {
            duration: theme.transitions.duration.shortest
        })
    },
    expandOpen: {
         transform: "rotate(180deg)"
    },
    avatar: {
        backgroundColor: red[500],
    },
    action: {
        outline: 'none'
    },
    message : {
        paddingLeft: '.8rem',
        paddingRight: '.8rem',
        paddingTop: '.6rem',
        paddingBottom: '.6rem',
        '& .input-wrapper' : {
            borderRadius: "2.4rem",
            display: 'flex',
            color: 'rgba(0, 0, 0, 0.97)',
            transition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
            backgroundColor: '#FFFFFF',
            position: 'relative',
            '& .icon-btn' : {
                position: 'absolute',
                top: '0',
                right: '0',
                padding: '8px',
                fontSize: '1.6em',
                '& .img-btn' : {
                    fontSize: '0.8em',
                    paddingRight: ''
                }
            }
        }
    }
}));

const PostCard = ({
    _id,
    title, 
    description,
    author, 
    messages, 
    price,
    isAuthor,
    location,
    willDeliver,
    createdAt
}) => {

    const dispatch = useDispatch();
    const { user } = useSelector(state => state.authorization);
    const history = useHistory();
    
    //dialog control 
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    
    const  handleClose  = () => {
        setOpen(false);
    };

    const classes = useStyles();
    
    /**
     * to get a string format data.
     */
    const stringDate = useMemo(() => {
        const date = new Date(createdAt);
        const stringDate = months[date.getMonth()] + ' ' + (date.getDate() - 1) + ", " + date.getFullYear();
        return stringDate;
    }, [])
    
    
    const [message, setMessage] = useState("");

    const onChangeMessage = useCallback((e) => {
        const message = e.target.value;
        setMessage(message);
    }, [message]);

    //post delete handler
    const handleDelete = useCallback((id) => {
        dispatch(postActions.deletePost(id))
    }, []);

    // message send handler
    const handleMessage = useCallback((e) => {
        e.preventDefault();
        if(user) {
            dispatch(postActions.sendMessage(_id, message));
            setMessage('');
        } else {
            dispatch({type: messageActionTypes.SET_MESSAGE, payload: {
                message: 'You have to login first.',
                success: true,
                info: true
            }})
            history.push('/signin');
        }
    }, [message]);

    return (
        <Grid container item sm={6}>
            <Card className={classes.root}>
                <CardHeader
                    avatar={
                        <Avatar aria-label="recipe" className={classes.avatar}>
                            {author.username[0].toUpperCase()}
                        </Avatar>
                    }
                    action={
                        isAuthor &&
                        <IconButton aria-label="settings" onClick={handleClickOpen}>
                            <Tooltip title="Delete">
                                <DeleteIcon />
                            </Tooltip>
                        </IconButton>
                    }
                    title={ title + ': By ' + author.username }
                    subheader={stringDate}
                />
                <CardContent>
                    <Typography variant="body2" color="textPrimary" component="p">
                        <Tooltip title="Description">
                            <DescriptionIcon />    
                        </Tooltip> : {description}
                    </Typography>
                    <Typography variant="body2" color="textPrimary" component="p">
                        <Tooltip title="Price">
                            <MoneyIcon />
                        </Tooltip> : {price}
                    </Typography>
                    <Typography variant="body2" color="textPrimary" component="p">
                        <Tooltip title="Location">
                            <LocationOnIcon />
                        </Tooltip>: {location}
                    </Typography>
                    <Typography variant="body2" color="textPrimary" component="p">
                        <Tooltip title="Deliverable">
                            <FlightTakeoffIcon />
                        </Tooltip> : {willDeliver ? 'Yes' : 'No'}
                    </Typography>
                    {
                        !isAuthor && (
                            <div className="mt-20">
                                <form onSubmit={handleMessage} className={classes.message}>
                                    <Paper className="input-wrapper" elevation={3}>
                                        <TextField 
                                            autoFocus={false}
                                            name="message"
                                            className="flex-1"
                                            InputProps={{
                                                disableUnderline: true,
                                                classes : {
                                                    root : "flex flex-grow flex-no-shrink ml-16 mr-28 my-8 text-9",
                                                    input: ""
                                                },
                                                placeholder     : "Type your message"
                                            }}
                                            InputLabelProps={{
                                                shrink   : false,
                                                className: classes.bootstrapFormLabel
                                            }}
                                            value={message}
                                            onChange={onChangeMessage}
                                        />
                                        <IconButton type="submit" className="icon-btn">
                                            <Tooltip title="Send Message">
                                                <SendIcon className="img-btn"/>
                                            </Tooltip>
                                        </IconButton>
                                    </Paper>
                                </form>
                            </div>
                        )
                    }
                    {
                        isAuthor && (
                            <Typography variant="body2" color="textPrimary" component="div">
                                <Tooltip title="Messages">
                                    <MessageIcon />
                                </Tooltip>
                                : {
                                    messages.length ? 
                                    messages.map(message => {
                                        return (
                                            <p key={message._id}>
                                                {message.fromUser.username} <RecordVoiceOverIcon /> {message.content}
                                            </p>
                                        )
                                    }) : 'No message'
                                }
                            </Typography>
                        )
                    }
                </CardContent>
            </Card>
            <Dialog
                open={ open }
                TransitionComponent={ Transition }
                keepMounted
                onClose={ handleClose }
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">{"Delete your post?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        This post will be deactivated if you click Agree.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={ handleClose } color="primary">
                        Disagree
                    </Button>
                    <Button onClick={() => handleDelete(_id)} color="primary">
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
        </Grid>

    )
}

export default PostCard;