<template>
  <div class="about">
    <h1>{{id?'修改分类':'增加分类'}}</h1>
    <el-form label-width="120px" :model="model" @submit.native.prevent="save">
      <el-form-item label="分类名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="分类排序数值">
        <el-input v-model="model.selectId"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  props: {
    id: {}
  },
  data() {
    return {
      model: {
        name: "",
        selectId: ""
      },
      list: []
    };
  },
  created() {
    this.id && this.fetchGetCategory();
  },
   activated(){
      console.log('activated')
     },
     deactivated(){
       console.log('deactivated')
     },
  methods: {
    save() {
      if (this.id) {
        this.fetchEditCategory();
      } else {
        this.fetchCreate();
      }
    },
    async fetchEditCategory() {
      await this.$http.post("/rest/category/edit", {
          id: this.id,
          name: this.model.name,
          selectId: this.model.selectId 
      });
      this.$message({
        type: "success",
        message: "修改分类信息成功"
      });
       Object.assign(this.$data, this.$options.data());
      this.$router.push("/categores/List");
      this.$store.commit('changeTab', "/categores/List")
    },
    async fetchGetCategory() {
      let res = await this.$http.get("/rest/category/getInfo", {
        params: {
          id: this.id
        }
      });
      this.model.name = res.data.data.name;
      this.model.selectId = res.data.data.selectId;
    },
    async fetchCreate() {
      if (this.model.name == "") {
        this.$message({
          type: "fail",
          message: "必须填写参数"
        });
        return false;
      }
      if (this.model.selectId == "") {
        this.$message({
          type: "fail",
          message: "必须填写参数"
        });
        return false;
      }
      await this.$http.post("/rest/category/create", {
          name: this.model.name,
          selectId: this.model.selectId
      });
      this.$message({
        type: "success",
        message: "添加分类成功"
      });
      Object.assign(this.$data, this.$options.data());
      this.$router.push("/categores/List");
      this.$store.commit('changeTab', "/categores/List")
    }
  }
};
</script>
<style lang='scss'>
</style>