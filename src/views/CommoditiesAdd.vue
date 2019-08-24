<template>
  <el-form ref="form" :model="form" label-width="80px" @submit.native.prevent="save">
    <el-form-item>
      <el-col :span="11">
        <el-input v-model="form.name" placeholder="商品名称" ></el-input>
      </el-col>
      <el-col class="line" style="text-align: center;" :span="2">---</el-col>
      <el-col :span="11">
        <el-input v-model="form.Specifications" placeholder="商品规格"></el-input>
      </el-col>
    </el-form-item>
    <el-form-item label="分类">
      <el-select v-model="form.region" placeholder="商品所属分类">
        <el-option
          v-for="item in categoryList"
          :label="item.name"
          :value="item._id"
          :key="item._id"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item >
      <el-col :span="6">
        <el-input v-model="form.price" placeholder="商品价格"></el-input>
      </el-col>
      <el-col class="line" style="text-align: center;" :span="2">---</el-col>
      <el-col :span="6">
        <el-input v-model="form.oldprice" placeholder="对比价格"></el-input>
      </el-col>
       <el-col class="line" style="text-align: center;" :span="2">---</el-col>
         <el-col :span="6">
        <el-input v-model="form.limit" placeholder="限购数不填为不限购"></el-input>
      </el-col>
    </el-form-item>
    <el-form-item label="商品库存">
      <el-col :span="10">
        <el-input  v-model="form.stock" placeholder="商品库存"></el-input>
      </el-col>
    </el-form-item>
    <el-form-item >
      <p>轮播图上传</p>
      <div class="vue-uploader" >
      <div class="file-list imgUpload">
        <section v-for="(file, index) of files" class="file-item draggable-item" :key="file.name">
          <img :src="file.src" alt ondragstart="return false;">
          <span class="file-remove" @click="remove(index)">+</span>
        </section>
        <section v-if="status == 'ready'" class="file-item">
          <div @click="add" class="add"></div>
        </section>
      </div>
      <section v-if="files.length != 0" class="upload-func">
        <div class="progress-bar">
          <section v-if="uploading" :width="(percent * 100) + '%'">{{(percent * 100) + '%'}}</section>
        </div>
        <div class="operation-box">
          <button v-if="status == 'ready'" @click.prevent="submit">上传</button>
          <button v-if="status == 'finished'" @click="finished">完成</button>
        </div>
      </section>
      <input
        type="file"
        @change="fileChanged"
        ref="file"
        multiple="multiple"
        accept="image/jpg, image/jpeg, image/png, image/bmp"
      >
    </div>
    </el-form-item>
     
    <el-form-item >
       <VueEditor
        style="width:900px"
        useCustomImageHandler
        @imageAdded="handleImageAdded"
        :editorToolbar="customToolbar"
        v-model="form.content"
      ></VueEditor>
    </el-form-item>
    <el-form-item>
        <el-button  type="primary" native-type="submit">保存</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import OSS from 'ali-oss'
import { VueEditor } from "vue2-editor";
export default {
  props: {
    id: {}
  },
  components: {
    VueEditor
  },
  data() {
    return {
      form: {
        Specifications:"",
        name: "",
        region: "",
        price: "",
        stock: "",
        oldprice:"",
        delivery: false,
        type: [],
        content:'',
        limit:''
      },
      categoryList: [],
       customToolbar: [
        ["bold", "italic", "underline"],
        [{ align: "" }, { align: "center" }, { align: "right" }],
        [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
        [{ background: [] }, { color: [] }],
        ["image", "link"],
        ["strike"],
        ["clean"]
      ],
      status: "ready",
      files: [],
      uploading: false,
      myImglist:[],
      uploadImgList:[]
  
    };
  },
  created() {
    this.fetchCategoryList();
    // this.id&&this.getCommitesInfo()
  },
  methods: {
    remove(index) {
      this.files.splice(index, 1);
    },
     async save(){
        let res = await this.$http.post('/rest/comities/create',{
           name:this.form.name,
           price:this.form.price,
           specifications:this.form.Specifications,
           oldprice:this.form.oldprice,
           stock:this.form.stock,
           content:this.form.content,
           parentCategory:this.form.region,
           limit:this.form.limit,
           sellOut:0,
           bannerlist:this.uploadImgList,
           status:1
        })
        if(res.data.code == 0){
          this.$message({
            type:'success',
            message:'商品上架成功'
           })
        this.$router.push('/commoditites/List')
        }
     },
     add() {
      this.$refs.file.click();
     },
     isContain(file) {
      return this.files.find(
        item => item.name === file.name && item.size === file.size
      );
    },
     html5Reader(file, item) {
      const reader = new FileReader();
      reader.onload = e => {
        this.$set(item, "src", e.target.result);
      };
      reader.readAsDataURL(file);
    },
      timestamp: function() {
      const time = new Date();
      const y = time.getFullYear();
      const m = time.getMonth() + 1;
      const d = time.getDate();
      const h = time.getHours();
      const mm = time.getMinutes();
      const s = time.getSeconds();
      const ms = time.getMilliseconds();
      return (
        "" +
        y +
        this.Add0(m) +
        this.Add0(d) +
        this.Add0(h) +
        this.Add0(mm) +
        this.Add0(s) +
        this.Add0(ms)
      );
    },
    Add0: function(m) {
      return m < 10 ? "0" + m : m;
    },
    fileChanged() {
      const list = this.$refs.file.files;
      for (let i = 0; i < list.length; i++) {
        if (!this.isContain(list[i])) {
          const item = {
            name: list[i].name,
            size: list[i].size,
            file: list[i]
          };
          this.html5Reader(list[i], item);
          this.files.push(item);
        }
      }
      this.$refs.file.value = "";
    },
     submit() {
       //上传轮播图
      const client = new OSS({
        region: "oss-cn-shenzhen",
        accessKeyId: "LTAIDaT373YHmkTC",
        accessKeySecret: "ndTGswjQlWA2uz1m4Du3Drd73ULN13",
        bucket: "mycz"
      });
      const fNum = this.files;
      let oldImg = []; //用来存放未改变的数组
      for (var i = 0; i < fNum.length; i++) {
        if (fNum[i].name) {
        
          var f = fNum[i].file;
      
          const Name = f.name;
       
          const suffix = Name.substr(Name.indexOf("."));
          const obj = this.timestamp();
          const storeAs = "header/" + obj + suffix; // 路径+时间戳+后缀名
          
          this.myImglist.push(storeAs);
          client
            .multipartUpload(storeAs, f)
            .then(result => {   
            })
            .catch(err => {
              this.$message.error(`遇到无法上传的文件格式,错误为${err}`);
            });
       
          //得到所有上传图片名称的数组,在将mylist的图片进行签名验证返回图片地址
          let newArr = this.myImglist.map(item => {
            return client.signatureUrl(item, { expires: 315360000 });
          });
          this.$alert("图片上传成功", "提示", {
            confirmBttonText: "确定"
          });
          this.status = "finished";
      
          this.uploadImgList = newArr;
        
        }
        else{
          oldImg.push(fNum[i].src)
        }
      }
        //处理图片将之前的图片和新的图片合并到uploadImgList
        this.uploadImgList = oldImg.concat(this.uploadImgList)
    },
    finished() {
      this.files = [];
      this.status = "ready";
    },
    onSubmit() {
    
    },
    handleImageAdded(file, Editor, cursorLocation) {
      //上传图片操作
      const clinet = new OSS({
        region: "oss-cn-shenzhen",
        accessKeyId: "LTAIDaT373YHmkTC",
        accessKeySecret: "ndTGswjQlWA2uz1m4Du3Drd73ULN13",
        bucket: "mycz"
      });
      //命名规则
      let random = Math.floor(Math.random() * 1000);
      //取一个随机数的一千倍,在加上当前时间戳
      var timestamp = Date.parse(new Date());
      //把获取到的图片url 插入到鼠标所在位置 回显图片
      let strName = timestamp.toString() + random.toString() + file.name;
      clinet.multipartUpload(strName, file).then(res => {
        //设置过期时间
        //生成url
        var imgstr = clinet.signatureUrl(res.name,{expires: 315360000})
        Editor.insertEmbed(
          cursorLocation,
          "image",
          imgstr 
         
        );
      });
    },
    async fetchCategoryList() {
      const res = await this.$http.get("/rest/category/list");
      this.categoryList = res.data.data;
    },
    async getCommitesInfo(){
       console.log(this.id,'当前修改商品id')
        const res  = await this.$http.get(`/rest/comities/getInfo?id=${this.id}`)
        console.log(res.data.data)
        this.form.name = res.data.data.name
        this.form.price = res.data.data.price
        this.form.Specifications = res.data.data.specifications
        this.form.stock = res.data.data.stock
        this.form.content =  res.data.data.content
        this.form.region = res.data.data.parentCategory
        this.form.limit = res.data.data.limit
        this.uploadImgList = res.data.data.bannerlist
        this.form.oldprice = res.data.data.oldprice
        this.myImglist = res.data.data.bannerlist
        this.files =  res.data.data.bannerlist
       }
  }
};
</script>
<style lang="scss">
  .vue-uploader {
  border: 1px solid #e5e5e5;
  margin: 30px;
  background: white;
}
.vue-uploader .file-list {
  padding: 10px 0px;
}
.vue-uploader .file-list:after {
  content: "";
  display: block;
  clear: both;
  visibility: hidden;
  line-height: 0;
  height: 0;
  font-size: 0;
}
.vue-uploader .file-list .file-item {
  float: left;
  margin-left: 10px;
  height: 160px;
  position: relative;
  width: 150px;
  text-align: center;
}
.vue-uploader .file-list .file-item img {
  width: 150px;
  height: 150px;
  border: 1px solid #ececec;
}
.vue-uploader .file-list .file-item .file-remove {
  position: absolute;
  right: 4px;
  display: none;
  top: 4px;
  width: 20px;
  height: 20px;
  font-size: 20px;
  text-align: center;
  color: white;
  cursor: pointer;
  line-height: 20px;
  border-radius: 100%;
  transform: rotate(45deg);
  background: rgba(0, 0, 0, 0.5);
}
.vue-uploader .file-list .file-item:hover .file-remove {
  display: inline;
}
.vue-uploader .file-list .file-item .file-name {
  margin: 0;
  height: 40px;
  word-break: break-all;
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.vue-uploader .add {
  width: 50px;
  background-position: center;
  height: 50px;
  float: left;
  text-align: center;
  line-height: 50px;
  font-size: 15px;
  cursor: pointer;
  background-size: 100% 100%;
}
.vue-uploader .upload-func {
  display: flex;
  padding: 10px;
  margin: 0px;
  background: #f8f8f8;
  border-top: 1px solid #ececec;
}
.vue-uploader .upload-func .progress-bar {
  flex-grow: 1;
}
.vue-uploader .upload-func .progress-bar section {
  margin-top: 5px;
  background: #00b4aa;
  border-radius: 3px;
  text-align: center;
  color: #fff;
  font-size: 12px;
  transition: all 0.5s ease;
}
.vue-uploader .upload-func .operation-box {
  flex-grow: 0;
  padding-left: 10px;
}
.vue-uploader .upload-func .operation-box button {
  padding: 4px 12px;
  color: #fff;
  background: #007acc;
  border: none;
  border-radius: 2px;
  cursor: pointer;
}

.vue-uploader > input[type="file"] {
  display: none;
}
</style>