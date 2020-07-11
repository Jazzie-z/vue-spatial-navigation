<template>
  <div id="app">
    <Menu />
    <Error v-if="error" />
    <router-view></router-view>
  </div>
</template>

<script>
import Menu from "./components/Page/Menu.vue";
import Error from "./components/Page/Error.vue";
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
  text-align: center;
  color: white;
  overflow: hidden;
}
body {
  overflow: hidden;
  background: black;
  margin: 0;
}
</style>
