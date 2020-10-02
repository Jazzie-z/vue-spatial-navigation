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
import List from "@/components/Focusable/List";
import Card from "@/components/Card";
import { carouselData } from '@/components/Example/mock';
export default {
  components: {
    List,
  },
  data() {
    return {
      items: carouselData[0].map((item) => ({ items: item, height:'300px' })),
      Card: Card,
      shouldScroll: true,
    };
  },
};
</script>

<style lang="scss" scoped></style>
