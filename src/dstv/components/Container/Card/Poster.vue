<template>
  <div class="container">
    <img :src="src" v-bind:class="{ focus: isFocused }" />
  </div>
</template>

<script>
import Selectable from "@/Focusable/Selectable";
export default {
  extends: Selectable,
  inheritAttrs: false,
  props: ["id", "src", "isFocused", "disabled"],
};
</script>

<style lang="scss" scoped>
.container {
  width: 173px;
  height: 218px;
  box-sizing: border-box;
}
img {
  width: 157px;
  filter: brightness(0.5);
}
.focus {
  transform: scale(1.2);
  z-index: 2;
  position: relative;
  filter: brightness(1);
}
.disabled {
  opacity: 0.5;
  filter: grayscale(1);
}
</style>
