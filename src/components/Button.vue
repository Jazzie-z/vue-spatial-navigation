<template>
  <div class="button" v-bind:class="{ focus: isFocused, disabled }">
    {{ title }}
  </div>
</template>

<script>
export default {
  props: ["title", "isFocused", "disabled"],
};
</script>

<style lang="scss" scoped>
.button {
  padding: 40px;
  background: white;
  font-size: 32px;
  color: black;
}
.focus {
  background: #ff005e;
  color: white;
}
.disabled {
  background: grey;
}
</style>
