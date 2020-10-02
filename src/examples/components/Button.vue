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

<style lang="css" scoped>
.button {
  padding: 30px;
  background: white;
  font-size: 24px;
  width: fit-content;
  white-space: nowrap;
}
.focus {
  background: #ff005e;
  color: white;
}
.disabled {
  background: grey;
}
</style>
