<template>
  <div class="hello">
    <weather-widget></weather-widget>
  </div>
</template>

<script>
import WeatherWidget from './../widgets/weather/WeatherWidget'
export default {
  name: 'HelloWorld',
  components: { WeatherWidget },
  props: {
    msg: String
  }
}
</script>
