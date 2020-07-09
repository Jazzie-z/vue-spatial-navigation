<template>
  <div class="menu" v-bind:class="{ hide: !isFocused }">
    <List
      v-if="items.length"
      :child="child"
      :items="items"
      :isFocused="isFocused"
      v-on:onFocusChange="onFocusChange"
      v-on:onSelect="onSelect"
      id="menu"
    />
  </div>
</template>

<script>
import { ENV, HEADER } from "@/dstv/constants/environment";
import List from "@/components/Focusable/List";
import MenuButton from "@/dstv/components/Core/MenuButton/MenuButton";
import { focusHandler } from "../../main";
import { enableNavigation, disableNavigation } from "@/focus/event";
export default {
  components: {
    List,
  },
  data() {
    return {
      items: [],
      child: [MenuButton],
      isFocused: true,
    };
  },
  methods: {
    onFocusChange({ item }) {
      this.$router.push(item.id).catch((err) => {
        console.error(err);
      });
    },
    onSelect() {
      focusHandler.$emit("FOCUS_CHANGE", { component: "MAIN_COMPONENT" });
    },
    keyListener({ component, accepted }) {
      if (component === "MAIN_COMPONENT" && accepted) {
        this.isFocused = false;
      }
      if (component === "MENU") {
        this.isFocused = true;
      }
    },
    menuTransform(data) {
      if (data && data.length) {
        let menuData = {
          home: "Home",
          livetv: "Live TV",
          catchup: "Catch Up",
          mylist: "My List",
          search: "Search",
          settings: "Settings",
        };
        let menuOrder = [
          "home",
          "livetv",
          "catchup",
          "mylist",
          "search",
          "settings",
        ];
        let result = [];
        data.forEach((item) => {
          if (menuOrder.includes(item.id) && item.visible)
            result.push({ id: item.id, displayName: menuData[item.id] });
        });
        result.splice(
          result.findIndex((item) => item.id === "settings"),
          0,
          { id: "search", visible: true, displayName: menuData.search }
        );
        this.items = result;
      }
    },
  },
  created() {
    fetch(ENV.MENU, HEADER())
      .then((res) => res.json())
      .then((data) => this.menuTransform(data));
  },
  mounted() {
    focusHandler.$on("FOCUS_CHANGE", this.keyListener);
    enableNavigation({
      DOWN: () => {
        focusHandler.$emit("FOCUS_CHANGE", { component: "MAIN_COMPONENT" });
      },
      preCondition: () => this.isFocused,
      id: "menu",
    });
  },
  destroyed() {
    disableNavigation("menu");
    focusHandler.$off("FOCUS_CHANGE", this.keyListener);
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
