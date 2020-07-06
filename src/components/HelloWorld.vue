<template>
  <div>
    <List
      :child="childList"
      :isFocused="true"
      :items="listItems"
      orientation="VERTICAL"
      id="vertical"
    />
    <!-- <List :child="child" :isFocused="true" :items="items" 
orientation="HORIZONTAL" id='vertical2'
/> -->
  </div>
</template>
<script>
import List from "@/components/Focusable/List";
import Card from "./Card";
import { mockImage } from "@/mock";
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  components: {
    List,
  },
  data() {
    return {
      child: Card,
      childList: List,
      items: mockImage.map((item) => ({ items: item })),
      listItems: [
        { child: Card, items: mockImage.map((item) => ({ items: item })) },
        { child: Card, items: mockImage.map((item) => ({ items: item })) },
      ],
    };
  },
  mounted() {
    // setTimeout(() => {
    //   this.listItems.splice(0, 1);
    //   // this.items.splice(0,1)
    // }, 3000);
    // setTimeout(() => {
    //   this.listItems.splice(0, 1);
    //   // this.items.splice(0,1)
    // }, 5000);
  },
};
</script>
