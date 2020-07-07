<template>
    <div class="carousel">
        <div class="title" :v-if="isFocused">{{title}}</div>
    <List
        :child="child"
        :isFocused="isFocused"
        :items="items"
        :shouldScroll="true"
        :id="id"
  />
    </div>
    
</template>

<script>
import List from "@/components/Focusable/List";
import Poster from '../Container/Card/Poster'
    export default {
        props:['isFocused','items','id', 'title'],
        components:{
            List
        },
        data(){
            return {
                child: Poster,
            }
        },
        mounted(){
            console.error(this.$props)
        }
    }
</script>

<style lang="scss" scoped>
.carousel{
    display: flex;
    flex-direction: column;
    align-items: baseline;
}
.title{
    color:white;
    margin-top:30px;
    font-size:24px;
}
.list .focus{
    margin-top: 20px;
}
</style>