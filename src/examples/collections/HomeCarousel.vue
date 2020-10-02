<template>
  <List
    :child="Card"
    :isFocused="isFocused"
    :items="items"
    :shouldScroll="shouldScroll"
    id="home-carousel"
  />
</template>

<script>
import List from "@/focusable/List";
import Card from "@/examples/components/Card";
import { homeCarousel } from "../mock/mock";
export default {
    props:['isFocused'],
  components: {
    List,
  },
  data() {
    return {
      items: homeCarousel.map((item) => ({ items: item, height: '150px', width: '250px' })),
      Card: Card,
      shouldScroll: true,
    };
  },
  
};
</script>
