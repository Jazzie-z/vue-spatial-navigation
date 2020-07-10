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
        :scrollLimit="data.length - 1"
      />
    </div>
    <Loader class="loader" v-if="loading" />
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
      // error: "",
    };
  },
  computed: mapState({
    data: (state) => state.home.data || [],
    loading: (state) => state.menu.loading || state.home.loading,
    error: (state) => state.home.error,
    isMenuLoaded: (state) => state.menu.data && state.menu.data.length,
  }),
  watch: {
    isMenuLoaded(newValue, oldValue) {
      if (newValue && !oldValue) this.getHomeData();
    },
    error(newValue) {
      if (newValue) {
        this.setError({
          onRetry: () => {
            this.getHomeData();
            this.setFocusToMenu();
          },
          onBack: () => this.setFocusToMenu(),
        });
      }
    },
  },
  methods: {
    ...mapActions(["getHomeData", "setError"]),
    toggleAnimation() {
      this.animate = !this.animate;
    },
    keyDownHandler(ev) {
      let keys = ["200", "195", "81", "13"];
      if (keys.includes(ev.keyCode.toString())) this.toggleAnimation();
    },
    keyListener({ component, accepted }) {
      console.error("CALLED", this.isFocused);

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
    checkAndStopVerticalScroll({ prevIndex, newIndex }) {
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
    onFocusChange({ prevIndex, newIndex }) {
      this.checkAndStopVerticalScroll({ prevIndex, newIndex });
    },
    onSelect(item) {
      console.log("CALLED HERE IN SELECT", item);
    },
    setFocusToMenu() {
      dispatchFocus({ component: COMPONENTS.MENU });
      this.isFocused = false;
    },
    isFirstCarouselFocused() {
      return (
        this.$refs.verticalCarousel &&
        this.$refs.verticalCarousel.prevIndex === 0
      );
    },
  },
  created() {
    window.addEventListener("keydown", this.keyDownHandler);
  },
  mounted() {
    if (this.isMenuLoaded && !this.data.length) this.getHomeData();
    registerFocusDispatcher(this.keyListener);
    enableNavigation({
      UP: () => {
        if (this.isFirstCarouselFocused()) this.setFocusToMenu();
      },
      BACK: () => this.setFocusToMenu(),
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
</style>
