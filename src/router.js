import Vue from 'vue'
import Router from 'vue-router'
import Main from './views/Main.vue'
import Login from './views/Login.vue';
import CategoryEdit from './views/CategoryEdit.vue'
import CategoryList from './views/CategoryList.vue'
import CommitiesEdit from './views/CommoditiesEdit.vue'
import CommitiesAdd from './views/CommoditiesAdd.vue'
import CommititesList from './views/CommoditiesList.vue'
import CommititesdownList from './views/CommoditiesdownList.vue'
import headerList from './views/headerList.vue'
import headerListis from './views/headerListis.vue'
import headerOrder from './views/header/headerOrder.vue'
import orderSearch from './views/orderSearch/orderSearch.vue'
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Main,
      meta:{
        keepAlive:false//需要被缓存的组件
      },
      children:[
        {
          path:'/categories/Edit',
          component:CategoryEdit,
          meta:{
            keepAlive:true //需要被缓存的组件
          }
        },
        {
          path:'/categores/List',
          component:CategoryList
        },
        {
          path:'/categores/Edit/:id',
          component:CategoryEdit,
          props:true,
          meta:{
            keepAlive:true //需要被缓存的组件
          }
        },
        {
          path:'/commoditites/Edit/:id',
          name:'commoditiesEdit',
          component:CommitiesEdit,
          props:true,
          meta:{
            keepAlive:true //需要被缓存的组件
          }
        },
        {
          path:'/commodities/Add',
          name:'CommitiesAdd',
          component:CommitiesAdd,
          meta:{
            keepAlive:true //需要被缓存的组件
          }
        },
        {
          path:'/commoditites/List',
          name:'commodititesList',
          component:CommititesList,
          meta:{
            keepAlive:false //需要被缓存的组件
          }
        },
        {
          path:'/commoditites/downList',
          name:'commititesdownList',
          component:CommititesdownList,
          meta:{
            keepAlive:false //需要被缓存的组件
          }
        },
        {
          path:"/header/list",
          name:'headerList',
          component:headerList,
          meta:{
            keepAlive:false //需要被缓存的组件
          }
        },
        {
          path:"/header/isheaderList",
          name:'headerListis',
          component:headerListis,
          meta:{
            keepAlive:false //需要被缓存的组件
          }
        },
        {
          path:'/header/headerOrder',
          name:'headerOrder',
          component:headerOrder,
          meta:{
            keepAlive:false
          }
        },
        {
          path:'/orderSearch/list',
          name:'orderSearch',
          component:orderSearch,
          meta:{
            keepAlive:false
          }
        }
      ]
    },{
      path:'/login',
      name:'login',
      component:Login
    }
  ]
})
 