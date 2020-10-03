<template>
    <div class="channel">
<div class="grid">
    <Grid
    ref="cardGrid"
    :child="Card"
    :isFocused="isFocused"
    :items="items"    
    :maxColumn="3"
    id="channel-grid"
  />
</div>
    </div>
</template>

<script>
import {channelGrid} from '@/examples/mock/mock'
import Grid from "@/focusable/Grid";
import Card from "@/examples/components/ChannelCard";
import {
	enableNavigation,
	disableNavigation,
	dispatchFocus,
	registerFocusDispatcher,
	unRegisterFocusDispatcher
} from "@/event-bus";
    export default {
        components:{
            Grid
        },
        data(){
            return {
                items:channelGrid,
                Card:Card,
                isFocused: false
            }
        },
        methods: {
            keyListener({ component, accepted }) {
                if (component === "MAIN_COMPONENT") {
                    if (!accepted) {
                        dispatchFocus({
                            component: "MAIN_COMPONENT",
                            accepted: true
                        });
                    } else {
                        this.isFocused = true;
                    }
                }
            },
            setFocusToMenu() {
                dispatchFocus({ component: 'MENU' });
                this.isFocused = false;
            },
	}   ,
        created() {
            if (this.isMenuLoaded && !this.data.length) this.getHomeData();
            registerFocusDispatcher(this.keyListener);
            enableNavigation({
                UP: () => {
                    if(this.$refs.cardGrid.activeRow===0)
                    this.setFocusToMenu();
                    
                },                
                BACK: () => this.setFocusToMenu(),
                preCondition: () => this.isFocused,
                id: "channel"
            });
    	},
        destroyed() {
            unRegisterFocusDispatcher(this.keyListener);
            disableNavigation("channel");
        },
    }
</script>

<style scoped>
.channel{
    height: 80vh;
    position: absolute;
    top:0;
    left: 0;
    background: #232227;
    width: 990px;
    
}
.grid{
    margin: 100px 20px 0;

}
</style>