<template>
  <div>
    <img :src="items" v-bind:class="{ focus: isFocused }" />
  </div>
</template>

<script>
export default {
  props: ["items", "isFocused"],
};
</script>

<style lang="scss" scoped>
img {
  padding: 0 10px;
}
.focus {
  transform: scale(1.2);
}
</style>
