import Vue from 'vue'
import Router from 'vue-router'
import ListExample from '@/components/Example/ListExample'
import CarouselExample from '@/components/Example/CarouselExample'
import GridExample from '@/components/Example/GridExample'
Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/list',
            component: ListExample
        },
        {
            path: '/carousel',
            component: CarouselExample,
            props: { shouldScroll: true }
        },
        {
          path: '/grid',
          component: GridExample
        },
    ]
})
