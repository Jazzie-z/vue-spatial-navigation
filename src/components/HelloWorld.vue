<template>
<div>
  <List :child="childList" :isFocused="true" :items="listItems" 
  orientation="VERTICAL" id='vertical'
  />
  <!-- <List :child="child" :isFocused="true" :items="items" 
  orientation="VERTICAL" id='vertical2'
  /> -->
  </div>
</template>
<script>
import List from './List'
import Card from './Card'
import {mockImage} from '@/mock'
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  components:{
    List
  },
  data(){
     return{
       child: Card,
       childList: List,
       items: mockImage.map(item=>({items:item})),
       listItems: [
         {child:Card,
         items:mockImage.map(item=>({items:item}))},
         {child:Card,items:mockImage.map(item=>({items:item}))}
         ]
       }
  }
}
</script>