<template>
    <div>
        <img :src="items" v-bind:class="{focus:isFocused}"/>
    </div>
</template>

<script>
    export default {
        props:['items','id','isFocused','activeRow','temp'],
        data(){
            return {
                // isFocused:!this.id,
                // row: this.activeRow || 0
            }
        },
        mounted(){
            console.error('items',this.items,this.temp)
        },
        // methods:{
        //     keyListener({component,direction,column,row,prevIndex}){
        //         if(component === 'CARD' && row===this.row){
        //             switch(direction){
        //                 case 'RIGHT':
        //                     if(column + 1 === this.id){
        //                         focusHandler.$emit('FOCUS_CHANGE',{component:'CARD_ACKNOWLEDGED', prevIndex:column, row:this.row, direction})
        //                     }
        //                     break
        //                 case 'LEFT':
        //                     if(column - 1 === this.id){
        //                         focusHandler.$emit('FOCUS_CHANGE',{component:'CARD_ACKNOWLEDGED', prevIndex:column, row:this.row, direction})
        //                     }
        //                     break
        //             }
        //         }else if(component ==='CARD_ACKNOWLEDGED'){
        //             if(prevIndex===this.id){
        //                 this.isFocused=false
        //             }else if(direction==='LEFT' && this.id === prevIndex-1){
        //                 this.isFocused=true
        //             }else if(direction==='RIGHT' && this.id === prevIndex+1){
        //                 this.isFocused=true
        //             }
        //         }
        //     },
        // },
        // destroyed(){ focusHandler.$off('FOCUS_CHANGE',this.keyListener) },
        // mounted(){ focusHandler.$on('FOCUS_CHANGE',this.keyListener) 
        // console.error('registed for focusHandler')
        //     enableNavigation({
        //         'RIGHT':()=>{
        //             console.error('called inside navigation',this.isFocused)
        //             if(this.isFocused){
        //                 focusHandler.$emit('FOCUS_CHANGE',{component:'CARD', direction: 'RIGHT', column:this.id, row:this.row})
        //                 return true
        //             }                        
        //             return false
        //         },
        //         'LEFT':()=>{
        //         if(this.isFocused){
        //                 focusHandler.$emit('FOCUS_CHANGE',{component:'CARD', direction: 'LEFT', column:this.id, row:this.row})
        //                 return true
        //             }                        
        //             return false
        //         },
        //         'UP':()=>{console.error('UP CALLED')
        //         // focusHandler.$emit('FOCUS_CHANGE',{component:'HOME_FOCUS', direction: 'DOWN'})
        //         },
        //         'DOWN':()=>{console.error('DOWN CALLED')
        //         // focusHandler.$emit('FOCUS_CHANGE',{component:'HOME_FOCUS', direction: 'DOWN'})
        //         },                
        //         id:`card${this.id}`,
        //         preCondition:()=>this.parentFocused
        //     })
        // },
    }
</script>

<style lang="scss" scoped>
    img{
        padding: 0 10px;
    }
    .focus{
        transform:scale(1.2)
    }
</style>