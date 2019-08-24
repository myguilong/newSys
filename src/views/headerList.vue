<template>
  <div>
   <el-table :data="list">
        <el-table-column prop="name" label="名称" width="120">
        </el-table-column>
        <el-table-column prop="address" label="地址" width="180">
        </el-table-column>
         <el-table-column prop="unaddress" label="详细地址" width="120">
        </el-table-column>
        <el-table-column prop="phone" label="联系电话" width="120">
        </el-table-column>
          <el-table-column prop="money" label="持有佣金" width="120">
        </el-table-column>
         <el-table-column  label="审核" width="120">
          <template slot-scope="scope">
            <el-button @click="handleIS(scope.row)"  type="success" icon="el-icon-check" circle></el-button>
          </template>
        </el-table-column>
        <el-table-column label="删除" width="120">
          <template slot-scope="scope">
            <el-button type="danger" n @click="handleClick(scope.row)" icon="el-icon-delete" circle></el-button>
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
             let res = await this.$http.get('/adminHeader/noHeader')
             this.list = res.data.data
         },
         async handleDelte(row){
             let res = await this.$http.delete(`/rest/category/delete/${row._id}`)
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
         },
         async handleIS(row){
                console.log(row)
               await this.$http.post('/adminheader/setHeader',{
                   userId:row._id,status:1
               })
               this.$message({
                   type:'success',
                   message:'操作成功'
               })
               this.fetchCategoryList()
         }

     },
     created(){
         this.fetchCategoryList()
     }
     
}
</script>
<style lang=''>
     
</style>