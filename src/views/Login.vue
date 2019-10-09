<template>
  <div class="bg" ref="bg">
    <el-row :gutter="24">
      <el-col :span="16">
        <div class="grid-content bg-purple vh"></div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content bg-purple vh"></div>
      </el-col>
    </el-row>
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-col :gutter="24">
        <el-col :span="8">
          <div class="grid-content bg-purple "></div>
        </el-col>
        <el-col :span="8">
          <el-form-item label="用户名" prop="pass" style="color:white;">
            <el-input type="password" v-model="ruleForm.username" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple"></div>
        </el-col>
      </el-col>
      <el-col :gutter="24">
        <el-col :span="8">
          <div class="grid-content bg-purple"></div>
        </el-col>
        <el-col :span="8">
          <el-form-item label="密码" prop="checkPass">
            <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple"></div>
        </el-col>
      </el-col>
       <el-col :gutter="24">
        <el-col :span="8">
          <div class="grid-content bg-purple"></div>
        </el-col>
        <el-col :span="8">
        <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple"></div>
        </el-col>
      </el-col>
    </el-form>
  </div>
</template>
<script>
export default {
  created(){
    // this.$http.get('/users/exit').then(res=>{
    //   console.log(res)
    // })
  },
  mounted(){
  },
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else {
        if (this.ruleForm.username !== "") {
          this.$refs.ruleForm.validateField("username");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      }
    };
    return {
      ruleForm: {
        username: "",
        password: "",
        pintai:'admin'
      },
      rules: {
        username: [{ validator: validatePass, trigger: "blur" }],
        password: [{ validator: validatePass2, trigger: "blur" }]
      }
    };
  },
  methods: {
   submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          // alert("submit!");
           let res = await this.$http.post('/users/signin',this.ruleForm)
           console.log(res)
           if(res.data.code == 0){
             this.$message({
               type:'success',
               message:'登录成功'
             })
            //  let data = await this.$http.get('/users/getuser')
             console.log(res.data)
             localStorage.setItem('userinfo', JSON.stringify(res.data))
             this.$router.push('/')
           }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<style lang='scss'>
.bg {
  width: 98.5vw;
  height: 98vh;
  background: url("../assets/bg1.jpg") 100%;
  color: white;
}
label{
  color: white;
}
.vh{
  height: 280px;
}
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
  color: white;
}
.bg-purple {
  color: white;
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