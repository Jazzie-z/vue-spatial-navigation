<template>
  <List
    :child="Button"
    :isFocused="true"
    :items="items"
    :shouldScroll="shouldScroll"
    v-on:onFocusChange="onFocusHandler"
  />
</template>

<script>
import List from "@/focusable/List";
import Button from "@/examples/components/Button";
import { ListData } from "../mock/mock";
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
