<template>
  <div class="side-nav" v-bind:class="{ collapsed: collapsed }">
    <div class="title" v-on:click="onClick">
      <div v-if="!collapsed">Example Components</div>
      <BurgerIcon v-else />
    </div>
    <div class="nav-wrapper">
      <router-link
        v-for="(item, index) in items"
        :key="index"
        :to="item.path"
        class="link"
        >{{ item.displayName }}</router-link
      >
    </div>
  </div>
</template>

<script>
import { routes } from "@/examples/router";
import BurgerIcon from "@/examples/components/BurgerIcon.vue";
export default {
  components: {
    BurgerIcon,
  },
  data() {
    return {
      items: routes,
      collapsed: true,
    };
  },
  methods: {
    onClick: function (event) {
      this.collapsed = !this.collapsed;
    },
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
  transition-duration: 0.5s;
  overflow: hidden;
  background-image: linear-gradient(to bottom, #41b883 50%, grey 50%);
  background-size: 100% 200%;

  background-position: bottom;
}
.side-nav .title {
  display: flex;
  padding: 20px;
  text-align: center;
  color: white;
  font-size: 24px;
  background: #41b883;
  cursor: pointer;
  white-space: nowrap;
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
  white-space: pre;
}
.nav-wrapper {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
.collapsed {
  width: 80px;
  background-position: top;
}
.collapsed .link {
  display: none;
}
</style>
