<template>
  <div class="button" v-bind:class="{ focus: isFocused }">
    <div class="title">
      <div>{{ displayName }}</div>
    </div>
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  props: ["displayName", "isFocused"],
};
</script>

<style lang="scss" scoped>
.button {
  background: rgba(0, 0, 0, 0.4);
  border-radius: 100px;
  margin: 36.6px 7px 0;
  padding: 10px 42px 10px 42.6px;
}
.title {
  color: #f1f1f1;
  font-size: 16px;
  letter-spacing: 0;
  opacity: 0.6;
  -webkit-transition-duration: 0.25s;
  transition-duration: 0.25s;
  -webkit-transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1.05);
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1.05);
}
.button.focus {
  background: #000000 !important;
  color: white !important;
  .title {
    font-size: 16px;
    opacity: 1;
    -ms-transform: scale(1.3, 1.3);
    -webkit-transform: scale(1.3, 1.3);
    transform: scale(1.3, 1.3);
  }
}
</style>
