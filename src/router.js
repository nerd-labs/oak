import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
		{ path: '/pokemon', redirect: '/' },
    {
      path: '/pokemon/:id',
      name: 'pokemon',
      // route level code-splitting
      // this generates a separate chunk (pokemon.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "pokemon" */ './views/Detail.vue')
    }
  ]
})
