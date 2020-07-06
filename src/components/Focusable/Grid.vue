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
        :items="item.items"
        :id="item.id || index"
        :child="item.child"
        :isFocused="isFocused && index === focusedIndex"
        :orientation="item.orientation"
        :shouldScroll="item.shouldScroll"
      />
    </div>
  </div>
</template>

<script>
import { enableNavigation } from "@/focus/event";
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
    orientation: {
      type: String, //Direction of grid
      default: "HORIZONTAL", //'VERTICAL'
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
    getScrollAmountByOrientation: (el, negative) => {
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
      this.scrollAmount += this.getScrollAmountByOrientation(
        this.$refs.childItem[this.focusedIndex],
        negative
      );
    },
  },
  mounted() {
    enableNavigation({
      id: `grid-${this.id}`,
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
      preCondition: () => this.isFocused,
    });
  },
};
</script>

<style lang="scss" scoped>
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
