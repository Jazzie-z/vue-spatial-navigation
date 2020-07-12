<template>
  <div class="container" v-bind:class="{ focus: isFocused }">
    <div class="title-container">
      <img
        :src="channelLogo"
      />
      <div class="number">{{channelNumber}}</div>
    </div>
    <div class="image-container">
      <img
        :src="image"
      />
    </div>
    <div class="info-container">
      <div class="title">{{title}}</div>
      <div class="progress">
        <div class="progress-bar">
          <div></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  props: ["isFocused","title","image","channelNumber","channelLogo"],
};
</script>

<style lang="scss" scoped>
.container {
  width: 240px;
  min-height: 227.3px;
  margin-right: 21.33px;
}
.title-container {
  height: 50px;
  background: #1b1b1b;
  padding: 0.25rem;
  position: relative;
  text-align: center;
  img {
    height: 44.59px;
    width: auto;
    opacity: 0.6;
    margin: 0 auto;
  }
  .number {
    font-size: 16px;
    right: 0.416em;
    color: #9b9b9b;
    letter-spacing: 0.5px;
    position: absolute;
    top: 0.375em;
  }
}
.image-container {
  background-color: rgba(0, 0, 0, 0.5) !important;
  height: 135px;
  width: 240px;
  display: flex;
  flex: 0 1 auto;
  justify-content: center;
  align-items: center;
  position: relative;
  img {
    width: 240px;
    height: 135px;
    filter: brightness(0.5);
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    flex: 0 1 auto;
  }
}
.info-container {
  height: 42px;
  color: #9b9b9b;
  position: relative;
  padding-top: 10px;
  overflow: hidden;
  .title {
    font-size: 17px;
    margin-bottom: 0px;
    padding-left: 10px;
    padding-bottom: 8.9px;
    color: #9b9b9b;
    font-weight: bold;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    text-align: left;
  }
}
.focus {
  transform: scale(1.1, 1.1);
  box-shadow: rgba(0, 0, 0, 0.7) 0px 8px 40px 3px;
  filter: brightness(100%);
}
</style>
