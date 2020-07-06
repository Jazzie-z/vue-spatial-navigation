<template>
  <div>
    <Grid
      :child="child"
      :isFocused="true"
      :items="gridItems"
      :shouldScroll="true"
    />
    <List
      v-if="false"
      :child="childList"
      :isFocused="false"
      :items="listItems"
      orientation="VERTICAL"
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
        { child: Card, items: mockImage.map((item) => ({ items: item })) },
        { child: Card, items: mockImage.map((item) => ({ items: item })) },
      ],
    };
  },
  mounted() {},
};
</script>
