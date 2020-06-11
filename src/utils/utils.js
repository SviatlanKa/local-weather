import sun from '../assets/sun.jpg';
import clouds from '../assets/clouds.jpg';
import fog from '../assets/fog.jpg';
import rain from '../assets/rain.jpg';
import lightning from '../assets/lightning.jpg';
import wind from '../assets/wind.jpg';
import snow from '../assets/snow.jpg';
import moon from '../assets/moon.jpg';

const weatherIcons = [
    {
        sun: [1,2,3,4,5,30,31]
    },
    {
        clouds: [6,7,8,36,38]
    },
    {
        fog: [11]
    },
    {
        rain: [12,13,14,18,26,39,40]
    },
    {
        lightning: [15,16,17,41,42]
    },
    {
        wind: [19,20,21,32,43]
    },
    {
        snow: [22,23,25,29,44]
    },
    {
        moon: [33,34,35,37]
    }
];

export const findImageName = (weatherIcon) => {
    let name = '';
    weatherIcons.map(icon => {
        if (Object.values(icon)[0].includes(weatherIcon)) {
            name = Object.keys(icon)[0];
        }
        return icon;
    });
    return name;
};

export const findBackgroundUrl = (imgName) => {
    let url = null;
    switch (imgName) {
        case "sun":
            url = `url('${sun}')`;
            break;
        case "clouds":
            url = `url('${clouds}')`;
            break;
        case "fog":
            url = `url('${fog}')`;
            break;
        case "rain":
            url = `url('${rain}')`;
            break;
        case "lightning":
            url = `url('${lightning}')`;
            break;
        case "wind":
            url = `url('${wind}')`;
            break;
        case "snow":
            url = `url('${snow}')`;
            break;
        case "moon":
            url = `url('${moon}')`;
            break;
        default:
            break;
    }
    return url;
};

export const convertKeys = obj => {
    return Object.keys(obj)
        .reduce((acc, key) => {
            let newKey = key.charAt(0).toLowerCase() + key.slice(1);
            acc[newKey] = obj[key];
            return acc
        }, {});
};

export const convertToCelsuis = temp => Math.round((temp - 32) * 5 / 9);

export const convertToMetersInSec = mph => Math.round(mph / 2.237);

export const changeBackgroundColor = (imageName) => {
    return imageName === "fog" || imageName === "wind"
};