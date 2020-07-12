<template>
  <div class="channels">
    <Dynamic renderType="Background" />
    <div class="title">{{ title }}</div>
    <Dynamic
      ref="verticalList"
      :child="child"
      :isFocused="isFocused"
      :items="channelData"
      orientation="VERTICAL"
      id="vertical-list"
      :disabled="loading"
      v-on:onFocusChange="onFocusChange"
      renderType="List"
    />
    <div class="overlay" v-bind:class="{ show: hideSection }"></div>
    <Dynamic renderType="Loader" v-if="loading" />
    <Dynamic v-if="noContent" renderType="NoContent" />
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
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

export default {
  components: {
    Dynamic: () => import("@/dstv/components/Dynamic"),
  },
  data() {
    return {
      child: [Dynamic, Dynamic], //[MenuButton],
      focusedIndex: 0,
      isFocused: false,
      channelData: [],
      hideSection: false,
      title: "",
    };
  },
  updated() {
    // console.error(this.$router)
  },
  computed: {
    ...mapState({
      section: (state) => state.section.livetv || {},
      loading: (state) => state.section.loading || state.channel.loading,
      data: (state) => state.channel.data,
      error: (state) => state.channel.error,
      noContent: (state) =>
        (!state.channel.data || !state.channel.data.length) &&
        !state.channel.error &&
        !state.section.loading &&
        !state.channel.loading,
    }),
  },
  watch: {
    section(newValue, oldValue) {
      if (newValue.data && !oldValue.data) {
        this.useSectionData();
        this.fetchChannelData();
      }
    },
    data(newValue) {
      if (newValue) {
        this.useChannelData();
      }
    },
    error(newValue) {
      if (newValue) {
        let prevFocus = this.isFocused;
        let onRetry = ((prevFocus) => () => {
          this.fetchChannelData();
          this.decideFocusFromError(prevFocus);
        })(prevFocus);
        let onBack = ((prevFocus) => () => {
          this.decideFocusFromError(prevFocus);
        })(prevFocus);
        this.setError({ onRetry, onBack });
        this.isFocused = false;
      }
    },
    hideSection() {
      this.useSectionData();
    },
  },
  methods: {
    ...mapActions(["getSectionData", "getChannelData", "setError"]),
    decideFocusFromError(prevFocus) {
      if (prevFocus) this.isFocused = true;
      else this.setFocusToMenu();
    },
    fetchChannelData() {
      let initialSection = this.section.data[0];
      this.title = initialSection.displayName;
      this.getChannelData(initialSection.endpoint);
    },
    useChannelData() {
      let index = this.channelData.findIndex(
        (item) => item.renderType === "SmartCarousel"
      );
      focusHandler.$emit("RESET_FOCUS", { id: "child-channel-carousel" });
      let payload = {
        items: this.data.slice(0, 14),
        shouldScroll: true,
        scrollLimit: this.data.length - 3,
        renderType: "SmartCarousel",
        id: "channel-carousel",
        maxVisibility: 5,
      };
      if (index > -1) {
        this.channelData.splice(index, 1, payload);
      } else {
        this.channelData.push(payload);
      }
    },
    useSectionData() {
      this.channelData.splice(0, 1, {
        items: this.section.data,
        child: [Dynamic],
        shouldScroll: true,
        scrollLimit: this.section.data.length - 5,
        id: "section",
        renderType: "Nav",
        shouldHide: this.hideSection,
      });
    },
    keyListener({ component, accepted }) {
      if (component === COMPONENTS.MAIN_COMPONENT && this.section.data) {
        if (!accepted) {
          dispatchFocus({
            component: COMPONENTS.MAIN_COMPONENT,
            accepted: true,
          });
        } else {
          this.isFocused = true;
          this.focusedIndex = 0;
        }
      }
    },
    setFocusToMenu() {
      dispatchFocus({ component: COMPONENTS.MENU });
      this.isFocused = false;
      this.focusedIndex = 0;
    },
    onFocusChange({ item, newIndex, id }) {
      if (item.endpoint) {
        this.title = item.displayName;
        this.getChannelData(item.endpoint);
      }
      if (id === "section" || (id === "vertical-list" && newIndex === 0)) {
        this.hideSection = false;
      } else {
        this.hideSection = true;
      }
    },
    onSelect() {},
  },
  created() {
    if (!this.section.data) this.getSectionData("livetv");
    else {
      this.useSectionData();
      this.fetchChannelData();
    }
    registerFocusDispatcher(this.keyListener);
    enableNavigation({
      UP: () => {
        if (!this.$refs.verticalList.$children[0].focusedIndex)
          this.setFocusToMenu();
      },
      BACK: () => {
        console.error("BACK PRESSED");
      },
      preCondition: () => this.isFocused,
      id: "livetv",
    });
  },
  destroyed() {
    unRegisterFocusDispatcher(this.keyListener);
    disableNavigation("livetv");
  },
};
</script>

<style lang="scss" scoped>
.channels {
  position: fixed;
  top: 0;
  width: 1280px;
}
.title {
  position: absolute;
  top: 55px;
  color: #9b9b9b;
  width: 100%;
  font-size: 24px;
}
/deep/ .vertical {
  .list,
  .smart-carousel {
    white-space: nowrap;
    padding-left: 125px;
  }
}
.overlay {
  height: 100vh;
  width: 100%;
  background: black;
  opacity: 0.5;
  position: absolute;
  top: 0;
  transform: translateY(116px);
  transition: transform 0.5s;
}
.show {
  transform: translateY(0);
  opacity: 0;
}
</style>
