<template>
  <div class="hello">
    <weather-widget></weather-widget>
  </div>
</template>

<script>
import WeatherWidget from './../widgets/weather/WeatherWidget'
export default {
  name: 'TestComponent',
  components: { WeatherWidget }
}
</script>
