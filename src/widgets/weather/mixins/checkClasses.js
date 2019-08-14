export default{
    computed: {
        isDay() {
            const dt = this.weather.dt;
            const timezone = this.weather.timezone;
            const time = (!!dt && !!timezone) ? new Date((dt + timezone)*1000).getHours()-3 : new Date().getHours()-3;
            const checkPeriod = (time > 5 && time < 18);
            return {
                'day': checkPeriod,
                'night': !checkPeriod
            };
        },
        weatherType() {
            return [`weather-${this.weather.weather[0].main.toLowerCase()}`]
        }
    }
};
