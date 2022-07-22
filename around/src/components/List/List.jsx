import React, {useState, useEffect, createRef } from 'react';
import { CircularProgress, Grid, Typography, InputLabel, MenuItem, FormControl, Select } from '@material-ui/core';
import useStyles from './styles.js';
import PlaceDetails from "../PlaceDetails/PlaceDetails";

const List = ({ places, childClicked, isLoading, type, setType, rating, setRating }) => {
    const classes = useStyles();
    const [elRefs, setElRefs] = useState([]);

    useEffect(() => {
        setElRefs((refs) =>
            Array(places?.length).fill().map((_, i) => refs[i] || createRef()));
    }, [places]);

    return (
        <div className={classes.container}>
            <Typography variant="h4">
                Explore restaurants, hotels & attractions around you
            </Typography>
            { isLoading ? (
                <div className={classes.loading}>
                    <CircularProgress  size="5rem"/>
                </div>
            ) : (
                <>
            <FormControl className={classes.formControl}>
                <InputLabel> Type </InputLabel>
                <Select value={type} onChange={(e) => setType(e.target.value)}>
                    <MenuItem value="restaurants"> Restaurants</MenuItem>
                    <MenuItem value="hotels"> Hotels </MenuItem>
                    <MenuItem value="attractions"> Attractions </MenuItem>
                </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
                <InputLabel> Rating </InputLabel>
                <Select value={rating} onChange={(e) => setRating(e.target.value)}>
                    <MenuItem value={0}> All </MenuItem>
                    <MenuItem value={3}> Above 3.0 </MenuItem>
                    <MenuItem value={4}> Above 4.0 </MenuItem>
                    <MenuItem value={4.5}> Above 4.5 </MenuItem>
                </Select>
            </FormControl>
            <Grid container spacing={3} className={classes.list}>
                {places?.map((place, index) => (
                    <Grid ref={elRefs[index]} item key={index} xs={12} >
                        <PlaceDetails
                            selected={Number(childClicked) === index}
                            refProp={elRefs[index]}
                            place={place}
                        />
                    </Grid>
                ))}
            </Grid>
                </>
            )}
        </div>
    );
}

export default List;