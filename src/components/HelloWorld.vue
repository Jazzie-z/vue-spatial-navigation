<template>
  <div class="container">
    <SideNav />
    <Grid
      :child="child"
      v-if="false"
      :isFocused="true"
      :items="gridItems"
      :shouldScroll="true"
    />
    <List
      v-if="false"
      :child="childList"
      :isFocused="true"
      :items="listItems"
      orientation="VERTICAL"
      :shouldScroll="true"
      id="vertical"
    />
    <div class="main-content">
      <router-view></router-view>
    </div>
    <!-- <List :child="child" :isFocused="true" :items="items" 
orientation="HORIZONTAL" id='vertical2'
/> -->
  </div>
</template>
<script>
import List from "@/components/Focusable/List";
import Grid from "@/components/Focusable/Grid";
import Card from "./Card";
import SideNav from "@/components/SideNav";
import { mockImage } from "@/mock";
import { focusHandler } from "../main";
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  components: {
    List,
    Grid,
    SideNav,
  },
  data() {
    return {
      child: Card,
      childList: [List],
      items: mockImage.map((item) => ({ items: item })),
      gridItems: [...new Array(23)].map(() => ({ items: mockImage[0] })),
      listItems: [
        {
          child: Card,
          shouldScroll: true,
          items: mockImage.map((item) => ({ items: item })),
        },
        { child: Card, items: mockImage.map((item) => ({ items: item })) },
      ],
    };
  },
  mounted() {
    setTimeout(() => {
      focusHandler.$emit("RESET_FOCUS", { force: true });
    }, 30000000);
  },
};
</script>
<style lang="scss" scoped>
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
