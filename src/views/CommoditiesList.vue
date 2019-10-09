<template>
  <div>
      <h1>商品列表</h1>
      <el-table :data="list">
        <!-- <el-table-column prop="date" label="日期" width="140">
        </el-table-column> -->
        <el-table-column prop="name" label="商品名称" width="180">
        </el-table-column>
        <el-table-column prop="parentCategory.name" label="所属分类" width="120">
        </el-table-column>
         <el-table-column prop="stock" label="剩余库存" width="120">
        </el-table-column>
         <el-table-column prop="price" label="价格" width="120">
        </el-table-column> 
         <el-table-column prop="specifications" label="规格" width="160">
        </el-table-column>
          <el-table-column  label="下架" width="140">
          <template slot-scope="scope">
            <el-button @click="handleDown(scope.row)" size="small" type="success" round>下架</el-button>
          </template>
        </el-table-column>
         <el-table-column  label="删除" width="120">
          <template slot-scope="scope">
             <el-button @click="handleDelte(scope.row)" type="danger" icon="el-icon-delete" circle></el-button>
          </template>
        </el-table-column>
        <el-table-column label="编辑" width="120">
          <template slot-scope="scope">
             <el-button @click="handleEdit(scope.row)" type="primary" icon="el-icon-edit" circle></el-button>
          </template>
        </el-table-column>
      </el-table>
  </div>
</template>
<script>
export default {
     data () {
       return {
         list:[]
       }
     },
     created(){
         this.fetchCommodList()
     },
     activated(){
      console.log('activated')
     },
     deactivated(){
       console.log('deactivated')
     },
     methods: {
        async fetchCommodList(){
          let res =await this.$http.get('/rest/comities/list?id=1')
          this.list = res.data.data
        },
        async handleDown(value){
            console.log(value._id)
            let res = await this.$http.post('/comities/setComities',{
              id:value._id
            })
            console.log(res)
             this.$message({
            type:'success',
            message:'商品下架成功'
          })
            this.fetchCommodList()
        },
        async handleDelte(row){
          await this.$http.get(`/rest/comities/delete?id=${row._id}`)     
          this.$message({
            type:'success',
            message:'删除商品成功'
          })  
          this.fetchCommodList()
         },
         async handleEdit(row){
             console.log(row._id)
             this.$router.push(`/commoditites/Edit/${row._id}`)
             this.$message({
               type:'success',
               message:'编辑商品'
             })
         }
     }
}
</script>
<style lang=''>
     
</style>