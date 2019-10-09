<template>
  <el-tabs
    v-model="editableTabsValue"
    type="card"
    closable
    @tab-remove="removeTab"
    @tab-click="handleClickTab($event.name)"
  >
    <el-tab-pane
      :key="item.name"
      v-for="item in editableTabs"
      :label="item.title"
      :name="item.name"
    ></el-tab-pane>
  </el-tabs>
  <!-- <span>当前登录成员:{{adminName}}</span> -->
</template>
<script>
export default {
  data() {
    return {
      editableTabsValue: "/",
      editableTabs: [
        {
          title: "首页",
          name: "/"
        }
      ],
      tabIndex: 1,
      openedTab: ["/"]
    };
  },
  methods: {
    removeTab(e) {
      //首页不允许被关闭（为了防止el-tabs栏中一个tab都没有）
      console.log(e);
      if (e == "/") {
        console.log("不允许被关闭");
        return false;
      }
      let _index;
      this.editableTabs.map((item, index) => {
        if (item.name == e) {
          _index = index;
        }
      });
      console.log(_index);
      let activeName = this.editableTabs[_index].name;
      let activeTitle = this.editableTabs[_index].title;
      let tabs = this.editableTabs;
      //  let activeName = this.editableTabsValue
      if (activeName == e) {
        console.log("相等");
        this.editableTabs.forEach((tab, index) => {
          let nextTab = tabs[index + 1] || tabs[index - 1];
          // console.log(nextTab,'下一个或者上一个页面')
          if (nextTab) {
            activeName = nextTab.name;
          }
        });
      }

      console.log(this.editableTabs[_index]);
      console.log(activeTitle, "如果当前页面关闭后打开的页面");
      // this.editableTabs.map(item=>{
      //   console.log(item.title)
      // })
      // var arr = []
      // arr = this.editableTabs.filter(item=>item.title !== activeTitle)
      // console.log(arr)
      this.$store.commit("deductTab", this.editableTabs[_index]);
      this.openedTab.splice(_index, 1);
      this.$router.push({
        path: activeName
      });
      this.editableTabsValue = activeName;
      this.editableTabs = this.editableTabs.filter(
        item => item.title !== activeTitle
      );
    },
    handleClickTab(e) {
      console.log(e, "点击切换路由");
      this.$router.push({
        path: e
      });
    }
  },
  computed: {
    getOpenedTab() {
      return this.$store.state.openedTab;
    },
    changeTab() {
      return this.$store.state.activeTab;
    }
  },
  watch: {
    getOpenedTab(value) {
      console.log(value, "监听器");
      if (value.length > this.openedTab.length) {
        //添加了新的tab页
        //导致vuex中的opendTab长度大于标签页中的opneid长度
        //因此需要新增标签页
        let newTab = value[value.length - 1];
        console.log(newTab, "newTab");
        ++this.tabIndex;
        this.editableTabs.push(newTab);
        this.editableTabsValue = newTab.name;
        this.openedTab.push(newTab.name);
      }
    },
    changeTab(val){
      //监听activetab以实现点击左侧栏时激活已存在的标签
      if(val!==this.editableTabsValue){
        this.editableTabsValue = val
      }
    }
  },
  mounted(){
     console.log(this.$route,'路由')
  },
  created() {
    // 刷新页面时（F11)
    // 因为<router-view>的<keep-alive>，会保留刷新时所在的router
    // 但是tab标签页因为刷新而被重构了，tab没有了
    // 因此需要将router回到index
    this.$router.push("/");
  }
};
</script>
<style lang='scss'>
.activeText {
  color: red;
}
</style>