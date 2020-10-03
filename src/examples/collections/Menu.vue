<template>
  <div class="menu">
    <List
      :items="items"
      :child="MenuButton"
      :isFocused="isFocused"
      id="menu"
      v-on:onFocusChange="onFocusChange"
    />
  </div>
</template>

<script>
import List from "@/focusable/List";
import MenuButton from "@/examples/components/MenuButton";
import { menuData } from "@/examples/mock/mock";
import {
  enableNavigation,
  disableNavigation,
  dispatchFocus,
  focusHandler,
  registerFocusDispatcher,
  unRegisterFocusDispatcher,
} from "@/event-bus";
export default {
  components: {
    List,
  },
  data() {
    return {
      items: menuData,
      MenuButton: MenuButton,
      isFocused: true,
    };
  },
  methods: {
    keyListener({ component, accepted }) {
      switch (component) {
        case "MAIN_COMPONENT":
          if (accepted) {
            this.isFocused = false;
          }
          break;
        case "MENU":
          this.isFocused = true;
          break;
        default:
          break;
      }
    },
    onFocusChange({ item }) {
      if (this.$router.currentRoute.hash.split("#/").pop() !== item.path) {
        console.error(
          this.$router.currentRoute.hash.split("#/").pop(),
          item.path
        );
        this.$router.push(`/app/#${item.path}`).catch((err) => {
          console.error(err);
        });
      }
    },
  },
  mounted() {
    registerFocusDispatcher(this.keyListener);
    enableNavigation({
      DOWN: () => {
        dispatchFocus({ component: "MAIN_COMPONENT" });
        return true;
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

<style scoped>
.menu {
  margin-top: 20px;
  margin-left: 20px;
}
div {
  z-index: 3;
  position: absolute;
  top: 0;
  left: 0;
}
</style>
