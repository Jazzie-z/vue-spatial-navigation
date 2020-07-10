<template>
  <div class="menu" v-bind:class="{ hide: !isFocused }">
    <List
      v-if="menuData.length"
      :child="child"
      :items="menuData"
      :isFocused="isFocused"
      v-on:onFocusChange="onFocusChange"
      v-on:onSelect="onSelect"
      id="menu"
    />
  </div>
</template>

<script>
import List from "@/Focusable/List";
import MenuButton from "@/dstv/components/Core/MenuButton/MenuButton";
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
  },
  data() {
    return {
      child: [MenuButton],
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
      this.$router.push(item.id).catch((err) => {
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
.list {
  background: #000000;
  height: 116px;
  position: relative;
  text-align: center;
  z-index: 5;
  -ms-flex-align: center;
  align-items: center;
  -ms-flex-pack: center;
  justify-content: center;
  transition: transform 0.5s;
}
.menu {
  transition: transform 0.5s;
}
.hide {
  transform: translateY(-116px);
}
</style>
