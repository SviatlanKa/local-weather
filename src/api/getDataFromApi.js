
const API_Key = 'eG2SeohPQfwFjIv8ihiTTvnASCNPzD1L';
const baseUrl = 'http://dataservice.accuweather.com';

export const getLocation = async (coords) => {
    const { latitude, longitude } = coords;
    const result = await (`${baseUrl}/locations/v1/cities/geoposition/search?apikey=${API_Key}&q=${latitude},${longitude}`);
    //const data = await result.json();
    //const localKey = data.Key;
    //return localKey;
    return result
};

export const getCurrentWeather = async (localKey) => {
    const result = await fetch(`${baseUrl}/currentconditions/v1/${localKey}?apikey=${API_Key}`);
    return await result.json();
};


export const get24HoursForecast = async (localKey) => {
    const result = await fetch(`${baseUrl}/forecasts/v1/hourly/24hour/${localKey}?apikey=${API_Key}`);
    return await result.json();
};

export const getOneDayForecast = async (localKey) => {
    const result = await fetch(`${baseUrl}/forecasts/v1/daily/1day/${localKey}?apikey=${API_Key}`);
    return await result.json();
};

export const get5DaysForecast = async (localKey) => {
    const result = await fetch(`${baseUrl}/forecasts/v1/daily/5day/${localKey}?apikey=${API_Key}`);
    return await result.json();
};
