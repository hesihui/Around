import React, { useState } from 'react';
import { Autocomplete } from "@react-google-maps/api";
import {AppBar, Toolbar, Typography, InputBase, Box, Button} from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import useStyles from './styles.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Header = ({setCoordinates}) => {
    const classes = useStyles();
    const [autocomplete, setAutocomplete] = useState(null);

    const onLoad = (autoC) => setAutocomplete(autoC);

    const onPlaceChanged = () => {
        const lat = autocomplete.getPlace().geometry.location.lat();
        const lng = autocomplete.getPlace().geometry.location.lng();
        setCoordinates({ lat, lng});
        notify();
    }

    const notify = () => {
        toast("We find several places based on your location! " +
            "Check the map to see! ");
    }
    return (
        <AppBar position="static">
            <Toolbar className={classes.toolbar}>
                <Typography variant="h5" className={classes.title}>
                    <FastfoodIcon /> Around: Find Where You Want to Go
                </Typography>
                <Box display="flex">
                    <Typography variant="h6" className={classes.title}>
                        Enter your location:
                    </Typography>
                    <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon />
                            </div>
                            <InputBase placeholder="Search…"
                                       classes={{ root: classes.inputRoot, input: classes.inputInput }} />
                        </div>
                    </Autocomplete>
                    <ToastContainer />
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;