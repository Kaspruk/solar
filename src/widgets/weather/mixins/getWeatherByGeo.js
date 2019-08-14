import api from './../common/api'

import lsHelper from './lsHelper'

export default{
    mixins: [ lsHelper ],
    data() {
        return {
            geoWeather: {},
        }
    },
    methods: {
        getClientGeo() {
            if (!this.getLSData().selectedCity) this.geoWeather = { clouds: { all: 0 },  wind: { speed: 0 }, main: {  humidity: 0, pressure: 0, temp: 0, temp_max: 0, temp_min: 0 }, weather: [{id: 0, main: 'Clear', description: `Please select your city :)`}], name: '', sys: { country: '', sunrise: 0, sunset: 0 } };
            if (navigator.onLine) navigator.geolocation.getCurrentPosition(this.updateForecast);
        },
        async updateForecast(position) {
            let data = null;

            try {
                data = await api.weather.getWeatherByGeo(position.coords.latitude, position.coords.longitude);
                this.saveInLS(data.name);
            }
            catch (e) { data = this.getErrorData() }

            this.geoWeather = data

        },
        saveInLS(cityName) {
            const updateStorage = this.getLSData();
            updateStorage.currentCity = cityName;
            updateStorage.selectedCity = cityName;
            const cityItems = updateStorage.cities ? updateStorage.cities : [];
            const checkSimilarCity = cityItems.filter(city => city === cityName);
            if (!checkSimilarCity.length) {
                cityItems.unshift(cityName);
            }
            updateStorage.cities = cityItems;
            this.setLSData(updateStorage);
        },
        getErrorData() {
            return {
                clouds: { all: 0 },
                wind: { speed: 0 },
                main: {
                    humidity: 0,
                    pressure: 0,
                    temp: 0,
                    temp_max: 0,
                    temp_min: 0,
                },
                weather: [
                    {
                        id: 0,
                        main: 'Clear',
                        description: `There's a problem at the weather forecast server ¯\\_(ツ)_/¯`
                    }
                ],
                name: null,
                sys: {
                    country: '',
                    sunrise: 0,
                    sunset: 0,
                }
            };
        },
    }
}
