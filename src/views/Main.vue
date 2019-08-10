<template>
 <el-container style="height: 100vh; border: 1px solid #eee">
  <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
    <el-menu router :default-active="$route.path" :default-openeds="['1', '3']">
      <el-submenu index="1">
        <template slot="title"><i class="el-icon-s-shop"></i>商城管理</template>
        <el-menu-item-group>
          <template slot="title">分类管理</template>
          <el-menu-item index="/categories/Edit">增加分类</el-menu-item>
          <el-menu-item index="/categores/List">分类列表</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group >
          <template slot="title">商品管理</template>
          <el-menu-item index="/commoditites/Edit">上架商品</el-menu-item>
          <el-menu-item index="/commoditites/List">商品列表</el-menu-item>
          <el-menu-item index="/commoditites/downList">已经下架的商品</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
       <el-submenu index="1-4">
          <template slot="title" > <i class="el-icon-money"></i> 佣金管理</template>
          <el-menu-item index="1-4-1">修改佣金比例</el-menu-item>
        </el-submenu>
      <el-submenu index="2">
        <template slot="title"><i class="el-icon-s-custom"></i>团长管理</template>
        <el-menu-item-group>
          <template slot="title">团长管理</template>
          <el-menu-item index="2-1">团长审核</el-menu-item>
          <el-menu-item index="2-2">团长列表</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group>
            <template slot="title">订单管理</template>
          <el-menu-item index="2-3">团长订单</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title"><i class="el-icon-setting"></i>系统管理</template>
        <el-menu-item-group>
          <template slot="title">资金管理</template>
          <el-menu-item index="3-1">账单流水</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group>
             <template slot="title">系统管理员管理</template>
          <el-menu-item index="3-3">管理员列表</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </el-aside>
  
  <el-container>
    <el-header style="text-align: right; font-size: 12px">
      <el-dropdown>
        <i class="el-icon-setting" style="margin-right: 15px"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>查看</el-dropdown-item>
          <el-dropdown-item>新增</el-dropdown-item>
          <el-dropdown-item>删除</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <span>当前登录成员:{{adminName}}</span>
    </el-header>
    <el-main>
        <router-view>

        </router-view>
    </el-main>
  </el-container>
</el-container>
</template>
<style>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  
  .el-aside {
    color: #333;
  }
</style>

<script>
  export default {
    data() {
      const item = {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      };
      return {
        tableData: Array(20).fill(item),
        adminName:''
      }
    },
    async created(){
      //创建时判断用户是否已经登录,如果未登录就跳出路由
      let res = await this.$http.get('/users/getuser')
      this.adminName = res.data.name
      if(res.data.code!=0){
        //返回不为0就是未登录
        this.$message({
          type:'fail',
          message:'您未登录,跳到登录页'
        })
        this.$router.push('/login')
      }
    }
  };
</script>