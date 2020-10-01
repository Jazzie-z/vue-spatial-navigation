<template>
  <List
    :child="Button"
    :isFocused="true"
    :items="items"
    :shouldScroll="shouldScroll"
    :disabledIndex="disabledIndex"
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
      disabledIndex: [1, 3],
    };
  },
};
</script>
