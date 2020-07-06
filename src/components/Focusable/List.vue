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
    getScrollAmountByOrientation: (el, orientation) => {
      if (el) {
        return el[orientation === "VERTICAL" ? "clientHeight" : "clientWidth"];
      }
      return 0;
    },
    handleFocusLost() {
      if (this.focusedIndex > this.items.length - 1) {
        this.focusedIndex = this.items.length - 1;
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
        if (this.focusedIndex > 0) {
          this.focusedIndex -= 1;
          if (this.shouldScroll)
            this.scrollAmount += this.getScrollAmountByOrientation(
              this.$refs.childItem[0],
              this.orientation
            );
        }
      },
      [KEYS.FORWARD]: () => {
        if (this.focusedIndex < this.items.length - 1) {
          this.focusedIndex += 1;
          if (this.shouldScroll)
            this.scrollAmount -= this.getScrollAmountByOrientation(
              this.$refs.childItem[0],
              this.orientation
            );
        }
      },
      preCondition: () => this.isFocused,
    });
  },
  destroyed() {
    disableNavigation(`list-${this.id}`);
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
