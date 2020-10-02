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
import List from "@/components/Focusable/List";
import Card from "@/components/Card";
import { carouselData } from '@/components/Example/mock';
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
          items: carouselData[0].map((item) => ({ items: item, height:'300px' })),
        },
        {
          child: Card,
          shouldScroll: true,
          disabledIndex: [1],
          items: carouselData[1].map((item) => ({ items: item, height:'300px' })),
        },
      ],
      child: List,
      shouldScroll: true,
    };
  },
};
</script>

<style lang="scss">
.focus {
  z-index: 1;
}
</style>
