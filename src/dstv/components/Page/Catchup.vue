<template>
  <div>
    <Dynamic renderType="Background" v-bind:class="{ scroll: shouldScroll }" />
    <Dynamic
      ref="verticalList"
      :child="child"
      :isFocused="isFocused"
      :items="catchupData"
      orientation="VERTICAL"
      id="vertical-list"
      :disabled="disabled"
      v-on:onFocusChange="onFocusChange"
      renderType="List"
      v-bind:class="{ scroll: shouldScroll }"
    />
    <Dynamic renderType="Loader" v-if="loading" />
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Dynamic from "@/dstv/components/Dynamic";
import {
  enableNavigation,
  disableNavigation,
  dispatchFocus,
  //   focusHandler,
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
      child: [Dynamic, Dynamic],
      catchupData: [],
      isFocused: false,
      disabled: true,
      shouldScroll: false,
    };
  },
  computed: mapState({
    section: (state) => state.section.catchup || {},
    loading: (state) => state.section.loading || state.catchup.loading,
    data: (state) => state.catchup.data,
  }),
  watch: {
    section(newValue, oldValue) {
      if (newValue.data && !oldValue.data) {
        this.useSectionData();
        this.fetchCatchupData();
      }
    },
    data(newValue) {
      if (newValue) {
        this.useCatchupData();
      }
    },
  },
  methods: {
    ...mapActions(["getSectionData", "getCatchupData"]),
    fetchCatchupData() {
      this.getCatchupData(this.section.data[0].endPoint);
    },
    useSectionData() {
      this.catchupData.splice(0, 1, {
        items: this.section.data,
        child: [Dynamic],
        shouldScroll: true,
        scrollLimit: this.section.data.length - 5,
        id: "section",
        renderType: "Nav",
      });
    },
    useCatchupData() {
      this.disabled = false;
      this.catchupData.splice(1);
      let payload = this.data.map((item) => ({
        ...item,
        child: [Dynamic],
        shouldScroll: item.renderType === "Grid",
      }));
      this.catchupData = [...this.catchupData, ...payload];
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
    },
    onFocusChange(data) {
      if (data.row) this.disabled = true;
      else this.disabled = false;
      if (data.item.endPoint) {
        this.catchupData.splice(1);
        this.getCatchupData(data.item.endPoint);
      }
    },
  },
  mounted() {
    console.error(!this.section.data);
    if (!this.section.data) this.getSectionData("catchup");
    else {
      this.useSectionData();
      this.fetchCatchupData();
    }
  },
  created() {
    registerFocusDispatcher(this.keyListener);
    enableNavigation({
      UP: () => {
        if (!this.$refs.verticalList.$children[0].focusedIndex)
          this.setFocusToMenu();
        if (this.$refs.verticalList.$children[0].focusedIndex === 1)
          this.shouldScroll = false;
      },
      DOWN: () => {
        if (this.catchupData.length > 1) this.shouldScroll = true;
      },
      preCondition: () => this.isFocused,
      id: "catchup",
    });
  },
  destroyed() {
    unRegisterFocusDispatcher(this.keyListener);
    disableNavigation("catchup");
  },
};
</script>

<style lang="scss" scoped>
/deep/ .nav-list {
  width: 100%;
}
#vertical-list {
  position: fixed;
  top: 0;
  width: 100%;
  transition: transform 0.5s;
  /deep/ .child {
    justify-content: center;
  }
}
/deep/ #vertical-list > .child:nth-child(3) {
  padding: 10px;
  overflow: hidden;
}
/deep/ #Filter-List {
  margin-bottom: 40px;
}
/deep/ .grid {
  width: 1050px;
}
/deep/ .poster {
  margin: 10px 0;
}
.image {
  transition: transform 0.5s;
  transform: translateY(116px);
}
.scroll {
  transform: translateY(-116px) !important;
}
</style>
