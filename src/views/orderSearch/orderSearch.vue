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

  },
  watch: {
    // value(value){
    //   console.log(value)
    // }
  },
  methods: {
  }
   
}
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