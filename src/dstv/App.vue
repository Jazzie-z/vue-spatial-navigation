<template>
  <div id="app">
    <Menu />
    <!-- <Home v-if="false"/> -->
    <router-view></router-view>
  </div>
</template>

<script>
import Menu from "./components/Menu.vue";
// import Home from "./components/Home.vue";

export default {
  name: "App",
  components: {
    // Home,
    Menu,
  },
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
