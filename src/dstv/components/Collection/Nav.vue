<template>
  <div class="nav-list">
    <List
      :child="child"
      :items="items"
      :isFocused="isFocused"
      :shouldScroll="shouldScroll"
      :scrollLimit="scrollLimit"
      :id="id"
    />
  </div>
</template>

<script>
import List from "@/Focusable/List";
import MenuButton from "@/dstv/components/Core/MenuButton/MenuButton";
export default {
  props: ["items", "isFocused", "shouldScroll", "scrollLimit", "id"],
  components: {
    List,
  },
  data() {
    return {
      child: [MenuButton],
    };
  },
};
</script>

<style lang="scss" scoped>
.nav-list {
  background: #000000;
  height: 116px;
  position: relative;
  transition: transform 0.5s;
  .list {
    text-align: center;
    align-items: center;
    justify-content: center;
  }
}
</style>
