<template>
<div v-bind:class="{animate:animate}">
  <List
    :child="child"
    :isFocused="true"
    :items="items"
    :shouldScroll="shouldScroll"
    orientation="VERTICAL"
  />
  <Loader class="loader" v-if="!items.length && !error"/>
  <div class="error">{{error}}</div>
  </div>
</template>

<script>
import List from "@/components/Focusable/List";
import Carousel from './Collection/Carousel'
// import Poster from "./Container/Card/Poster";
import Loader from './Core/Loader/Loader'
export default {
  components: {
    List,
    Loader
  },
  data() {
    return {
      items: [],
      child: Carousel,
      shouldScroll: true,
      animate: false,
      error:''
    };
  },
  methods:{
      prepareHomeData(data){
          if(data){
              this.items = data.filter(item=>item.editorialListType=== "Catchup").map(({editorialItems,name})=>({
        items: editorialItems.map(({image}) => ({src:image.LARGE})),                
        title:name
        }))        
          }
        console.error(data)
      },
      toggleAnimation(){
          this.animate = !this.animate
      },
      keyDownHandler(ev){
          let keys = ['200','195','81']
          if(keys.includes(ev.keyCode.toString()))
            this.toggleAnimation()
      }
  },
  created(){
            fetch('https://now.dstv.com/api/cs-mobile/editorial/v6/getEditorialsForHome;productId=1b09957b-27aa-493b-a7c9-53b3cec92d63;platformId=32faad53-5e7b-4cc0-9f33-000092e85950;packageId=3e6e5480-8b8a-4fd5-9721-470c895f91e2',{
                headers:{
                    authorization: 'aa56fa8a-fd0e-4b9b-b26e-b8acb8d40e30'
                }
            })
            .then(res=>{
                return res.json()
            })
            .then(data=>{
                if(data.items)this.prepareHomeData(data.items)
                else this.error = data
            })            
    window.addEventListener('keydown',this.keyDownHandler)
  },
destroyed(){
        window.addEventListener('keydown',this.keyDownHandler)
    }
};
</script>

<style lang="scss">
.focus {
  z-index: 1;  
}
.animate{    
    background:#1e3059;
    *{
        transition-duration:0.5s;
    }
}
.loader {
    position: absolute !important;
    top: 50%;
    left: 50%;
    transform:scale(1.1)
}
.error{
    color:red;
    font-size: 32px;
}
</style>

