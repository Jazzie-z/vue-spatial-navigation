<template>
    <div class="button" v-bind:class="{focus:isFocused}">
        {{title}}
    </div>
</template>

<script>
    export default {
        props:['title','isFocused']
    }
</script>

<style scoped>
.button{
    text-transform: uppercase;
    margin:0 15px;
    color: lightgray;
    padding: 0 5px;
    white-space: nowrap;
}
.focus {
    color: white;
    border-bottom: 3px solid #41b883;
}
</style>