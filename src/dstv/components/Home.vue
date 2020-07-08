<template>
  <div class="home" v-bind:class="{ animate: animate, focus: isFocused }">
    <List
      ref="verticalCarousel"
      :child="child"
      :isFocused="isFocused"
      :items="items"
      :shouldScroll="shouldScroll"
      orientation="VERTICAL"
      v-on:onFocusChange="onFocusChange"
    />
    <Loader class="loader" v-if="!items.length && !error" />
    <div class="error">{{ error }}</div>
  </div>
</template>

<script>
import List from "@/components/Focusable/List";
import Carousel from "./Collection/Carousel";
// import Poster from "./Container/Card/Poster";
import Loader from "./Core/Loader/Loader";
import { focusHandler } from "../../main";
import { enableNavigation, disableNavigation } from "@/focus/event";
export default {
  components: {
    List,
    Loader,
  },
  data() {
    return {
      items: [],
      child: Carousel,
      shouldScroll: true,
      isFocused: false,
      animate: false,
      error: "",
    };
  },
  methods: {
    prepareHomeData(data) {
      if (data) {
        this.items = data
          .filter((item) => item.editorialListType === "Catchup")
          .map(({ editorialItems, name }) => ({
            items: editorialItems.map(({ image }) => ({ src: image.LARGE })),
            title: name,
          }));
      }
      console.error(data);
    },
    toggleAnimation() {
      this.animate = !this.animate;
    },
    keyDownHandler(ev) {
      let keys = ["200", "195", "81", "13"];
      if (keys.includes(ev.keyCode.toString())) this.toggleAnimation();
    },
    keyListener({ component, accepted }) {
      if (component === "MAIN_COMPONENT" && this.items.length) {
        if (!accepted) {
          focusHandler.$emit("FOCUS_CHANGE", {
            component: "MAIN_COMPONENT",
            accepted: true,
          });
        } else {
          this.isFocused = true;
        }
      }
    },
    onFocusChange({ newIndex }) {
      console.log("CALLED HERE IN FOCUS CHANGE", newIndex);
    },
  },
  created() {
    fetch(
      "https://now.dstv.com/api/cs-mobile/editorial/v6/getEditorialsForHome;productId=1b09957b-27aa-493b-a7c9-53b3cec92d63;platformId=32faad53-5e7b-4cc0-9f33-000092e85950;packageId=3e6e5480-8b8a-4fd5-9721-470c895f91e2",
      {
        headers: {
          authorization: "aa56fa8a-fd0e-4b9b-b26e-b8acb8d40e30",
        },
      }
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.items) this.prepareHomeData(data.items);
        else this.error = data;
      });
    window.addEventListener("keydown", this.keyDownHandler);
  },
  mounted() {
    focusHandler.$on("FOCUS_CHANGE", this.keyListener);
    enableNavigation({
      UP: () => {
        if (
          this.$refs.verticalCarousel &&
          this.$refs.verticalCarousel.prevIndex === 0
        ) {
          focusHandler.$emit("FOCUS_CHANGE", { component: "MENU" });
          this.isFocused = false;
        }
      },
      preCondition: () => this.isFocused,
      id: "home",
    });
  },
  destroyed() {
    focusHandler.$off("FOCUS_CHANGE", this.keyListener);
    window.addEventListener("keydown", this.keyDownHandler);
    disableNavigation("home");
  },
};
</script>

<style lang="scss">
.focus {
  opacity: 1 !important;
  transform: translateY(-116px);
}
.home {
  background-image: url("../assets/img/leanback_bg.jpg");
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
