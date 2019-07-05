
<template>
  <div class="con">
    <div class="header">
      <img src="../../assets/logotitle.png" alt />
      <span class="top-right">
        {{name}}，欢迎您
        <el-button type="danger" plain style="padding: 2px;margin-left: 20px;" @click="logout">退出</el-button>
      </span>
    </div>
    <div class="content-footer">
      <div class="left">
        <el-row>
          <el-col>
            <el-menu
              default-active="1"
              class="el-menu-vertical-demo"
              @open="handleOpen"
              @close="handleClose"
              text-color="#000"
              active-text-color="#409EFF"
            >
              <el-menu-item index="1">
                <img src alt />
                <!-- <i class="el-icon-s-order"></i> -->
                <img
                  width="25px;"
                  src="data:image/png;base64,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CoSaDJ2Z6GaYw5koEDgNM8zhzBQINRkqM9HNMIczUyDUZKjMRDfDHM5MgVCbQT4T3QxzOHs2ElJMnc9EN8Mczp2XhBVTLxsJoQw2ElaLJSwAClEgABSiQAAoRIEAUIgCAaAQBQJAIQoEgEIUCACFKBAAClEgABSiQAAoRIEAUIgCAaAQBQJAIQoEgEIUCACFKBAAClEgABSiQAAoRIEAUIgCAaAQBQJAIQoEgEIUCACFKJCqmR/L0u+8/XbZMaBSlsaVMezYsbJjMJACqZrLYm9+9a23yo4BVZIviVtj06FDZedgIAVSNXfEQzFuz56yY0CVpG/GpPh5V1fZORhIgVTNjXletG3eXHYMqJS/TR9OTa6LqlEgFdO3pGFy3rFxY9k5oEry0bwp/sB1UTUKpGIOTb2ko2XLli15afTEvoMHy84DZcpr48vxvQMHej53oLv5M9u2lZ2HgRRI5cyendKJE7E1Xx23rVxZdhoo1YfTzWn7ww9H3J9S6usrOw4DKZCK+uATF9z8gX2PPhqT4qvx/X37ys4Dv1HH0oNx0f79Yx7vfWXk1R0dZcfh9BRIRb2a/ipdlY4ejXG5JXa2tUVTrI3dOZedC95X/f/zN6OjYea8eftXt26b2NbbW3YsTk+BVFz3prmdLe2dnflj0Rv/+uCDZeeB91Nem+9NO5ct677gjunNm597ruw8vDcFUid6NhzYM/mxe++NqfGpWPP002XngfNqZjwen3vqqZ4bD97S3LZkSdlxODup7ADUKuecU2rMHdEV992XWtLVsWnx4uiOudGS/J7Uh/6lqg0xNy1/6KHujx24o/nHixZ5WV5f3HDqXNP9667adXzmzPh6fiD9aPXq+FX0xISJE8vOBafV/1HIC2lZw5MLFliqqm8KZJC4Mv9z/s88atT/Lu099s6Ou+6KKfGh9JO2tjQ3lscN48eXnY+hqX8fR0REuvyRRz74F6O7h32mvf3URyLUNQUyaN2Xc25oaBx76Wf37pk2Lc1peL5v+owZsTV/N9qmTctfillxrLk57YrRaV5jY6yJe/IvRowoOzV14t1To/OU6M2P9vSkh6IzRu7ZE38Zy9PkzZvzS+lracXGjT1PvtE8adPWrZamAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD4//4PSUrn2CLk5uEAAAAldEVYdGRhdGU6Y3JlYXRlADIwMTktMDYtMTJUMTg6NDE6MzQrMDg6MDBuq9mEAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE5LTA2LTEyVDE4OjQxOjM0KzA4OjAwH/ZhOAAAAE50RVh0c3ZnOmJhc2UtdXJpAGZpbGU6Ly8vaG9tZS9hZG1pbi9pY29uLWZvbnQvdG1wL2ljb25feDZnajVudjE0ei9hcnRpY2xlLWZpbGwuc3Zn/W7qawAAAABJRU5ErkJggg=="
                  alt
                />
                <span slot="title">订单处理</span>
              </el-menu-item>
            </el-menu>
          </el-col>
        </el-row>
      </div>
      <div class="right">
        <div class="batchdel">
          <div class="box">
            <div class="tips">
              <span class="excel">温馨提示：Excel需要以示例格式为准，否则无法获取数据</span>
              <span class="example">
                <!-- <a href>示例模板</a> -->
                <a style="color:#fff" href="/upload/xls/send_complex_example.xlsx">示例模板</a>
              </span>
            </div>
            <div class="classic">
              <p>批量发货教程</p>
              <p>
                1.下载
                <a href="/upload/xls/send_complex_example.xlsx">批量发货模板</a>，用Excel打开
              </p>
              <p>2.在示例模板文件中将示例单号及物流删除，填入您自己的订单ID，以及对应发货的物流公司、物流单号。</p>
              <p>3.填写后，大功告成。把文件去上传批量发货吧。</p>
            </div>
            <div class="upload">
              <span class="file">Excel文件上传：</span>

              <div class="choose">
                <!-- <input type="file" id="file" name="send_file">
                <input type="submit" value="上传" @click="batchDel">-->
                <el-upload
                  class="loadongo"
                  ref="upload"
                  action="doUpload"
                  :limit="1"
                  :before-upload="beforeUpload"
                >
                  <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                  <div
                    slot="tip"
                    v-show="loadflag"
                    class="el-upload-list__item-name"
                    style="display:inline"
                  >请选择要上传的文件</div>
                  <div
                    slot="tip"
                    class="el-upload-list__item-name"
                    style="display:inline"
                  >{{fileName}}</div>
                </el-upload>
                <el-button type="success" @click="submitUpload()">确定</el-button>
              </div>
            </div>
            <div
              style="margin-top:20px;padding:10px;background:rgb(242,248,254)"
              v-if="fileList.length>0"
            >
              <el-table :data="fileList" border>
                <el-table-column fixed prop="name" label="附件名称" width="300"></el-table-column>
                <el-table-column prop="file" label="附件地址"></el-table-column>
                <el-table-column label="状态" width="70">
                  <template slot-scope="scope">
                    <span v-if="scope.row.send_status==0" type="text" size="small" width="100">未处理</span>
                    <span v-if="scope.row.send_status==1" type="text" size="small" width="100">成功</span>
                    <span v-if="scope.row.send_status==2" type="text" size="small" width="100">失败</span>
                  </template>
                </el-table-column>
                <el-table-column label="上传时间" width="150px">
                  <template>
                    <span>{{pro_num | formatDate}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="remark" label="备注" width="180"></el-table-column>
                <el-table-column label="操作" width="60">
                  <template slot-scope="scope">
                    <el-button type="text" size="small" @click="choseIt(scope.row.pigcms_id)">发货</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <div style="height:25px">
                <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :page-size="15"
                  layout="total, prev, pager, next, jumper"
                  :total="count"
                ></el-pagination>
              </div>
            </div>
            <div class="datalist" v-else>
              <div>还没有相关数据</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import moment from 'moment'
import axios from 'axios'
let qs = require("qs");
export default {
    data(){
      return{
        count:null,
        name:'',
        fileList:[],
        file:'',
        fileName:'',
        mainUrl: this.domain.testUrl,//公共域名
        workId:'',
        store_id:'',
        loadflag:true,
        isRouterAlive:true,
        page:'1'
      }
    },
    mounted:function(){
      this.workId = this.$route.query.id;
      this.name = this.$route.query.name;
      if(!this.name || !this.workId){
        window.location.href ="supplier.php?c=index&a=index";
      }else{
        this.bulkCon();
      }
      
    },
    methods:{
      reload(){
        this.isRouterAlive=false;
        this.$nextTick(()=>{
          this.isRouterAlive = true;
        })
      },
      // 退出
      logout() {
        // if (window.history.length <= 1) {
          // this.$router.push({ path: '/' })
        //   return false
        // } else {
        //   this.$router.go(-1)
        // }
        this.axios.post('supplier.php?c=index&a=login_out').then(res=>{
          window.location.href ="supplier.php?c=index&a=index";
        })
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.page = val;
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.page = val;
        this.bulkCon();
      },
      // 发货
      choseIt(a){
        console.log(a)
        var params = {supplier_id:this.workId,attachment_id:a};
        this.axios.post('supplier.php?c=order&a=batch_send',qs.stringify(params)).then((res)=>{
          console.log(res)
          let {err_code,err_msg} = res.data;
          if(err_code==0){
            this.$message({
              message: err_msg,
              type: 'success',
              duration: 1500,
              onClose: () => {
                location.reload();
              }
            })
          }else{
            this.$message.error(err_msg)
          }
        })
      },
      beforeUpload(file){
        console.log(file,'文件');
        this.loadflag = false;
        this.files = file;
        const extension = file.name.split('.')[1] === 'xls'
        const extension2 = file.name.split('.')[1] === 'xlsx'
        const isLt2M = file.size / 1024 / 1024 < 5
        if (!extension && !extension2) {
        this.$message.warning('上传模板只能是 xls、xlsx格式!')
        return
        }
        if (!isLt2M) {
        this.$message.warning('上传模板大小不能超过 5MB!')
        return
        }
        this.fileName = file.name;
        return false // 返回false不会自动上传
      },
      submitUpload() {
        console.log('上传'+this.files.name)
        if(this.fileName == ""){
          this.$message.warning('请选择要上传的文件！')
          return false
        }
        let fileFormData = new FormData();
        fileFormData.append('send_file', this.files, this.fileName);//filename是键，file是值，就是要传的文件，test.zip是要传的文件名
        fileFormData.append("supplier_id",this.workId)
        let requestConfig = {
          headers: {
          'Content-Type': 'multipart/form-data'
          },
        }
        var params = {fileFormData,supplier_id:this.workId};
        this.axios.post('supplier.php?c=order&a=upload_send',fileFormData, requestConfig).then((res) => {
          console.log(res)
          let {err_code,err_msg} = res.data;
          if(err_code==0){
            this.bulkCon();
            // this.$message({
            //   message: err_msg,
            //   type: 'success',
            //   duration: 1500,
            //   onClose: () => {
            //   }
            // })
          }else{
            this.$message.error(err_msg)
          }
        }) 
      },
      // 批量的日志记录
      bulkCon(){
        var params= {supplier_id:this.workId,p:1};
        this.axios.post('supplier.php?c=order&a=upload_log',qs.stringify(params)).then((res)=>{
          console.log(res)
          let {err_code,err_msg} = res.data;
          this.fileList = err_msg.list;
          this.count =Number(err_msg.count);
        })
      },
      // 批量发货
      batchDel(){
        var formData = new FormData();
        formData.append("picture",document.getElementById("pic").files[0]);
        console.log(formData)
        // var formData = new FormData();
        // formData.append("file",document.getElementById("file").files[0]);

        var params = {send_file:formData,supplier_id:this.workId};
        this.axios.post('supplier.php?c=order&a=upload_send',qs.stringify(params)).then((res)=>{
          console.log(res)
          // let {err_code,err_msg} = res.data;
          // this.fileList = err_msg.list;
        })
      },
    },
    filters: {
      formatDate: function (value) {
        return moment(value).format('YYYY-MM-DD hh:mm:ss')
      }
    }
}
</script>
<style lang="">
@import "../common/index.css";
.datalist {
  min-height: 120px;
  border: 1px solid rgb(243, 242, 242);
  margin-top: 20px;
  background: rgb(251, 251, 251);
}
.datalist div {
  width: 100%;
  text-align: center;
  margin-top: 50px;
  font-size: 13px;
}
.el-pagination {
  height: 30px;
}
a {
  text-decoration: none;
}
.classic {
  margin-top: 5px;
  font-size: 13px;
  padding: 3px 15px;
  background: rgb(246, 246, 246);
}
.el-table td,
.el-table th {
  padding: 1px;
}
.loadongo {
  float: left;
}
.choose input:nth-child(1) {
  /* border: 1px solid rgb(87, 183, 247); */
  font-size: 12px;
}
.choose span {
  font-size: 12px;
}
.choose input:nth-child(2) {
  margin-left: 30px;
  border-radius: 3px;
  font-size: 12px;
  padding: 4px 7px;
  background: rgb(68, 181, 73);
  color: #fff;
}
.upload {
  height: 50px;
  padding: 15px;
  line-height: 50px;

  box-shadow: 0 0 3px rgb(207, 206, 206);
  background: rgb(252, 250, 250);
  margin-top: 20px;
}
.file {
  font-size: 13px;
}

.choose {
  display: inline;
  float: right;
}
.batchdel {
  width: 100%;
  height: 100%;
}
.box {
  /* width: 100%;
  height: 100%; */
  padding: 10px;
  margin: 10px;
  box-shadow: 0 0 5px rgb(162, 197, 243);
}
.tips {
  font-size: 13px;
  padding: 15px;
  background: rgb(247, 247, 142);
}
.example {
  float: right;
  /* width: 100px; */
  background: rgb(92, 155, 248);
  color: #fff;
  padding: 5px 10px;
  font-size: 12px;
  border-radius: 3px;
}
</style>