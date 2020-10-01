<template>
  <List
    :child="Card"
    :isFocused="true"
    :items="items"
    :shouldScroll="shouldScroll"
    :disabledIndex="[2]"
  />
</template>

<script>
import List from "@/focusable/List";
import Card from "@/examples/components/Card";
import { carouselData } from "../mock/mock";
export default {
  components: {
    List,
  },
  data() {
    return {
      items: carouselData[0].map((item) => ({ items: item, height: '300px' })),
      Card: Card,
      shouldScroll: true,
    };
  },
};
</script>
