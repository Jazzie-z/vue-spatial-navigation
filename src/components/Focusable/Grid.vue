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
        :temp="items"
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
      default: 5,
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
        transform: `translate${this.orientation === "VERTICAL" ? "Y" : "X"}(${
          this.scrollAmount
        }px)`,
      };
    },
  },
  methods: {
    getScrollAmountByOrientation: (el, orientation) => {
      if (el) {
        return el[orientation === "VERTICAL" ? "clientHeight" : "clientWidth"];
      }
      return 0;
    },
  },
  mounted() {
    enableNavigation({
      id: `grid-${this.id}`,
      LEFT: () => {
        if (this.focusedIndex > 0 && this.activeColumn > 0) {
          this.focusedIndex -= 1;
          if (this.shouldScroll)
            this.scrollAmount += this.getScrollAmountByOrientation(
              this.$refs.childItem[this.focusedIndex],
              this.orientation
            );
        }
      },
      RIGHT: () => {
        if (
          this.focusedIndex < this.items.length - 1 &&
          this.activeColumn < this.maxColumn - 1
        ) {
          this.focusedIndex += 1;
          if (this.shouldScroll)
            this.scrollAmount -= this.getScrollAmountByOrientation(
              this.$refs.childItem[this.focusedIndex],
              this.orientation
            );
        }
      },
      UP: () => {
        if (this.focusedIndex > 0 && this.activeRow > this.activeRow > 0) {
          this.focusedIndex -= 1;
          if (this.shouldScroll)
            this.scrollAmount += this.getScrollAmountByOrientation(
              this.$refs.childItem[this.focusedIndex],
              this.orientation
            );
        }
      },
      DOWN: () => {
        if (
          this.focusedIndex < this.items.length - 1 &&
          this.activeRow < this.items.length / this.column - 1
        ) {
          this.focusedIndex += 1;
          if (this.shouldScroll)
            this.scrollAmount -= this.getScrollAmountByOrientation(
              this.$refs.childItem[this.focusedIndex],
              this.orientation
            );
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
}
.child {
  display: flex;
}
.vertical {
  flex-direction: column;
}
</style>
