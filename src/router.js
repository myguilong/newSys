import Vue from 'vue'
import Router from 'vue-router'
import Main from './views/Main.vue'
import Login from './views/Login.vue';
import CategoryEdit from './views/CategoryEdit.vue'
import CategoryList from './views/CategoryList.vue'
import CommitiesEdit from './views/CommoditiesEdit.vue'
import CommititesList from './views/CommoditiesList.vue'
import CommititesdownList from './views/CommoditiesdownList.vue'
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Main,
      children:[
        {
          path:'/categories/Edit',
          component:CategoryEdit,
      
        },
        {
          path:'/categores/List',
          component:CategoryList
        },
        {
          path:'/categores/Edit/:id',
          component:CategoryEdit,
          props:true
        },
        {
          path:'/commoditites/Edit',
          name:'commoditiesEdit',
          component:CommitiesEdit
        },
        {
          path:'/commoditites/List',
          name:'commodititesList',
          component:CommititesList
        },
        {
          path:'/commoditites/downList',
          name:'commititesdownList',
          component:CommititesdownList
        }
      ]
    },{
      path:'/login',
      name:'login',
      component:Login
    }
  ]
})
