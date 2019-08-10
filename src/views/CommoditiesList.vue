<template>
  <div>
      <h1>商品列表</h1>
      <el-table :data="list">
        <!-- <el-table-column prop="date" label="日期" width="140">
        </el-table-column> -->
        <el-table-column prop="name" label="商品名称" width="120">
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
            <el-button @click="handleDelte(scope.row)" size="small" type="danger" round>删除</el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" size="small" type="danger" round>编辑</el-button>
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
     methods: {
        async fetchCommodList(){
          let res =await this.$http.get('/rest/comities/list')
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
        }
     }
}
</script>
<style lang=''>
     
</style>