<template>
  <div
    class="list"
    v-bind:class="{ focus: isFocused, vertical: orientation === 'VERTICAL' }"
    ref="list"
    v-bind:style="style"
    :id="id"
  >
    <div
      class="child"
      ref="childItem"
      v-for="(item, index) in items"
      :key="index"
    >
      <component
        :is="child[index] || child[0]"
        v-bind="item"
        :id="`${item.id || index}`"
        :isFocused="isFocused && index === focusedIndex"
        v-bind:class="{ disabled: disabledIndex.includes(index) }"
        :disabled="item.disabled || disabledIndex.includes(index)"
        v-on="$listeners"
      />
    </div>
  </div>
</template>

<script>
import {
  enableNavigation,
  disableNavigation,
  focusHandler,
} from "@/Focusable/event";

export default {
  name: "focusable-list",
  props: {
    child: {
      type: Array, //Array of Child components (eg: card, button)
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
    defaultIndex: {
      type: Number,
      default: 0,
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
    scrollLimit: {
      type: Number,
      default: Infinity,
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
      prevIndex: 0,
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
    isEnabledIndex(index) {
      return !this.disabledIndex.includes(index);
    },
    setInitialvalue() {
      if (
        this.defaultIndex > -1 &&
        this.defaultIndex < this.items.length &&
        this.isEnabledIndex(this.defaultIndex)
      ) {
        this.focusedIndex = this.defaultIndex;
      } else {
        this.focusedIndex = this.getValidNextIndex();
      }
      if (this.focusedIndex >= -1) this.updateScrollValue();
    },
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
    handleFocusLost() {
      if (
        this.focusedIndex > this.items.length - 1 ||
        this.disabledIndex.includes(this.focusedIndex)
      ) {
        if (this.getValidPrevIndex() !== this.focusedIndex) {
          this.emitFocusLost({
            prevIndex: this.focusedIndex,
            newIndex: this.getValidPrevIndex(true),
          });
          this.focusedIndex = this.getValidPrevIndex();
        } else if (this.getValidNextIndex(true) !== this.focusedIndex) {
          this.emitFocusLost({
            prevIndex: this.focusedIndex,
            newIndex: this.getValidNextIndex(true),
          });
          this.focusedIndex = this.getValidNextIndex();
        } else {
          this.focusedIndex = -1;
          this.emitFocusLost({
            err:
              "No items to set focus, either disable it or provide new item to setFocus",
          });
        }
      }
    },
    isPrevItemPresent() {
      return this.focusedIndex > 0;
    },
    isNextItemPresent() {
      return this.focusedIndex < this.items.length - 1;
    },
    emitFocusLost(payload) {
      this.$parent.$emit("onFocusLost", payload);
      this.$emit("onFocusLost", payload);
    },
    emitFocusChange(newIndex) {
      let payload = {
        prevIndex: this.focusedIndex,
        newIndex,
        item: this.items[newIndex],
        id: this.id,
      };
      // this.$parent.$emit("onFocusChange", { ...payload, fromChild: true });
      this.$emit("onFocusChange", payload);
    },
    getValidNextIndex(initial) {
      let i = this.focusedIndex + 1;
      let validIndex = this.focusedIndex;
      while (i < this.items.length) {
        if (this.isEnabledIndex(i)) {
          validIndex = i;
          if (!initial) {
            this.emitFocusChange(validIndex);
          }
          break;
        }
        i++;
      }
      return validIndex;
    },
    getValidPrevIndex(initial = false) {
      let i = this.focusedIndex - 1;
      let validIndex = this.focusedIndex;
      while (i >= 0) {
        if (this.isEnabledIndex(i) && i < this.items.length) {
          validIndex = i;
          if (!initial) this.emitFocusChange(validIndex);
          break;
        }
        i--;
      }
      return validIndex;
    },
    updateFocus(reverse) {
      this.prevIndex = this.focusedIndex;
      if (reverse) {
        this.focusedIndex = this.getValidPrevIndex();
      } else {
        this.focusedIndex = this.getValidNextIndex();
      }
    },
    canScroll() {
      return this.shouldScroll && this.focusedIndex < this.scrollLimit;
    },
    getScrollValueByFocus() {
      let newValue = 0;
      this.items.forEach((item, index) => {
        if (index < this.focusedIndex)
          newValue += this.getScrollAmountByOrientation(
            this.$refs.childItem[index],
            this.orientation
          );
      });
      return newValue;
    },
    updateScrollValue() {
      if (this.canScroll() && this.$refs.childItem) {
        this.scrollAmount = this.getScrollValueByFocus();
      }
    },
    resetFocus({ force, id } = {}) {
      if (force || (!this.isFocused && id === this.id)) {
        this.focusedIndex = 0;
        this.scrollAmount = 0;
      }
    },
    setExternalFocus({ index, id } = {}) {
      if (id === this.id) {
        if (
          this.isEnabledIndex(index) &&
          index >= 0 &&
          index < this.items.length - 1
        ) {
          this.emitFocusChange(index);
          this.focusedIndex = index;
          this.updateScrollValue();
        } else {
          console.error(`focus to the given index ${index} is not possible`);
        }
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
          this.updateScrollValue();
        } else {
          this.prevIndex = this.focusedIndex;
        }
      },
      [KEYS.FORWARD]: () => {
        if (this.isNextItemPresent()) {
          this.updateFocus();
          this.updateScrollValue();
        } else {
          this.prevIndex = this.focusedIndex;
        }
      },
      preCondition: () => this.isFocused && !this.disabled,
    });
    focusHandler.$on("RESET_FOCUS", this.resetFocus);
    focusHandler.$on("SET_FOCUS", this.setExternalFocus);
  },
  destroyed() {
    disableNavigation(`list-${this.id}`);
    focusHandler.$off("RESET_FOCUS", this.resetFocus);
    focusHandler.$off("SET_FOCUS", this.setExternalFocus);
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
