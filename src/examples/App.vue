<template>
  <div class="container">
    <SideNav />
    <div class="main-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import SideNav from "@/examples/SideNav";
import {FocusableGrid} from '../../dist/vue-spatial-navigation.esm'
export default {
  name: "App",
  components: {
    SideNav,
  },
  created(){
    console.error(FocusableGrid)
  }
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
}
.container {
  background: black;
  height: 100vh;
  overflow: hidden;
}
.main-content {
  display: flex;
  flex-direction: column;
  padding: 100px;
  overflow: hidden;
}
</style>
