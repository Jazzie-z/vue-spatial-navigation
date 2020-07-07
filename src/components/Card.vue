<template>
  <div>
    <img :src="items" v-bind:class="{ focus: isFocused }" />
  </div>
</template>

<script>
export default {
  props: ["items", "isFocused", "disabled"],
};
</script>

<style lang="scss" scoped>
img {
  padding: 0 10px;
}
.focus {
  transform: scale(1.2);
}
.disabled {
  opacity: 0.5;
  filter: grayscale(1);
}
</style>
