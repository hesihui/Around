import React, { useEffect, useState } from 'react';
import './App.css';
import { CssBaseline, Grid } from "@material-ui/core";

import { getPlacesData, getWeatherData } from './api';
import Header from './components/Header/Header';
import List from './components/List/List';
import Map from './components/Map/Map';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
    const [places, setPlaces] = useState([]);
    const [coordinates, setCoordinates] = useState({ lat: 37.774929, lng:-122.419416});
    const [bounds, setBounds] = useState({});
    const [weatherData, setWeatherData] = useState([]);
    const [childClicked, setChildClicked] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const [type, setType] = useState('restaurants');
    const [rating, setRating] = useState('');
    const [filteredPlaces,setFilteredPlaces] = useState([]);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(({ coords: {latitude, longitude}}) => {
            setCoordinates({lat: latitude, lng: longitude });
        })
    }, []);

    const notify = () => {
        toast(`We find several places based on ratings value Above
        ${rating}! Check the map to see! `);
    }

    useEffect(() => {
        const filtered = places.filter((place) => Number(place.rating) > rating);
        setFilteredPlaces(filtered);
        notify();
    }, [rating]);

    useEffect( () => {
        setIsLoading(true);
        try{
            console.log(bounds);
            getWeatherData(coordinates.lat, coordinates.lng)
                .then((data) => setWeatherData(data));
            if (bounds.sw && bounds.ne) {
                getPlacesData(type, bounds.sw, bounds.ne)
                    .then((data) => {
                        console.log(data);
                        setPlaces(data?.filter((place) => place.name && place.num_reviews > 0));
                        setFilteredPlaces([]);
                        setIsLoading(false);
                    });
            }
        } catch (error){
            console.log(error)
        }
    }, [type, bounds]);


    return (
        <>
            <CssBaseline />
            <Header setCoordinates={setCoordinates} />
            <Grid container spacing={3} style={{ width: '100%' }}>
                <Grid item xs={12} md={4}>
                    <List
                        places={filteredPlaces.length ? filteredPlaces : places}
                        childClicked={childClicked}
                        isLoading={isLoading}
                        type={type}
                        setType={setType}
                        rating={rating}
                        setRating={setRating}
                    />
                </Grid>
                <Grid item xs={12} md={8}>
                    <Map
                        setCoordinates={setCoordinates}
                        setBounds={setBounds}
                        coordinates={coordinates}
                        places={filteredPlaces.length ? filteredPlaces: places}
                        setChildClicked={setChildClicked}
                        weatherData={weatherData}
                    />
                </Grid>
            </Grid>
        </>
    );
}

export default App;
