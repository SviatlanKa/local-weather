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
        lightninig: [15,16,17,41,42]
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

const nightIconWeather = [36,38,39,40,41,42,43,44];

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

export const isNightIcon = (weatherIcon) => nightIconWeather.includes(weatherIcon);