<template>
  <div class="label">
    {{ title }}
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "No Content Available.",
    },
  },
};
</script>

<style lang="scss" scoped>
.label {
  color: white;
  z-index: 0;
  position: fixed;
  top: 50%;
  text-align: center;
  width: 100%;
  font-size: 20px;
}
</style>
