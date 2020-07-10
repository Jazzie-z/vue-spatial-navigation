<template>
  <div class="home" v-bind:class="{ animate: animate, focus: isFocused }">
    <div class="carousel-wrapper">
      <List
        ref="verticalCarousel"
        :child="child"
        :isFocused="isFocused"
        :items="data"
        :shouldScroll="shouldScroll"
        orientation="VERTICAL"
        v-on:onFocusChange="onFocusChange"
        v-on:onSelect="onSelect"
        id="vertical-carousel"
      />
    </div>
    <Loader class="loader" v-if="loading" />
    <div class="error">{{ error }}</div>
  </div>
</template>

<script>
import List from "@/Focusable/List";
import Carousel from "./Collection/Carousel";
import Loader from "./Core/Loader/Loader";
import {
  enableNavigation,
  disableNavigation,
  dispatchFocus,
  registerFocusDispatcher,
  unRegisterFocusDispatcher,
} from "@/Focusable/event";
import { COMPONENTS } from "@/dstv/constants/focusEvent";
import { mapState, mapActions } from "vuex";
export default {
  components: {
    List,
    Loader,
  },
  data() {
    return {
      child: [Carousel],
      shouldScroll: true,
      isFocused: false,
      animate: false,
      error: "",
    };
  },
  computed: mapState({
    data: (state) => state.home.data,
    loading: (state) => state.menu.loading || state.home.loading,
    menuData: (state) => state.menu.data,
  }),
  watch: {
    menuData(newValue, oldValue) {
      if (newValue.length && !oldValue.length) this.getHomeData();
    },
  },
  methods: {
    ...mapActions(["getHomeData"]),
    toggleAnimation() {
      this.animate = !this.animate;
    },
    keyDownHandler(ev) {
      let keys = ["200", "195", "81", "13"];
      if (keys.includes(ev.keyCode.toString())) this.toggleAnimation();
    },
    keyListener({ component, accepted }) {
      if (component === COMPONENTS.MAIN_COMPONENT && this.data.length) {
        if (!accepted) {
          dispatchFocus({
            component: COMPONENTS.MAIN_COMPONENT,
            accepted: true,
          });
        } else {
          this.isFocused = true;
        }
      }
    },
    onFocusChange({ prevIndex, newIndex }) {
      if (newIndex > prevIndex) {
        if (newIndex > this.data.length - 3 && this.shouldScroll) {
          this.shouldScroll = false;
        } else if (!this.shouldScroll) {
          this.shouldScroll = true;
        }
      } else {
        if (newIndex > this.data.length - 2 && this.shouldScroll) {
          this.shouldScroll = false;
        } else if (!this.shouldScroll) {
          this.shouldScroll = true;
        }
      }
    },
    onSelect(item) {
      console.log("CALLED HERE IN SELECT", item);
    },
  },
  created() {
    window.addEventListener("keydown", this.keyDownHandler);
  },
  mounted() {
    registerFocusDispatcher(this.keyListener);
    enableNavigation({
      UP: () => {
        if (
          this.$refs.verticalCarousel &&
          this.$refs.verticalCarousel.prevIndex === 0
        ) {
          dispatchFocus({ component: COMPONENTS.MENU });
          this.isFocused = false;
        }
      },
      BACK: () => {
        dispatchFocus({ component: COMPONENTS.MENU });
        this.isFocused = false;
      },
      preCondition: () => this.isFocused,
      id: "home",
    });
  },
  destroyed() {
    unRegisterFocusDispatcher(this.keyListener);
    window.addEventListener("keydown", this.keyDownHandler);
    disableNavigation("home");
  },
};
</script>

<style lang="scss" scoped>
.focus {
  opacity: 1 !important;
  transform: translateY(-116px);
}
.home {
  display: flex;
  flex-direction: column;
  background-image: url("../assets/img/leanback_bg.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  opacity: 0.5;
  transition: transform 0.5s;
  height: 100vh;
}
.carousel-wrapper {
  margin-top: 72px;
  padding-left: 128px;
  overflow: hidden;
}
.animate {
  background: #1e3059;
  * {
    transition-duration: 0.5s;
  }
}
.loader {
  position: absolute !important;
  top: 50%;
  left: 50%;
  transform: scale(1.1);
}
.error {
  color: red;
  font-size: 32px;
}
</style>
