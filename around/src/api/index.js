import axios from 'axios';

const URL = 'https://travel-advisor.p.rapidapi.com/attractions/list-in-boundary'
const options = {
    params: {
        tr_longitude: '109.262909',
        tr_latitude: '12.346705',
        bl_longitude: '109.095887',
        bl_latitude: '12.113245',
    },
    headers: {
        'X-RapidAPI-Key': 'eea778243amsh2f00f061f58d59ep131d40jsn5c9d234811c8',
        'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
    }
};


export const getPlacesData = async (type, sw, ne) => {
    try {
        const {data: { data }} = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`, {
            params: {
                bl_latitude: sw.lat,
                bl_longitude: sw.lng,
                tr_longitude: ne.lng,
                tr_latitude: ne.lat,
            },
            headers: {
                'X-RapidAPI-Key': process.env.REACT_APP_RAPIDAPI_API_KEY,
                'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
            }
        });

        return data;
    } catch (error) {
        console.log(error);
    }
}

export const getWeatherData = async (lat, lng) => {
    try {
        const { data } = await axios.get('https://community-open-weather-map.p.rapidapi.com/find', {
            params: {
                lon: lng,
                lat: lat,
            },
            headers: {
                'X-RapidAPI-Key': process.env.REACT_APP_RAPIDAPI_API_KEY,
                'X-RapidAPI-Host': 'community-open-weather-map.p.rapidapi.com'
            }
        });
        return data;
    } catch (error) {
        console.log(error);
    }
}