<template>
  <div class="home" v-bind:class="{ animate: animate, focus: isFocused }">
    <List
      ref="verticalCarousel"
      :child="child"
      :isFocused="isFocused"
      :items="homeData"
      :shouldScroll="shouldScroll"
      orientation="VERTICAL"
      v-on:onFocusChange="onFocusChange"
      v-on:onSelect="onSelect"
      id="vertical-carousel"
    />
    <Loader class="loader" v-if="homeLoading && !error" />
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
import { mapGetters, mapActions } from "vuex";
export default {
  components: {
    List,
    Loader,
  },
  data() {
    return {
      items: [],
      child: [Carousel],
      shouldScroll: true,
      isFocused: false,
      animate: false,
      error: "",
    };
  },
  computed: {
    ...mapGetters(["homeData", "homeLoading"]),
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
      if (component === COMPONENTS.MAIN_COMPONENT && this.homeData.length) {
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
    onFocusChange(item) {
      console.log("CALLED HERE IN FOCUS CHANGE", item);
    },
    onSelect(item) {
      console.log("CALLED HERE IN SELECT", item);
    },
  },
  created() {
    this.getHomeData();
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
  background-image: url("../assets/img/leanback_bg.jpg");
  background-repeat: no-repeat;
  opacity: 0.5;
  transition: transform 0.5s;
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
