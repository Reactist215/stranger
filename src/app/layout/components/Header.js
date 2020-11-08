import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { 
    AppBar,
    Toolbar,
    Typography,
    Button,
    MenuItem,
    ClickAwayListener,
    Grow,
    Paper,
    Popper,
    MenuList,
} from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { authActions, postActions } from "../../store/actions";

const useStyles = makeStyles(() => ({
    root: {
        flexGrow: 1,
    },
    title: {
        flexGrow: 1,
    },
    link: {
        color: 'white',
        textDecoration: 'none',
        "&:hover" : {
            color: 'white',
            textDecoration: 'none'
        }
    },
    userinfo: {
        fontSize: '15px',
        color: 'white',
    }
}));

const Header = () => {
    const classes = useStyles();
    const {isLoggedIn, user} = useSelector((state) => state.authorization);
    const dispatch = useDispatch();
    const userLogOut = useCallback((event) => {
        dispatch(authActions.logout());
        dispatch(postActions.getAllPosts());
        handleClose(event);
    }, []);

    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };

    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        }
    }

    // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        prevOpen.current = open;
    }, [open]);

    return (
        <div className={classes.root}>
            <AppBar position="fixed" color="primary">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        Strange Things
                    </Typography>
                    {
                        !isLoggedIn ? (
                            <>
                                <Button><Link to={'/signin'} className={classes.link}>SignIn</Link></Button>
                                <Button><Link to={'/signup'} className={classes.link}>SignUp</Link></Button>
                            </>
                        ) : (
                            <div>
                                <Button
                                    ref={anchorRef}
                                    aria-controls={open ? 'menu-list-grow' : undefined}
                                    aria-haspopup="true"
                                    onClick={handleToggle}
                                    className={classes.userinfo}
                                >
                                    <AccountCircle/>
                                    {user}
                                </Button>
                                <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                                    {({ TransitionProps, placement }) => (
                                        <Grow
                                            {...TransitionProps}
                                            style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                                        >
                                        <Paper>
                                            <ClickAwayListener onClickAway={handleClose}>
                                            <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                                                <MenuItem onClick={handleClose}>Profile</MenuItem>
                                                <MenuItem onClick={handleClose}>My account</MenuItem>
                                                <MenuItem onClick={userLogOut}>Logout</MenuItem>
                                            </MenuList>
                                            </ClickAwayListener>
                                        </Paper>
                                        </Grow>
                                    )}
                                </Popper>
                            </div>
                        )
                    }
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Header;