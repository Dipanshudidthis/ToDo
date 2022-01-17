import React from 'react';
import { AppBar, Toolbar, Typography, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    toolbar: {
        justifyContent: "center",
        backgroundImage: "linear-gradient(to right, #D81E5B, #8A4EFC)",
    },
    logolg: {
        color: "white",
        fontFamily: "'Mochiy Pop P One', sans-serif",
        display: "none",
        [theme.breakpoints.up("sm")]: {
            display: "block",
      }
    },
    logoSm: {
        display: "block",
        color: "white",
        fontFamily: "'Mochiy Pop P One', sans-serif",
        [theme.breakpoints.up("sm")]: {
          display: "none",
    }}
}));

const Navbar = () => {

    const classes = useStyles();

    return (
        <>
            <AppBar position="fixed" color='secondary'>
                <Toolbar className={classes.toolbar}>
                    <Typography className={classes.logolg} variant="h6">
                        TO DO THIS!!!
                    </Typography>
                    <Typography variant="h6" className={classes.logoSm}>
                        TO DO!!
                    </Typography>
                </Toolbar>
            </AppBar>
        </>
    )
}

export default Navbar
