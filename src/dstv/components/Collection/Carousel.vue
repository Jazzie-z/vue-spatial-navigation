<template>
  <div class="carousel">
    <div class="title" :v-if="isFocused">{{ title }}</div>
    <List
      :child="child"
      :isFocused="isFocused"
      :items="items"
      :shouldScroll="true"
      :id="id"
      :scrollLimit="scrollLimit || items.length - 5"
    />
  </div>
</template>

<script>
import List from "@/Focusable/List";
import Poster from "../Container/Card/Poster";
import Channel from "../Container/Card/Channel";
const Cards = {
  poster: Poster,
  "16x9": Channel,
};
export default {
  props: ["isFocused", "items", "id", "title", "renderType", "scrollLimit"],
  components: {
    List,
  },
  data() {
    return {
      child: [Cards[this.renderType]],
    };
  },
};
</script>

<style lang="scss" scoped>
.carousel {
  display: flex;
  flex-direction: column;
  align-items: baseline;
}
.title {
  color: white;
  margin-top: 30px;
  font-size: 24px;
}
.list .focus {
  margin-top: 20px;
}
</style>
