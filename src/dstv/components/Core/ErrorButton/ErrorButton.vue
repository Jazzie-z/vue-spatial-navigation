<template>
  <div class="button" v-bind:class="{ focus: isFocused }">
    {{ displayName }}
  </div>
</template>

<script>
import Selectable from "@/Focusable/Selectable";
export default {
  extends: Selectable,
  props: ["displayName", "isFocused", "action"],
};
</script>

<style lang="scss" scoped>
.button {
  background-color: transparent;
  border: 1px solid #ffffff;
  border-radius: 67px;
  display: inline-block;
  max-width: 600px;
  text-align: center;
  line-height: 1.22;
  font-weight: 500;
  font-size: 16px;
  margin: 8px 10.5px 0 10.5px;
  padding: 13px 0;
  width: 200px;
  color: white;
}
.focus {
  background-color: #0095da !important;
  border-color: #0095da !important;
}
</style>
