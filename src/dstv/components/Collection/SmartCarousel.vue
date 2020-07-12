<template>
  <div
    class="smart-carousel"
    v-bind:class="{ focus: isFocused, vertical: orientation === 'VERTICAL' }"
    v-bind:style="style"
    ref="carousel"
    :id="id"
  >
    <div
      class="child"
      ref="childItem"
      v-for="(item, index) in visibleItems"
      :key="index"
    >
      <Dynamic
        v-bind="item"
        :isFocused="isFocused && index === focusedIndex"
        v-on="$listeners"
      />
    </div>
  </div>
</template>

<script>
import {
  enableNavigation,
  disableNavigation,
  // focusHandler
} from "@/Focusable/event";
export default {
  inheritAttrs: false,
  components: {
    Dynamic: () => import("@/dstv/components/Dynamic"),
  },
  props: {
    items: {
      //Array to be passed to child
      type: Array,
      required: true,
    },
    isFocused: {
      //Condition to enable navigation
      type: Boolean,
      default: false,
    },
    defaultIndex: {
      type: Number,
      default: 0,
    },
    orientation: {
      type: String, //Direction of list
      default: "HORIZONTAL", //'VERTICAL'
    },
    scrollLimit: {
      type: Number,
      default: Infinity,
    },
    id: {
      //unique id to differentiate navigation
      default: Math.random().toString(),
    },
    maxVisibility: {
      type: Number,
      default: 6,
    },
    minVisibility: {
      type: Number,
      default: 5,
    },
  },
  data() {
    return {
      focusedIndex: this.defaultIndex,
      prevIndex: 0,
      endReached:
        this.defaultIndex === 0 && this.defaultIndex === this.items.length - 1,
      scrollAmount: 0,
      startIndex: 0,
      endIndex: this.maxVisibility + 1,
    };
  },
  computed: {
    style() {
      return {
        transform: `translate${this.orientation === "VERTICAL" ? "Y" : "X"}(${
          this.scrollAmount
        }px)`,
      };
    },
    visibleItems() {
      return this.items.slice(this.startIndex, this.endIndex);
    },
  },
  methods: {
    getKeysByOrientation: (orientation) => ({
      REVERSE: orientation === "VERTICAL" ? "UP" : "LEFT",
      FORWARD: orientation === "VERTICAL" ? "DOWN" : "RIGHT",
    }),
    getScrollAmountByOrientation: (el, orientation) => {
      if (el) {
        let value = el.getBoundingClientRect();
        return -value[orientation === "VERTICAL" ? "height" : "width"];
      }
      return 0;
    },
    isPrevItemPresent() {
      return this.focusedIndex > 0;
    },
    isNextItemPresent() {
      return this.focusedIndex < this.items.length - 1;
    },
    getValidNextIndex() {
      let validIndex = this.focusedIndex + 1;
      if (this.visibleItems[validIndex]) return validIndex;
      this.endReached = true;
      return this.focusedIndex;
    },
    getValidPrevIndex() {
      let validIndex = this.focusedIndex - 1;
      if (this.visibleItems[validIndex]) return validIndex;
      this.endReached = true;
      return this.focusedIndex;
    },
    updateFocus(reverse) {
      this.prevIndex = this.focusedIndex;
      this.endReached = false;
      if (reverse) {
        this.focusedIndex = this.getValidPrevIndex();
      } else {
        this.focusedIndex = this.getValidNextIndex();
      }
    },
    updateScrollValue(reverse) {
      if (this.$refs.childItem) {
        this.scrollAmount = reverse
          ? 0
          : this.getScrollAmountByOrientation(
              this.$refs.childItem[0],
              this.orientation
            );
      }
    },
    paginateData(reverse) {
      this.prevIndex = this.focusedIndex;
      let value = reverse ? -1 : 1;
      this.startIndex += value;
      this.endIndex += value;
    },
  },
  mounted() {
    let KEYS = this.getKeysByOrientation(this.orientation);
    enableNavigation({
      id: `smart-carousel-${this.id}`,
      [KEYS.REVERSE]: () => {
        if (this.focusedIndex > 1) {
          this.updateFocus("reverse");
        } else if (this.startIndex > 0) {
          this.paginateData("reverse");
        } else {
          this.updateFocus("reverse");
          this.updateScrollValue("reverse");
        }
      },
      [KEYS.FORWARD]: () => {
        if (!this.focusedIndex) {
          this.updateFocus();
          this.updateScrollValue();
        } else if (this.items[this.endIndex - 1]) {
          this.paginateData();
        } else {
          this.updateFocus();
        }
      },
      preCondition: () => this.isFocused,
    });
    // focusHandler.$on("RESET_FOCUS", this.resetFocus);
    // focusHandler.$on("SET_FOCUS", this.setExternalFocus);
  },
  destroyed() {
    disableNavigation(`smart-carousel-${this.id}`);
    // focusHandler.$off("RESET_FOCUS", this.resetFocus);
    // focusHandler.$off("SET_FOCUS", this.setExternalFocus);
  },
};
</script>

<style lang="scss" scoped>
.smart-carousel {
  display: flex;
}
.vertical {
  flex-direction: column;
}
</style>
