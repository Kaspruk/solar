<template>
    <div class="temperature">
        <span>{{ mainTemp }}</span>
        <div>
            <i @click.stop="celsius = !celsius">&deg;{{ celsius ? 'C' : 'F' }}</i>
            <span><i class="icon temp-high"></i>{{ highTemp }}&deg;</span>
            <span><i class="icon temp-low"></i>{{ lowTemp }}&deg;</span>
        </div>
    </div>
</template>

<script>
export default {
    name: "Temperature",
    props: {
        cityTemp: {
            type: Object,
            default: null
        }
    },
    data() {
        return {
            celsius: true
        }
    },
    computed: {
        mainTemp() {
            return this.celsius ? this.getCelsius(this.cityTemp.temp) : this.getFahrenheit(this.cityTemp.temp);
        },
        highTemp() {
            return this.celsius ? this.getCelsius(this.cityTemp.temp_max) : this.getFahrenheit(this.cityTemp.temp_max);
        },
        lowTemp() {
            return this.celsius ? this.getCelsius(this.cityTemp.temp_min) : this.getFahrenheit(this.cityTemp.temp_min);
        }
    },
    methods: {
        getCelsius(temp) {
            return Math.round(temp / 10)
        },
        getFahrenheit(temp) {
            return Math.floor((this.getCelsius(temp) * 1.8) + 32);
        },
    }
}
</script>

<style scoped>

</style>
