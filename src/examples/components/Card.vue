<template>
  <div>
    <img :src="items" v-bind:class="{ focus: isFocused }" :style="{height:height}"/>
  </div>
</template>

<script>
export default {
  props: ["items", "isFocused", "disabled","height"],
};
</script>

<style lang="css" scoped>
img {
  padding: 10px;
  width: 200px;
  border: 1px solid transparent;
}
.focus {
  transform: scale(1.2);
  z-index: 2;
  position: relative;
  border: 1px solid white;
}
.disabled {
  opacity: 0.5;
  filter: grayscale(1);
}
</style>
