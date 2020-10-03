<template>
  <div class="channel-card" v-bind:class="{ focus: isFocused }">
    <img :src="image" />
    <div class="progress"></div>
    <div class="title">{{ title }}</div>
  </div>
</template>

<script>
export default {
  props: ["image", "title", "isFocused"],
};
</script>

<style lang="css" scoped>
.channel-card {
  margin: 10px;
  display: flex;
  flex-direction: column;
}
img {
  width: 250px;
  height: 150px;
}
.focus {
  transform: scale(1.1);
  z-index: 2;
  position: relative;
  border: 1px solid white;
}
.progress {
  height: 2px;
  width: 75%;
  background: #41b883;
}
.title {
  text-align: left;
  padding: 10px;
  background: #111014;
  color: #aaaaaa;
}
</style>
