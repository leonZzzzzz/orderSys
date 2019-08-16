
<template>
  <div class="con">
    <div class="content-footer">
      <div class="right1">
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
      gostatus(){
        this.$router.go(-1)
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