<template>
  <div id="app">
    <test-component/>
  </div>
</template>

<script>
import TestComponent from './components/TestComponent.vue'

export default {
  name: 'app',
  components: {
    TestComponent
  }
}
</script>
