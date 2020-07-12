<template>
  <div class="menu" v-bind:class="{ hide: !isFocused }">
    <Nav
      v-if="menuData.length"
      :items="menuData"
      :isFocused="isFocused"
      v-on:onFocusChange="onFocusChange"
      v-on:onSelect="onSelect"
      id="menu"
    />
  </div>
</template>

<script>
import Nav from "@/dstv/components/Collection/Nav";
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
    Nav,
  },
  data() {
    return {
      isFocused: true,
    };
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
          if (accepted) this.isFocused = false;
          break;
        case COMPONENTS.MENU:
          this.isFocused = true;
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
        this.setError({
          onRetry: () => console.error("SHOULD EXIT NOW"),
          onBack: () => dispatchFocus({ component: COMPONENTS.MENU }),
          type: "EXIT",
        });
        this.isFocused = false;
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
  transition: transform 0.5s;
  z-index: 5;
  position: relative;
}
.hide {
  transform: translateY(-116px);
}
</style>
