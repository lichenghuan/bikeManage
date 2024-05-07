import { createRouter, createWebHistory } from 'vue-router'  
import brandsList from '~/views/brandsList/index.vue'  
import bikesList from '~/views/bikesList/index.vue'  
import About from '~/views/About.vue'  
  
const routes = [  
  {  
    path: '/',  
    name: 'brandsList',  
    component: brandsList  
  },  
  {  
    path: '/bikesList',  
    name: 'bikesList',  
    component: bikesList  
  },  
  {  
    path: '/about',  
    name: 'About',  
    component: About  
  },  
  // 添加更多路由...  
]  
  
const router = createRouter({  
  history: createWebHistory(),  
  routes // 简写，相当于 routes: routes  
})  
  
export default router