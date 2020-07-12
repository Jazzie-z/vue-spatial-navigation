<template>
  <component :is="child" v-bind="$attrs" v-on="$listeners" />  
</template>

<script>
import { COMPONENTS } from "./";
export default {
  name: 'dynamic-component',
  inheritAttrs: false,
  computed: {
    child() {
      return COMPONENTS[this.$attrs.renderType];
    },    
  },
  mounted(){
      // console.error(this.$attrs.renderType)
    }
};
</script>
