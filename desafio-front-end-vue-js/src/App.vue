<template>
  <HomePage />
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import HomePage from './components/HomePage.vue';

@Options({
  components: {
    HomePage,
  },
})
export default class App extends Vue {}
</script>

