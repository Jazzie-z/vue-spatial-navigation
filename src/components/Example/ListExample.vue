<template>
  <List
    :child="Button"
    :isFocused="true"
    :items="items"
    :shouldScroll="shouldScroll"
    v-on:onFocus="onFocusHandler"
  />
</template>

<script>
import List from "@/components/Focusable/List";
import Button from "@/components/Button";
import { ListData } from "./mock";
export default {
  props: ["shouldScroll"],
  components: {
    List,
  },
  data() {
    return {
      items: ListData,
      Button: Button,
    };
  },
  methods: {
    onFocusHandler(data) {
      console.error(data);
    },
  },
};
</script>

<style lang="scss" scoped></style>
