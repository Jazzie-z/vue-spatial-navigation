<template>
  <fragment>
    <div class="home" v-bind:class="{ focus: isFocused }">
      <div class="carousel-wrapper">
        <Dynamic
          ref="verticalCarousel"
          :child="child"
          :isFocused="isFocused"
          :items="data"
          orientation="VERTICAL"
          id="vertical-carousel"
          renderType="SmartCarousel"
          :maxVisibility="3"
          v-on:onFocusChange="onFocusChange"
        />
      </div>
    </div>
    <Dynamic v-if="loading" renderType="Loader" />
  </fragment>
</template>

<script>
import Dynamic from "@/dstv/components/Dynamic";
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
    Dynamic,
  },
  data() {
    return {
      child: [Dynamic],
      isFocused: false,
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
    onFocusChange(item) {
      console.error("focus changed", item);
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
    setFocusToMenu() {
      dispatchFocus({ component: COMPONENTS.MENU });
      this.isFocused = false;
    },
    isFirstCarouselFocused() {
      return (
        this.$refs.verticalCarousel &&
        this.$refs.verticalCarousel.$children[0] &&
        // this.$refs.verticalCarousel.$children[0].prevIndex === 0 &&
        // this.$refs.verticalCarousel.$children[0].startIndex === 0
        this.$refs.verticalCarousel.$children[0].endReached
      );
    },
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
  background-image: url("../../assets/img/leanback_bg.jpg");
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
</style>
