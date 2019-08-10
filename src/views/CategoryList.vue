<template>
  <div>
   <el-table :data="list">
        <!-- <el-table-column prop="date" label="日期" width="140">
        </el-table-column> -->
        <el-table-column prop="name" label="分类名称" width="120">
        </el-table-column>
        <el-table-column prop="selectId" label="排序数值" width="120">
        </el-table-column>
         <el-table-column  label="删除" width="120">
          <template slot-scope="scope">
            <el-button @click="handleDelte(scope.row)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
  </div>
</template>
<script>
export default {
     data(){
          return {
              list:[]
          } 
     },
     methods: {
         async fetchCategoryList(){
             let res = await this.$http.get('/rest/category/list')
             this.list = res.data.data
         },
         async handleDelte(row){
             let res = await this.$http.get(`/rest/category/edit/${row._id}`)
             if(res.data.code == 0){
                 this.$message({
                     type:'success',
                     message:`${res.data.msg}`
                 })
                 this.fetchCategoryList()
             }
         },
         async handleClick(row){
           this.$router.push(`/categores/Edit/${row._id}`)
         }

     },
     created(){
         this.fetchCategoryList()
     }
     
}
</script>
<style lang=''>
     
</style>