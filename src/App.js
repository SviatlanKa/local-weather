import React, { useState, useEffect, Suspense } from 'react';
import { findBackgroundUrl } from './utils/utils';
import CurrentWeather from './components/current-weather/CurrentWeather';
import ErrorBoundary from "./components/error-boundary/ErrorBoundary";
import Spinner from "./components/spinner/Spinner";
import Hourly12Forecast from "./components/hourly12-forecast/Hourly12Forecast";
import './App.css';


const apiKey = process.env.REACT_APP_API_KEY;
const baseUrl = process.env.REACT_APP_BASE_URL;

const App = () => {
    const [initData, setInitData] = useState({
        locationKey: undefined,
        name: ''
    });
    const [isMetricSys, setIsMetricSys] = useState(false);
    const [isFetching, setIsFetching] = useState(true);

    useEffect(() => {
        let didCancel = false;
        setIsFetching(true);
        const getData = async () => {
            const showLocation = (position) => {
                const {latitude, longitude} = position.coords;

                fetch(`${baseUrl}/locations/v1/cities/geoposition/search?apikey=${apiKey}&q=${latitude},${longitude}`)
                    .then(res => res.json())
                    .then(json => {
                        setInitData({locationKey: json.Key, name: json.EnglishName});
                        setIsFetching(false);
                    })
                    .catch(err => console.log(err.message));
            };
            const errorHandler = (err) => {
                if (err.code === 1) alert("Error: Access is denied!");
                if (err.code === 2) alert("Error: Position is unavailable!");
            };
            navigator.geolocation ?
                navigator.geolocation.getCurrentPosition(showLocation, errorHandler)
                : alert("Sorry, browser does not support geolocation!");
        };
        getData().then(() => didCancel = true);
    }, []);





                        //
                        //     fetch(`${baseUrl}/forecasts/v1/daily/5day/${locationKey}?apikey=${API_Key}`)
                        //         .then(res => res.json())
                        //         .then(json => {
                        //             let days5ForecastArray = [];
                        //             json.DailyForecasts.map(item => {
                        //                 const date = item.Date;
                        //                 const dayWeatherIcon = item.Day.Icon;
                        //                 const maxTemperature = isMetricSys ? convertToCelsuis(item.Temperature.Maximum.Value)
                        //                     : item.Temperature.Maximum.Value;
                        //                 const minTemperature = isMetricSys ? convertToCelsuis(item.Temperature.Minimum.Value)
                        //                     : item.Temperature.Minimum.Value;
                        //                 days5ForecastArray.push({
                        //                     date,
                        //                     dayWeatherIcon,
                        //                     maxTemperature,
                        //                     minTemperature
                        //                 });
                        //                 return days5ForecastArray;
                        //             });
                        //             const isFetching = false;
                        //             this.setState({ isFetching, days5ForecastArray });
                        //         });
                        // })

        const curHours = new Date().getHours();
        const imageName = (curHours > 6 && curHours < 22) ? "sun" : "moon";
        const backgroundUrl = findBackgroundUrl(imageName);

        return (
            <div className="App">
                <ErrorBoundary>
                    <Suspense fallback={<Spinner/>}>
                        <div className="background-image"
                             style={{backgroundImage: isFetching ? null : backgroundUrl }}
                        >
                            <CurrentWeather
                                isFetching={isFetching}
                                apiKey={apiKey}
                                baseUrl={baseUrl}
                                isMetricSys={isMetricSys}
                                { ...initData }
                            />
                            <Hourly10Forecast
                                isFetching={isFetching}
                                apiKey={apiKey}
                                baseUrl={baseUrl}
                                isMetricSys={isMetricSys}
                                { ...initData }/>
                        </div>
                    </Suspense>
                </ErrorBoundary>
            </div>
        );
}

export default App;
