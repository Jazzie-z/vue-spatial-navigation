<template>
  <div class="container">
    <img :src="src" v-bind:class="{ focus: isFocused }" />
  </div>
</template>

<script>
export default {
  props: ["src", "isFocused", "disabled"],
};
</script>

<style lang="scss" scoped>
.container {
  width: 220px;
  height: 300px;
  box-sizing: border-box;
}
img {
  padding: 10px;
  width: 200px;
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
