<template>
  <div class="nav-list" v-bind:class="{ hide: shouldHide }">
    <Dynamic
      v-bind="this.$attrs"
      v-on="this.$listeners"
      :child="child"
      renderType="List"
    />
  </div>
</template>

<script>
import Dynamic from "@/dstv/components/Dynamic";
export default {
  props: ["shouldHide", "animate"],
  inheritAttrs: false,
  components: {
    Dynamic: () => import("@/dstv/components/Dynamic"),
  },
  data() {
    return {
      child: [Dynamic],
    };
  },
};
</script>

<style lang="scss" scoped>
.nav-list {
  background: #000000;
  height: 116px;
  position: relative;
  transition: transform 0.5s;
  .list {
    text-align: center;
    align-items: center;
    justify-content: center;
  }
}
.hide {
  transform: translateY(-116px);
}
</style>
