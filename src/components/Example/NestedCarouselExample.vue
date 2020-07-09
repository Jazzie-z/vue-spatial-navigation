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
import { mockImage } from "@/mock";
export default {
  components: {
    List,
  },
  data() {
    return {
      items: [
        {
          child: [Card],
          shouldScroll: true,
          items: mockImage.map((item) => ({ items: item })),
        },
        {
          child: [Card],
          shouldScroll: true,
          disabledIndex: [1],
          items: mockImage.map((item) => ({ items: item })),
        },
      ],
      child: [List],
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
