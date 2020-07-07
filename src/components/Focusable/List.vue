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
        v-bind:class="{ disabled: disabledIndex.includes(index) }"
        :disabled="disabledIndex.includes(index)"
      />
    </div>
  </div>
</template>

<script>
import { enableNavigation, disableNavigation } from "@/focus/event";
import { focusHandler } from "@/main";

export default {
  name: "focusable-list",
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
    disabledIndex: {
      type: Array,
      default: () => [-1],
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
      focusedIndex: -1,
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
    setInitialvalue() {
      this.focusedIndex = this.getValidNextIndex();
      if (this.shouldScroll && this.focusedIndex >= -1)
        this.updateScrollValue();
    },
    getKeysByOrientation: (orientation) => ({
      REVERSE: orientation === "VERTICAL" ? "UP" : "LEFT",
      FORWARD: orientation === "VERTICAL" ? "DOWN" : "RIGHT",
    }),
    getScrollAmountByOrientation: (el, orientation) => {
      if (el) {
        return -el[orientation === "VERTICAL" ? "clientHeight" : "clientWidth"];
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
    getValidNextIndex() {
      let i = this.focusedIndex + 1;
      let validIndex = this.focusedIndex;
      while (i < this.items.length) {
        if (!this.disabledIndex.includes(i)) {
          validIndex = i;
          this.$emit("onFocus", {
            prevIndex: this.focusedIndex,
            newIndex: validIndex,
            item: this.items[validIndex],
          });
          break;
        }
        i++;
      }
      return validIndex;
    },
    getValidPrevIndex() {
      let i = this.focusedIndex - 1;
      let validIndex = this.focusedIndex;
      while (i >= 0) {
        if (!this.disabledIndex.includes(i)) {
          validIndex = i;
          this.$emit("onFocus", {
            prevIndex: this.focusedIndex,
            newIndex: validIndex,
            item: this.items[validIndex],
          });
          break;
        }
        i--;
      }
      return validIndex;
    },
    updateFocus(reverse) {
      if (reverse) {
        this.focusedIndex = this.getValidPrevIndex();
      } else {
        this.focusedIndex = this.getValidNextIndex();
      }
    },
    updateScrollValue() {
      this.scrollAmount =
        this.getScrollAmountByOrientation(
          this.$refs.childItem[0],
          this.orientation
        ) * this.focusedIndex;
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
    this.setInitialvalue();
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
          if (this.shouldScroll) this.updateScrollValue();
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
.disabled {
  background: grey;
}
</style>
