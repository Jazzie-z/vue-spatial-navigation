<template>
  <div class="channels">
    <Background />
    <!-- <div class="section">        
        <List
            v-if="section.data"
            :child="child"
            :items="section.data"
            :isFocused="isFocused && focusedIndex===0"
            :shouldScroll="true"
            :scrollLimit="section.data.length - 5"
            v-on:onFocusChange="onFocusChange"
            v-on:onSelect="onSelect"
            id="livetv-section"
        />
        </div>
        <Carousel
            v-if="data"
            :items="data"
            :isFocused="isFocused && focusedIndex===1"
            :shouldScroll="true"
            :scrollLimit="section.data.length - 5"
            renderType="16x9"
            id="livetv-carousel"
        /> -->
    <List
      ref="verticalList"
      :child="child"
      :isFocused="isFocused"
      :items="channelData"
      orientation="VERTICAL"
      id="vertical-list"
      :disabled="loading"
      v-on:onFocusChange="onFocusChange"
    />
    {{ channelData.length }}
    <Loader class="loader" v-if="loading" />
    <NoContent v-if="noContent"></NoContent>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import List from "@/Focusable/List";
import MenuButton from "@/dstv/components/Core/MenuButton/MenuButton";
import Background from "@/dstv/components/Core/Background/Background";
import Loader from "@/dstv/components/Core/Loader/Loader";
import Carousel from "@/dstv/components/Collection/Carousel";
import Nav from "@/dstv/components/Collection/Nav";
import NoContent from "@/dstv/components/Core/NoContent/NoContent";
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
    List,
    Background,
    Loader,
    NoContent,
  },
  data() {
    return {
      child: [Nav, Carousel], //[MenuButton],
      focusedIndex: 0,
      isFocused: false,
      channelData: [],
    };
  },
  computed: mapState({
    section: (state) => state.section.livetv || {},
    loading: (state) => state.section.loading || state.channel.loading,
    data: (state) => state.channel.data,
    error: (state) => state.channel.error,
    noContent: (state) =>
      (!state.channel.data || !state.channel.data.length) &&
      !state.channel.error &&
      !state.channel.loading,
  }),
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
  },
  methods: {
    ...mapActions(["getSectionData", "getChannelData", "setError"]),
    decideFocusFromError(prevFocus) {
      if (prevFocus) this.isFocused = true;
      else this.setFocusToMenu();
    },
    fetchChannelData() {
      let url = this.section.data[0].endpoint;
      this.getChannelData(url);
    },
    useChannelData() {
      let index = this.channelData.findIndex(
        (item) => item.renderType === "16x9"
      );
      focusHandler.$emit("RESET_FOCUS", { id: "child-channel-carousel" });
      let payload = {
        items: this.data,
        shouldScroll: true,
        scrollLimit: this.data.length - 3,
        renderType: "16x9",
        id: "channel-carousel",
      };
      if (index > -1) {
        this.channelData.splice(index, 1, payload);
      } else {
        this.channelData.push(payload);
      }
    },
    useSectionData() {
      this.channelData.push({
        items: this.section.data,
        child: [MenuButton],
        shouldScroll: true,
        scrollLimit: this.section.data.length - 5,
        id: "section",
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
    onFocusChange({ item }) {
      if (item.endpoint) this.getChannelData(item.endpoint);
    },
    onSelect() {},
  },
  mounted() {
    if (!this.section.data) this.getSectionData("livetv");
    else {
      this.useSectionData();
      this.fetchChannelData();
    }
    registerFocusDispatcher(this.keyListener);
    enableNavigation({
      UP: () => {
        if (!this.$refs.verticalList.prevIndex) this.setFocusToMenu();
      },
      BACK: () => {
        console.error("BACK PRESSED");
      },
      DOWN: () => {
        // if(!this.focusedIndex && this.data.length) this.focusedIndex = 1
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
/deep/ .vertical .list {
  white-space: nowrap;
  padding-left: 125px;
}
</style>
