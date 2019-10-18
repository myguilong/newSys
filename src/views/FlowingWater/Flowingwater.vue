<template>
  <!-- 此页面应该只有最高级的权限才能使用暂时不做处理 -->
  <div>
    <el-table :data="list">
      <el-table-column prop="name" label="订单号" width="120"></el-table-column>
      <el-table-column prop="username" label="金额" width="180"></el-table-column>
      <!-- <el-table-column  label="审核" width="120">
          <template slot-scope="scope">
            <el-button @click="handleIS(scope.row)"  type="success" icon="el-icon-check" circle></el-button>
          </template>
      </el-table-column>-->
    </el-table>

   
    <div class="add" v-show="create">
      <el-row :gutter="20">
        <el-col :span="2">
          <div class="grid-content name">名字:</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content"> <el-input v-model="name"></el-input></div>
        </el-col> 
      </el-row>
      <el-row :gutter="20">
        <el-col :span="2">
          <div class="grid-content name">账户:</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content"> <el-input v-model="count"></el-input></div>
        </el-col> 
      </el-row>
       <el-row :gutter="20">
        <el-col :span="2">
          <div class="grid-content name">密码:</div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content"> <el-input v-model="password"></el-input></div>
        </el-col> 
      </el-row>
    </div>
     <el-button type="danger" @click="addAdmin">{{create?'关闭':'新增管理员'}}</el-button>
     <el-button type="danger" v-show="create" @click="submit">提交</el-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: [],
      name: "",
      count:"",
      password:"",
      create:false
    };
  },
  methods: {
    async getAdminList() {
      let res = await this.$http.get("/users/getAdminList");
      this.list = res.data.data;
    },
    handleClick(value) {
      console.log(value._id);
    },
    addAdmin(){
        //新增加管理员
        this.create = !this.create
    },
    submit(){
         this.$http.post('/users/addAdmin',{
              username:this.count,
              password:this.password,
              name:this.name
         }).then(res=>{
            console.log(res.data)
            if(res.data.code==-1){
              this.$message({
                type:'fail',
                message:res.data.msg
              })
            }else
            {
              this.$message({
                type:'success',
                message:res.data.msg
              })
              this.getAdminList()
              this.create = false
            }
         })
    }
  },
  mounted() {
    this.getAdminList();
  }
};
</script>
<style lang='scss'>
.name{
    text-align: center;
    line-height:42px;
}
</style>