<template>
<List
      :child="Card"
      :isFocused="true"
      :items="items"
      :shouldScroll="shouldScroll"
    />
</template>

<script>
import List from "@/components/Focusable/List";
import Card from '@/components/Card'
import { mockImage } from "@/mock";
    export default {
        components: {
            List,
        },
        data(){
            return {
                items: mockImage.map((item) => ({ items: item })),
                Card:Card,
                shouldScroll:true
            }
        },
    }
</script>

<style lang="scss" scoped>
</style>