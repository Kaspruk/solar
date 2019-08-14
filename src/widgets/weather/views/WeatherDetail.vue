<template>
    <div v-if="weatherData" class="weather-detail">
        <div class="layout">
            <div class="weather-detail__description">
                <span class="weather-detail__description--city-name">{{ weatherData.name }}</span>
                <span class="weather-detail__description--type">{{ weatherData.weather[0].main }}</span>
            </div>
            <temperature :city-temp="weatherData.main"></temperature>
        </div>
        <div class="layout align-center justify-center weather-detail__image">
            <i class="icon icon-weather-image"></i>
        </div>
        <div class="layout align-center wrap weather-detail__measurements">
            <div class="weather-detail__measurements--item">
                <i class="icon cloud"></i>
                <span>{{ weatherData.clouds.all }}%</span>
            </div>
            <div class="weather-detail__measurements--item">
                <i class="icon wind"></i>
                <span>{{ weatherData.wind.speed }} m/s</span>
            </div>
            <div class="weather-detail__measurements--item">
                <i class="icon humidity"></i>
                <span>{{ weatherData.main.humidity }}%</span>
            </div>
            <div class="weather-detail__measurements--item">
                <i class="icon pressure"></i>
                <span>{{ weatherData.main.pressure }} hPa</span>
            </div>
            <div class="weather-detail__measurements--item">
                <i class="icon sun-rise"></i>
                <span>{{ getTime(weatherData.sys.sunrise) }}</span>
            </div>
            <div class="weather-detail__measurements--item">
                <i class="icon sun-set"></i>
                <span>{{ getTime(weatherData.sys.sunset) }}</span>
            </div>
        </div>
    </div>
</template>

<script>
import Temperature from '../components/Temperature'

export default {
    name: "weatherDetail",
    components: { Temperature },
    props: {
        weatherData: {
            type: Object,
            default: null
        }
    },
    methods: {
        getTime(milliseconds) {
            const time = new Date(milliseconds * 1000);
            return `${this.getNum(time.getMinutes())}:${this.getNum(time.getHours())}`;
        },
        getNum(n) {
            const str = n.toString();
            return str.length > 1 ? str : `0${str}`;
        }
    }
}
</script>
