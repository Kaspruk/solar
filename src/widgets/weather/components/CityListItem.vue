<template>
    <div class="city-list-item">
        <div v-if="weather"
             class="city-list-item__wrapper"
             :class="isDay"
             @click="$emit('selectCity')">
            <div class="city-list-item__remove">
                <div class="spacer"></div>
                <i class="icon" :class="{'close': !currentCity}" @click.stop="$emit('remove')"></i>
            </div>
            <div class="layout" :class="weatherType">
                <div class="city-list-item__description">
                    <span class="city-list-item__description--city-name">{{ weather.name }}</span>
                    <span class="city-list-item__description--type">{{ weather.weather[0].main }}</span>
                </div>
                <div class="city-list-item__icon">
                    <i class="icon city-weather-image"></i>
                </div>
                <temperature :city-temp="weather.main"></temperature>
            </div>
        </div>
        <div v-if="errorMsg" class="city-list-item__error">
            {{ errorMsg }}
        </div>
    </div>
</template>

<script>
import Temperature from './../components/Temperature'

import checkClasses from './../mixins/checkClasses.js'

export default {
    name: "CityListItem",
    mixins: [ checkClasses ],
    components: { Temperature },
    props: {
        weather: {
            type: Object,
            default: null,
        },
        currentCity: {
            type: Boolean,
            default: false,
        },
        errorMsg: {
            type: String,
            default: '',
        }
    }
}
</script>

<style scoped>

</style>
