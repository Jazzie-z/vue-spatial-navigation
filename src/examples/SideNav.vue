<template>
  <div class="side-nav">
    <div class="title">Example Components</div>
    <router-link v-for="(item, index) in items" :key="index" :to="item.path">{{
      item.displayName
    }}</router-link>
  </div>
</template>

<script>
import { routes } from "@/examples/router";

export default {
  data() {
    return {
      items: routes,
    };
  },
};
</script>

<style lang="css" scoped>
.side-nav {
  float: left;
  height: 100vh;
  display: flex;
  flex-direction: column;
  text-align: left;
  background: grey;
  width: 300px;  
}
.side-nav .title {
    padding: 20px;
    text-align: center;
    color: white;
    font-size: 24px;
    background: #41b883;
  }
.side-nav .router-link-active {
    background: #35495e;
  }
.side-nav a {
    background: grey;
    padding: 20px;
    color: white;
    text-decoration: none;
    font-size: 24px;
  }
</style>
