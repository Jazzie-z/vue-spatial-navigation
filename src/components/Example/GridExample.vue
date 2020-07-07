<template>
  <Grid
    :child="Card"
    :isFocused="true"
    :items="items"
    :shouldScroll="true"
    :maxColumn="4"
  />
</template>

<script>
import Grid from "@/components/Focusable/Grid";
import Card from "@/components/Card";
import { mockImage } from "@/mock";
export default {
  props: ["shouldScroll"],
  components: {
    Grid,
  },
  data() {
    return {
      items: [...new Array(23)].map(() => ({ items: mockImage[0] })),
      Card: Card,
    };
  },
};
</script>

<style lang="scss" scoped>
.grid {
  width: 1000px;
}
</style>
