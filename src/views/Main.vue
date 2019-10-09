<template>
  <el-container style="height: 100vh; border: 1px solid #eee">
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <el-menu default-active router unique-opened active-text-color="#fff">
        <el-submenu v-for="(item, index) in menu" :key="index" :index="item.id">
          <template slot="title">
            <i :class="item.icon"></i>
            {{item.name}}
          </template>
          <el-menu-item-group>
            <el-menu-item
              v-for="(i, _index) in item.sub"
              @click="clickMenu(i)"
              :key="_index"
            >{{i.name}}</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-aside>
    <el-container>
      <el-main>
        <nav-Main></nav-Main>
        <keep-alive>
          <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<style>
/* .el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
} */

.el-aside {
  color: #333;
}
</style>

<script>
import menu from "../config/menu-config";
import navMain from "@/components/navMain/navMain";
export default {
  data() {
    const item = {
      date: "2016-05-02",
      name: "王小虎",
      address: "上海市普陀区金沙江路 1518 弄"
    };
    return {
      tableData: Array(20).fill(item),
      adminName: "",
      menu: menu,
      openedTab: ["/"]
    };
  },
  components: {
    navMain
  },
  methods: {
    clickMenu(item) {
      console.log(item, "点击");
      this.$router.push({
        path: item.componentName
      });
      this.openedTab = this.$store.state.openedTab;
      // tabNum 为当前点击的列表项在openedTab中的index，若不存在则为-1
      let tabNum = -1;
      this.openedTab.map((i, index) => {
        if (item.componentName == i.name) {
          console.log("当前页已经·存在");
          //tab已经存在
          tabNum = 1;
        }
      });

      //  this.editableTabs.push({
      //    title:item.name,
      //    name:item.componentName
      //  })
      let tab = {
        title: item.name,
        name: item.componentName
      };
      if (tabNum === -1) {
        //该标签当前没有打开
        //将点击的componentName加入到已打开标签页state.openedTab数组中
        this.$store.commit("addTab", tab);
      } else {
        //该标签是已经打开过的，需要激活此标签页
        this.$store.commit("changeTab", item.componentName);
      }
    }
  },
  async created() {
    //创建时判断用户是否已经登录,如果未登录就跳出路由

  }
};
</script>