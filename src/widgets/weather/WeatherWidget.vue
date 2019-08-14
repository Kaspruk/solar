<template>
    <div v-if="weather" class="weather-widget" :class="isDay">
        <div class="container weather-card" :class="weatherType">
            <div class="layout weather-widget__header">
                <div class="btn icon" @click="updateWeather()" :class="!showList || 'hide'">
                    <i class="icon reload"></i>
                </div>
                <div class="spacer"></div>
                <div class="btn icon" @click="showList = !showList">
                    <i class="icon list" :class="showList ? 'close' : 'list'"></i>
                </div>
            </div>
            <weather-detail :weather-data="weather"></weather-detail>
            <transition name="widget-city-list">
                <city-list v-if="showList" @showSelectedCity="showSelectedCity"></city-list>
            </transition>
        </div>
    </div>
</template>

<script>
import api from './common/api/index.js'

import WeatherDetail from './views/WeatherDetail.vue'

import getWeatherByDeo from './mixins/getWeatherByGeo.js'
import checkClasses from './mixins/checkClasses.js'

export default {
    name: "WeatherWidget",
    mixins: [ getWeatherByDeo, checkClasses ],
    components: {
        WeatherDetail,
        CityList: () => import('./views/CityList.vue')
    },
    data(){
        return {
            weather: null,
            showList: false,
        }
    },
    methods: {
        getWeatherByCityName(name) {
            api.weather.getWeatherByCityName(name).then(res => this.weather = res);
        },
        updateWeather() {
            const city = this.getLSData().selectedCity;
            if(city) this.getWeatherByCityName(city).then(res => this.weather = res);
        },
        startApp() {
            const ls = this.getLSData();
            const selectedCity = ls ? ls.selectedCity : false;
            const currentCity = ls ? ls.currentCity : false;
            if((ls && !!selectedCity)) {
                this.getWeatherByCityName(selectedCity);
            }
            if ((!ls && !currentCity) || (ls && !currentCity)) {
                this.getClientGeo()
            }
        },
        showSelectedCity(city){
            this.weather = city;
            this.showList = false
        },
    },
    created() {
        this.startApp()
    },
    watch: {
        geoWeather(val) {
            this.weather = val;
        }
    }
}
</script>

<style lang="scss">
@import 'assets/scss/main';
</style>
