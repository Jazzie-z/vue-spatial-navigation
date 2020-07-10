<template>
  <div id="app">
    <Menu />
    <Error v-if="error" />
    <router-view></router-view>
  </div>
</template>

<script>
import Menu from "./components/Menu.vue";
import Error from "./components/Error.vue";
import { mapState } from "vuex";
export default {
  name: "App",
  components: {
    Error,
    Menu,
  },
  computed: mapState({ error: (state) => state.error }),
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  overflow: hidden;
}
body {
  overflow: hidden;
  background: black;
  margin: 0;
}
</style>
