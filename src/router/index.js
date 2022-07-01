import {createRouter, createWebHistory} from 'vue-router'
import store from '../store'
import Home from '../views/Home.vue'
import MainLayout from '../layout/main-layout'

const routes = [
    {
        path: '/',
        component: MainLayout,
        children: [
            {
                path: '/',
                name: 'Home',
                component: Home
            },
            {
                path: '/movie/:id',
                name: 'Movie',
                component: () => import(/* webpackChunkName: "movie" */ '../views/Movie.vue'),
                beforeEnter: async (to, from, next) => {
                    await store.dispatch('movie/fetchMovie', {id: to.params.id})
                    next()
                }
            }
        ]
    },
    {
        path: '/:catchAll(.*)*',
        name: "PageNotFound",
        component: () => import(/* webpackChunkName: "PageNotFound" */ '../views/PageNotFound'),
    },

]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
