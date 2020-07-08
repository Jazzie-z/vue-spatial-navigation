<template>
  <div class="container" v-bind:class="{ focus: isFocused }">
    {{ displayName }}
  </div>
</template>

<script>
import { enableNavigation, disableNavigation } from "@/focus/event";
export default {
  props: ["id", "displayName", "isFocused"],
  mounted() {
    enableNavigation({
      SELECT: () => {
        this.$emit("onSelect", this.$props);
      },
      preCondition: () => this.isFocused,
      id: this.id,
    });
  },
  destroyed() {
    disableNavigation(this.id);
  },
};
</script>

<style lang="scss" scoped>
.container {
  color: #fff;
  display: inline-block;
  font-size: 32px;
  padding: 68px 36px;
  opacity: 0.3;
  transition-duration: 0.25s;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1.05);
  font-size: 21px;
  padding: 45px 24px;
}
.focus {
  filter: brightness(100%);
  border: none;
  transform: translateZ(0) scale(1.3);
  opacity: 1;
}
</style>
