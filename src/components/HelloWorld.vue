<template>
  <div>
    <Grid
      :child="child"
      v-if="false"
      :isFocused="true"
      :items="gridItems"
      :shouldScroll="true"
    />
    <List
      :child="childList"
      :isFocused="true"
      :items="listItems"
      orientation="VERTICAL"
      :shouldScroll="true"
      id="vertical"
    />
    <!-- <List :child="child" :isFocused="true" :items="items" 
orientation="HORIZONTAL" id='vertical2'
/> -->
  </div>
</template>
<script>
import List from "@/components/Focusable/List";
import Grid from "@/components/Focusable/Grid";
import Card from "./Card";
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
  },
  data() {
    return {
      child: Card,
      childList: List,
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
    }, 3000);
  },
};
</script>
