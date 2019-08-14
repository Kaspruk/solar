<template>
    <div class="city-list">
        <div class="layout justify-center">
            <div class="city-list--search">
                <v-field label="Find city" v-model="value" @enter="addCity()"></v-field>
                <div class="btn" @click="addCity()" :class="{'disabled': !value.length}"><span class="btn__content">Add</span></div>
            </div>
        </div>
        <div class="city-list-wrapper">
            <div v-if="!cityWithWeather.length && !loading" class="layout justify-center city-list-wrapper--empty">
                Add more cities
            </div>
            <transition-group v-else name="move-list" tag="div" class="layout wrap city-list-wrapper--scroll">
                <city-list-item
                    v-if="errorMsg"
                    :errorMsg="errorMsg"
                    :key="1">
                </city-list-item>
                <city-list-item
                    v-for="city in cityWithWeather"
                    :currentCity="!!(currentCity === city.name)"
                    :weather="city"
                    @selectCity="selectCity(city)"
                    @remove="removeItem(`${city.name}, ${city.sys.country}`)"
                    :key="city.id">
                </city-list-item>
            </transition-group>
        </div>
    </div>
</template>

<script>
import api from './../common/api/index.js'

import lsHelper from './../mixins/lsHelper'

import VField from '../components/VField'
import CityListItem from '../components/CityListItem'

export default {
    name: "CityList",
    components: { VField, CityListItem },
    mixins: [ lsHelper ],
    data() {
        return {
            value: '',
            cities: [],
            cityWithWeather: [],
            errorMsg: '',
            loading: false
        }
    },
    computed: {
        currentCity() {
            const ls = this.getLSData();
            return (ls && ls.currentCity) ? ls.currentCity.split(',')[0] : '';
        }
    },
    methods: {
        addCity() {
            const checkSimilarCity = this.cities.filter(city => city === this.value);
            if (!checkSimilarCity.length) {
                this.getWeatherByCityName(this.value);
            }
            this.value = ''
        },
        getWeatherInCities(city) {
            this.loading = true;
            const arr = [];
            city.forEach(c => arr.push(api.weather.getWeatherByCityName(c)));
            Promise.all(arr).then((res) => {
                this.cityWithWeather = res;
                this.loading = false;
            });
        },
        getWeatherByCityName(city) {
            api.weather.getWeatherByCityName(city).then((res) => {
                if(res.cod === "400" || res.cod === "404") {
                    this.errorMsg = res.message;
                    setTimeout(() => {
                        this.errorMsg = '';
                        this.cities.shift();
                        const ls = this.getLSData();
                        ls.cities = this.cities;
                        this.setLSData(ls)
                    }, 3500)
                } else {
                    this.cities.unshift(`${res.name}, ${res.sys.country}`);
                    const ls = this.getLSData();
                    ls.cities = this.cities;
                    this.setLSData(ls);
                    this.cityWithWeather.unshift(res)
                }
            })
        },
        selectCity(city){
            this.$emit('showSelectedCity', city);
            const obj = this.getLSData();
            obj.selectedCity = `${city.name}, ${city.sys.country}`;
            this.setLSData(obj)
        },
        removeItem(name) {
            const ind = this.cities.indexOf(name);
            const obj = this.getLSData();
            this.cities.splice(ind, 1);
            this.cityWithWeather.splice(ind, 1);
            obj.cities = this.cities;
            this.setLSData(obj)
        },
    },
    created() {
        const savedCities = this.getLSData();
        if (savedCities && savedCities.cities) {
            this.cities = [...savedCities.cities]
        } else {
            this.cities = []
        }
        if(this.cities.length) this.getWeatherInCities(this.cities)
    }
}
</script>

<style scoped>

</style>
