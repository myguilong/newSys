<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="14">
        <div class="block">
          <el-date-picker v-model="value1" type="date" placeholder="选择起始日期"></el-date-picker>----
          <el-date-picker v-model="value2" type="date" placeholder="选择结束日期"></el-date-picker>
        </div>
      </el-col>
      <el-col :span="10">
        <div class="block">
          <el-select v-model="value" placeholder="请选择团长" @change="selectHeader">
            <el-option
              v-for="item in headerList"
              :key="item.name"
              :label="item.name"
              :value="item._id"
            ></el-option>
          </el-select>
        </div>
      </el-col>
    </el-row>

    <div class="orderList">
      <!-- 订单信息 -->
      <ul class="titleTop">
        <li>团长</li>
        <li>金额</li>
        <li>订单号</li>
        <li>订单商品</li>
        <li>地址</li>
        <li></li>
      </ul>
      <ul class="listTab">
        <li v-for="(item, index) in orderlist" :key="index" class="oList">
          <ul>
            <li>{{item.headerId.name}}</li>
            <li>{{item.money}}元</li>
            <li>{{item.orderNo}}</li>
            <li>
              <span v-for="(i, _index) in item.list" :key="_index">{{i.name}},</span>
            </li>
            <li>{{item.headerId.address}}</li>
            <li></li>
            <li>
              <button>查看</button>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <el-footer>
       <el-button type="success" @click="exportOrder">导出订单</el-button>
      <el-button type="warning" @click="deleteXlsx">删除服务器缓存订单</el-button>
    </el-footer>
    <!-- <div class="block">
      <span class="demonstration">带快捷选项</span>
      <el-date-picker
        v-model="value2"
        align="right"
        type="date"
        placeholder="选择日期"
        :picker-options="pickerOptions"
      ></el-date-picker>
    </div>-->
  </div>
</template>
<script>
export default {
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            }
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            }
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            }
          }
        ]
      },
      value1: "",
      value2: "",
      value: "",
      orderlist: [],
      headerList: []
    };
  },
  mounted() {
    this.getHeaderList();
    this.getHeaderOrderList();
  },
  watch: {
    // value(value){
    //   console.log(value)
    // }
  },
  methods: {
    selectHeader() {
      console.log("改变");
      let startTime = new Date(this.value1).getTime();
      let endTime = new Date(this.value2).getTime();
      let data = {};
      this.value ? (data.headerId = this.value) : null;
      this.value1 ? (data.startTime = startTime) : null;
      this.value2 ? (data.endTime = endTime) : null;
      this.$http
        .get("/adminHeader/getHeaderOrder", {
          params: data
        })
        .then(res => {
          console.log(res, "一个团长的订单");
          this.orderlist = res.data.list;
        });
    },
    deleteXlsx() {
      //删除接口服务里缓存的订单
      this.$http.delete("/adminheader/deleteOrderXlsx");
    },
    getHeaderOrderList() {
      this.$http.get("/adminheader/getHeaderOrder").then(res => {
        console.log(res.data, "订单列表");
        this.orderlist = res.data.list;
      });
    },
    getHeaderList() {
      console.log("获取团长列表");
      this.$http.get("/adminHeader/isHeader").then(res => {
        console.log(res.data.data, "团长列表");
        // this.orderlist = res.data.list;
        this.headerList = res.data.data;
      });
    },
    exportOrder() {
      console.log("导出订单");
      if (this.value1 == "" && this.value2 == "") {
        this.$message({
          type: "fail",
          message: "操作失败请选择时间"
        });
      } else if (this.value == "") {
        this.$message({
          type: "fail",
          message: "请选择团长"
        });
      } else {
        let startTime = new Date(this.value1).getTime();
        let endTime = new Date(this.value2).getTime();
        let data = {};
        this.value ? (data.headerId = this.value) : null;
        this.value1 ? (data.startTime = startTime) : null;
        this.value2 ? (data.endTime = endTime) : null;
        this.$http
          .get("/adminheader/exportOrder", {
            params:data
          })
          .then(res => {
            console.log(res.data, "数据导出");
            window.location = `http://localhost:3000/${res.data.fileName}`;
          });
      }
    }
  }
};
</script>
<style lang='scss'>
.block {
  padding-left: 15px;
}
.titleTop {
  display: flex;
  li {
    list-style: none;
    width: 200px;
    text-indent: 20px;
  }
}
.headerList {
  width: 100%;
  display: inline;
  white-space: nowrap;
  overflow-x: scroll;
  float: left;
  overflow-y: hidden;
  height: 50px;
  li {
    display: block;
    width: 80px;
    height: 30px;
    padding-left: 10px;
    float: left;
  }
}
.listTab {
  .oList {
    list-style: none;
    ul {
      display: flex;
      padding: 0;
      li {
        list-style: none;
        width: 200px;
        height: 50px;
        line-height: 50px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        text-indent: 15px;
      }
    }
    button {
      background: #008080;
      color: white;
      width: 100px;
      border-radius: 5px;
      border: none;
      height: 30px;
    }
  }
  .oList:nth-child(odd) {
    background: #008080;
    color: white;
    button {
      background: white;
      color: #008080;
      width: 100px;
      border-radius: 5px;
      border: none;
      height: 30px;
    }
  }
}
</style>