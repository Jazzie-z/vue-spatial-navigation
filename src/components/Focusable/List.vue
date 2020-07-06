<template>
  <div
    class="list"
    v-bind:class="{ focus: isFocused, vertical: orientation === 'VERTICAL' }"
    ref="list"
    v-bind:style="style"
  >
    <div
      class="child"
      ref="childItem"
      v-for="(item, index) in items"
      :key="index"
    >
      <component
        :is="child"
        v-bind="item"
        :id="`child${item.id || index}`"
        :isFocused="isFocused && index === focusedIndex"
      />
    </div>
  </div>
</template>

<script>
import { enableNavigation, disableNavigation } from "@/focus/event";
import { focusHandler } from "@/main";

export default {
  props: {
    child: {
      type: Object, //Child component (eg: card, button)
      required: true,
    },
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
    disabled: {
      //Condition to prevent navigation
      type: Boolean,
      default: false,
    },
    orientation: {
      type: String, //Direction of list
      default: "HORIZONTAL", //'VERTICAL'
    },
    shouldScroll: {
      type: Boolean,
      default: false,
    },
    id: {
      //unique id to differentiate navigation
      default: Math.random().toString(),
    },
  },
  data() {
    return {
      focusedIndex: 0,
      scrollAmount: 0,
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
  },
  methods: {
    getKeysByOrientation: (orientation) => ({
      REVERSE: orientation === "VERTICAL" ? "UP" : "LEFT",
      FORWARD: orientation === "VERTICAL" ? "DOWN" : "RIGHT",
    }),
    getScrollAmountByOrientation: (el, orientation, negative) => {
      if (el) {
        let value =
          el[orientation === "VERTICAL" ? "clientHeight" : "clientWidth"];
        return negative ? -value : value;
      }
      return 0;
    },
    handleFocusLost() {
      if (this.focusedIndex > this.items.length - 1) {
        this.focusedIndex = this.items.length - 1;
      }
    },
    isPrevItemPresent() {
      return this.focusedIndex > 0;
    },
    isNextItemPresent() {
      return this.focusedIndex < this.items.length - 1;
    },
    updateFocus(reverse) {
      let value = reverse ? -1 : 1;
      this.focusedIndex += value;
    },
    updateScrollValue(negative) {
      this.scrollAmount += this.getScrollAmountByOrientation(
        this.$refs.childItem[0],
        this.orientation,
        negative
      );
    },
    resetFocus({ force }) {
      if (force || !this.isFocused) {
        this.focusedIndex = 0;
        this.scrollAmount = 0;
      }
    },
  },
  updated() {
    this.handleFocusLost();
  },
  mounted() {
    let KEYS = this.getKeysByOrientation(this.orientation);
    enableNavigation({
      id: `list-${this.id}`,
      [KEYS.REVERSE]: () => {
        if (this.isPrevItemPresent()) {
          this.updateFocus("reverse");
          if (this.shouldScroll) this.updateScrollValue();
        }
      },
      [KEYS.FORWARD]: () => {
        if (this.isNextItemPresent()) {
          this.updateFocus();
          if (this.shouldScroll) this.updateScrollValue("negative");
        }
      },
      preCondition: () => this.isFocused && !this.disabled,
    });
    focusHandler.$on("RESET_FOCUS", this.resetFocus);
  },
  destroyed() {
    disableNavigation(`list-${this.id}`);
    focusHandler.$off("RESET_FOCUS", this.resetFocus);
  },
};
</script>

<style lang="scss" scoped>
.list {
  display: flex;
}
.child {
  display: flex;
}
.vertical {
  flex-direction: column;
}
</style>
