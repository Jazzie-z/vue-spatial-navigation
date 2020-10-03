<template>
    <div class='sample-app'>
        <Menu/>        
        <div class="gradient">
        </div>
        <component :is="component"></component>
        
    </div>
</template>

<script>
import Menu from '@/examples/collections/Menu'
import Home from './Home'
import Channel from './Channel'
import History from './History'
import Settings from './Settings'
    export default {
        components:{
            Menu,
            Home
        },
        data(){
            return {
                component: Home
            }
        },
          watch:{
      $route(to,from){
          switch(to.hash.split('#/').pop()){
              case 'channel': 
              this.component = Channel;
              break
              case 'history': 
              this.component = History;
              break
              case 'settings': 
              this.component = Settings;
              break
              default:
              this.component = Home;
              break
          }
          console.error(to.hash.split('#/').pop())
      }
  },
    }
</script>

<style scoped>
.sample-app{
    position:relative;
    height:100vh;
}
.gradient {
    background-image: linear-gradient(to Bottom, #000000 0%, transparent 100%);
    height: 200px;
    width: 100%;
    position: absolute;
    z-index: 1;
    top: -40px;
    left: -10px;
}

</style>