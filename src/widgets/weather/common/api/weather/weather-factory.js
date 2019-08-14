import interpolateUrl from '../../helpers/interpolateUrl';

const BASE_URL = `https://api.openweathermap.org/data/2.5/weather?`;
const API_KEY = `&appid=397402795302827369acc6f2e906739f`;

const URLS = {
    getWeatherByCityName: `${BASE_URL}/:q${API_KEY}`,
    getWeatherByGeo: `${BASE_URL}/:lat&/:lon${API_KEY}`,
};

const weatherFactory = () => ({

    getWeatherByCityName: q => fetch(interpolateUrl(URLS.getWeatherByCityName, q))
            .then(res => res.json()).then(res => Promise.resolve(res))
            .catch(err =>  Promise.reject(err)),

    getWeatherByGeo: (lat, lon) => fetch(interpolateUrl(URLS.getWeatherByGeo, { lat, lon }))
            .then(res => res.json()).then(res => Promise.resolve(res))
            .catch(err =>  Promise.reject(err)),

});

export default weatherFactory;
