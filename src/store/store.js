import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export default new Vuex.Store({
    state:{
        id:'123456',
        openedTab:[{
            title: '首页',
            name: '/'
        }],
        activeTab: ''
    },
    mutations:{
        addTab(state,component){
            //增加标签
            state.openedTab.push(component)
        },
        changeTab(state,componentName){
            //改变标签跳转
            state.activeTab = componentName
        },
        deductTab(state,component){
             let _index = null
             state.openedTab.map((item,index)=>{
                if(item.name == component.name){
                    _index = index
                }
            })
            // eslint-disable-next-line no-console
            console.log(_index,'对应下标')
            state.openedTab.splice(_index,1)
        }
     }
})