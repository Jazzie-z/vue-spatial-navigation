<template>
  <List
    :child="child"
    :isFocused="true"
    :items="items"
    :shouldScroll="shouldScroll"
    orientation="VERTICAL"
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
      items: [
        {
          child: Card,
          shouldScroll: true,
          items: carouselData[0].map((item) => ({ items: item })),
        },
        {
          child: Card,
          shouldScroll: true,
          disabledIndex: [3],
          items: carouselData[1].map((item) => ({ items: item })),
        },
      ],
      child: List,
      shouldScroll: true,
    };
  },
};
</script>

<style lang="css">
.focus {
  z-index: 1;
}
</style>
