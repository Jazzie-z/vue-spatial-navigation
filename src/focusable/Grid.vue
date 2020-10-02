<template>
  <div
    class="grid"
    v-bind:class="{ focus: isFocused }"
    ref="grid"
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
import { enableNavigation, disableNavigation, focusHandler } from "@/event-bus";
export default {
  name: "focusableGrid",
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
    shouldScroll: {
      type: Boolean,
      default: false,
    },
    maxColumn: {
      type: Number,
      default: 6,
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
      activeRow: 0,
      activeColumn: 0,
    };
  },
  computed: {
    style() {
      return {
        transform: `translateY(${this.scrollAmount}px)`,
      };
    },
  },
  methods: {
    getScrollAmount: (el, negative) => {
      if (el) {
        let value = el.clientHeight;
        return negative ? -value : value;
      }
      return 0;
    },
    isPrevColumnPresent() {
      return this.focusedIndex > 0 && this.activeColumn > 0;
    },
    isNextColumnPresent() {
      return (
        this.focusedIndex < this.items.length - 1 &&
        this.activeColumn < this.maxColumn - 1
      );
    },
    isPrevRowPresent() {
      return this.focusedIndex > 0 && this.activeRow > 0;
    },
    isNextRowPresent() {
      return (
        this.focusedIndex < this.items.length - 1 &&
        this.activeRow < this.items.length / this.maxColumn - 1
      );
    },
    updateColumn(reverse) {
      let value = reverse ? -1 : 1;
      this.focusedIndex += value;
      this.activeColumn += value;
    },
    updateRow(reverse) {
      let cardsPerColumn = reverse ? -this.maxColumn : this.maxColumn;
      let value = reverse ? -1 : 1;
      this.focusedIndex += cardsPerColumn;
      this.activeRow += value;
      if (this.isFocusIndexOutOfBound()) {
        //UNEVEN LAST ROW
        this.focusedIndex = this.items.length - 1;
        this.activeColumn = (this.items.length - 1) % this.maxColumn;
      }
    },
    isFocusIndexOutOfBound() {
      return this.focusedIndex > this.items.length - 1;
    },
    updateScrollValue(negative) {
      this.scrollAmount += this.getScrollAmount(
        this.$refs.childItem[this.focusedIndex],
        negative
      );
    },
    handleFocusLost() {
      if (this.focusedIndex > this.items.length - 1) {
        this.focusedIndex = this.items.length - 1;
      }
    },
    resetFocus({ force }) {
      if (force || !this.isFocused) {
        this.focusedIndex = 0;
        this.activeColumn = 0;
        this.activeRow = 0;
        this.scrollAmount = 0;
      }
    },
  },
  updated() {
    this.handleFocusLost();
  },
  mounted() {
    enableNavigation({
      LEFT: () => {
        if (this.isPrevColumnPresent()) {
          this.updateColumn("reverse");
        }
      },
      RIGHT: () => {
        if (this.isNextColumnPresent()) {
          this.updateColumn();
        }
      },
      UP: () => {
        if (this.isPrevRowPresent()) {
          this.updateRow("reverse");
          if (this.shouldScroll) this.updateScrollValue();
        }
      },
      DOWN: () => {
        if (this.isNextRowPresent()) {
          this.updateRow();
          if (this.shouldScroll) this.updateScrollValue("negative");
        }
      },
      preCondition: () => this.isFocused && !this.disabled,
      id: `grid-${this.id}`,
    });
    focusHandler.on("RESET_FOCUS", this.resetFocus);
  },
  destroyed() {
    disableNavigation(`grid-${this.id}`);
    focusHandler.off("RESET_FOCUS", this.resetFocus);
  },
};
</script>

<style lang="css" scoped>
.grid {
  display: flex;
  flex-wrap: wrap;
}
.child {
  display: flex;
}
.vertical {
  flex-direction: column;
}
</style>
