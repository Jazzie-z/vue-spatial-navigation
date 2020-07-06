<template>
    <div class="side-nav">
        <div class="title">Example Components</div>
        <router-link v-for="(item, index) in items" :key="index" 
        :to="item.path">{{item.title}}</router-link>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                items:[
                    {title:'List',path:'/list'},
                    {title:'Carousel',path:'/carousel'},
                    {title:'Grid',path:'/grid'},
                    {title:'Nested Carousel',path:'/nestedCarousel'},
                ]
            }
        }
    }
</script>

<style lang="scss" scoped>
.side-nav{
    float: left;
    height:100vh;
    display: flex;
    flex-direction: column;
    text-align: left;
    background: grey;
    width: 300px;
    .title {
        padding: 20px;
        text-align: center;
        color: white;
        font-size: 24px;
        background: #41b883;
    }
    a{
        background: grey;
        padding: 20px;
        color: white;
        text-decoration: none;
        font-size: 24px;        
    }
    .router-link-active{
         background:#35495e;   
    }
}
</style>