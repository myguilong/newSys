<template>
  <div>
    <el-input v-model="commission" placeholder="修改佣金的比例"></el-input>
    <el-button type="danger" size="medium" @click="setCommission">修改</el-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      commission: ""
    };
  },
  mounted() {
    this.getCommissonSeting();
  },
  methods: {
    //获取当前的佣金比例,接口功能修改为如果佣金比例存在就返回信息，如果比例不存在就创建
    getCommissonSeting() {
      this.$http.get("/money/commissionSeting").then(res => {
        console.log(res.data.data);
        this.commission = res.data.data;
      });
    },
    setCommission() {
      //修改佣金接口
      if (!isNaN(this.commission)) {
        console.log("数字");
        this.$http
          .post("/money/setCommission", {
            commission: this.commission
          })
          .then(res => {
            console.log(res);
            this.$message({
              type: "success",
              message: "修改佣金比例成功，立即生效"
            });
          });
      } else {
        this.$message({
          type: "fail",
          message: "请输入数值"
        });
      }
    }
  }
};
</script>
<style lang='scss'>
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>