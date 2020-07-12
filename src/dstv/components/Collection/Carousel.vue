<template>
  <div class="carousel">
    <div class="title" v-if="title">{{ title }}</div>
    <Dynamic v-bind="$attrs" renderType="SmartCarousel" v-on="$listeners" />
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  props: ["title"],
  components: {
    Dynamic: () => import("@/dstv/components/Dynamic"),
  },
};
</script>

<style lang="scss" scoped>
.carousel {
  display: flex;
  flex-direction: column;
  align-items: baseline;
  height: 265px;
  margin-bottom: 30px;
}
.title {
  color: white;
  font-size: 24px;
}
.smart-carousel .focus {
  margin-top: 30px;
}
.smart-carousel {
  margin-top: 30px;
}
</style>
