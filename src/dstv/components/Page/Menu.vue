<template>
  <div class="menu">
    <Dynamic
      v-if="menuData.length"
      :items="menuData"
      :isFocused="isFocused"
      v-on:onFocusChange="onFocusChange"
      v-on:onSelect="onSelect"
      id="menu"
      renderType="Nav"
      :shouldHide="shouldHide"
    />
  </div>
</template>

<script>
import Dynamic from "@/dstv/components/Dynamic";
import {
  enableNavigation,
  disableNavigation,
  dispatchFocus,
  focusHandler,
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
      isFocused: true,
      shouldHide: false,
    };
  },
  updated() {
    // console.error(this.shouldHide)
  },
  computed: mapState({
    menuData: (state) => state.menu.data || [],
    menuError: (state) => state.menu.error,
    anyError: (state) => state.error,
  }),
  watch: {
    menuError(newValue) {
      if (newValue)
        this.setError({
          onRetry: () => this.getMenuData(),
          onBack: () => {
            alert("should exit");
          },
          exit: true,
        });
    },
    anyError(newValue) {
      if (newValue && this.isFocused) this.isFocused = false;
    },
  },
  methods: {
    ...mapActions(["getMenuData", "setError"]),
    onFocusChange({ item }) {
      console.error("focus changed called");
      this.$router.push(`/${item.id}`).catch((err) => {
        console.error(err);
      });
    },
    onSelect() {
      dispatchFocus({ component: COMPONENTS.MAIN_COMPONENT });
    },
    keyListener({ component, accepted }) {
      switch (component) {
        case COMPONENTS.MAIN_COMPONENT:
          if (accepted) {
            this.isFocused = false;
            this.shouldHide = true;
          }
          break;
        case COMPONENTS.MENU:
          this.isFocused = true;
          this.shouldHide = false;
          break;
        case COMPONENTS.EXIT:
          alert("SHOULD EXIT NOW");
          break;
        default:
          break;
      }
    },
  },
  created() {
    this.getMenuData();
  },
  mounted() {
    registerFocusDispatcher(this.keyListener);
    enableNavigation({
      DOWN: () => {
        dispatchFocus({ component: COMPONENTS.MAIN_COMPONENT });
        return true;
      },
      BACK: () => {
        if (this.$route.path.split("/").pop() === "home") {
          this.setError({
            onRetry: () => console.error("SHOULD EXIT NOW"),
            onBack: () => dispatchFocus({ component: COMPONENTS.MENU }),
            type: "EXIT",
          });
          this.isFocused = false;
        } else {
          focusHandler.$emit("SET_FOCUS", { id: "menu", index: 0 });
        }
      },
      preCondition: () => this.isFocused,
      id: "menu",
    });
  },
  destroyed() {
    disableNavigation("menu");
    unRegisterFocusDispatcher(this.keyListener);
  },
};
</script>

<style lang="scss" scoped>
.menu {
  z-index: 5;
  position: relative;
}
</style>
