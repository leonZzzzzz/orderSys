<template>
  <div class="con">
    <div class="content-footer">
      <div class="right1">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item class="top-left">账单结算</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="order-content" style="height:55px;">
          <ul>
            <li>结算方式：{{account_type_msg}}</li>
          </ul>
          <ul v-if="is_land==1">
            <li>收款账户：{{bank_receive}}</li>
            <li>{{bank}}：{{bank_number}}</li>
            <li style="margin-top:2px">
              <el-button
                style="color:blue;font-size:16px"
                type="text"
                @click="dialogVisible = true"
              >修改</el-button>
            </li>
          </ul>
          <ul v-else>
            <li style="margin-top:2px">
              <el-button
                style="color:blue;font-size:16px"
                type="text"
                @click="dialogVisible = true"
              >新增</el-button>
            </li>
          </ul>
        </div>
        <!-- 筛选 -->
        <el-form
          ref="form"
          :model="form"
          label-width="80px"
          style="height: 55px !important;margin-left: 20px;"
        >
          <el-form-item label="时间">
            <el-col :span="4.5">
              <el-date-picker
                v-model="time1"
                align="right"
                type="datetime"
                placeholder="开始日期"
                :picker-options="pickerOptions1"
                style="width: 230px;margin-right:10px;"
              ></el-date-picker>
              <!-- <el-date-picker type="date" placeholder="选择日期" style="width: 100%;"></el-date-picker> -->
            </el-col>
            <el-col class="line" :span="0.5">-</el-col>
            <el-col :span="4.5">
              <el-date-picker
                v-model="time2"
                align="right"
                type="datetime"
                placeholder="结束日期"
                :picker-options="pickerOptions1"
                style="width:230px;margin-left:10px;"
              ></el-date-picker>
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-button class="btn1" type="primary" @click="supData">筛选</el-button>
            <el-button @click="open6">导出数据</el-button>
          </el-form-item>
        </el-form>
        <!-- 表格 -->
        <div style="margin-left:20px;margin-top:20px;padding:10px;background:rgb(242,248,254)">
          <el-table :data="listData" border>
            <el-table-column fixed prop="add_time" label="日期"></el-table-column>
            <el-table-column prop="order_nums" label="发货订单数" width="100px"></el-table-column>
            <el-table-column prop="order_money" label="发货订单总额（元）"></el-table-column>
            <el-table-column prop="return_nums" label="退货订单数" width="100px"></el-table-column>
            <el-table-column prop="return_money" label="退货金额（元）"></el-table-column>
            <el-table-column prop="postage_money" label="运费（元）" width="90px"></el-table-column>
            <el-table-column prop="total_money" label="总计（元）" width="90px"></el-table-column>
            <el-table-column prop="status_msg" label="状态" width="100px"></el-table-column>
            <el-table-column label="操作" width="200px">
              <template scope="scope">
                <el-button @click="exportForm(scope.row.id)" type="text" size="small">导出订单报表</el-button>
                <el-button @click="gotostated(scope.row.id)" type="text" size="small">账单明细</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>

        <!-- 分页 -->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-size="15"
          layout="total, prev, pager, next, jumper"
          :total="count"
        ></el-pagination>
        <!-- 弹窗 -->
        <el-dialog
          title="供应商信息"
          :visible.sync="dialogVisible"
          width="30%"
          :before-close="handleClose"
        >
          <div class="model_row sale">
            <div style="width:70px;text-align:right;display:inline;">
              <label class="label">收款账户：</label>
            </div>
            <el-input style="width:230px" v-model="bank_receive"></el-input>
          </div>
          <div class="model_row sale">
            <div style="width:70px;text-align:right;float:left;margin-right:4px;">
              <label class="label">银行：</label>
            </div>
            <el-input style="width:230px" v-model="bank"></el-input>
          </div>
          <div class="model_row sale">
            <div style="width:70px;text-align:right;float:left;margin-right:4px;">
              <label class="label">账号：</label>
            </div>
            <el-input style="width:230px" v-model="bank_number"></el-input>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="addclick">确 定</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
let qs = require("qs");
export default {
  provide(){
    return{
      reload:this.reload
    }
  },
  data() {
    return {
      dialogVisible: false,
      mainUrl: this.domain.testUrl,//公共域名
      // mainUrl:'https://dev.qutego.com/',
      total: '',
      pickerOptions1: {
        shortcuts: [{
          text: '今天',
          onClick(picker) {
            picker.$emit('pick', new Date());
          }
        }, {
          text: '昨天',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24);
            picker.$emit('pick', date);
          }
        }, {
          text: '一周前',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', date);
          }
        }]
      },
      time1:'',
      time2:'',
      name:'',
      id:'',
      account_type_msg:'',
      bank:'',
      bank_number:'',
      bank_receive:'',
      is_land:'1',
      page:'1',
      count:'',
      listData:[],
    };
  },
  mounted:function(){
    this.name = this.$route.query.name;
    this.id = this.$route.query.id;
    this.getBank();
    this.supData()
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.page = val;
      this.supData()

    },
    // 获取银行信息
    getBank(){
      var params = {sup_id:this.id}
      this.axios.post(this.mainUrl+'supplier.php?c=bill&a=bank_info', qs.stringify(params)).then(res=>{
        console.log(res)
        var {err_code,err_msg}=res.data
        if(err_code==0){
          this.account_type_msg=err_msg.account_type_msg
          this.bank = err_msg.bank
          this.bank_number=err_msg.bank_number
          this.bank_receive=err_msg.bank_receive
          this.is_land=err_msg.is_land
        }else{
          this.$message({
            type: 'error',
            message: err_msg
          });
        }
      })
    },
    // 新增或编辑
    addclick(){
      var params = {sup_id:this.id,bank:this.bank,bank_number:this.bank_number,bank_receive:this.bank_receive}
      this.axios.post(this.mainUrl+'supplier.php?c=bill&a=updata_bank',qs.stringify(params)).then(res=>{
        console.log(res)
        var {err_code,err_msg}=res.data;
        if(err_code==0){
          this.$message({
            type:'success',
            message:err_msg
          })
          this.dialogVisible=false;
          this.getBank();
        }else{
          this.$message({
            type: 'error',
            message: err_msg
          });
        }
      })
    },
    // 列表or筛选
    supData(){
      var startdate = this.$moment(this.time1).format('YYYY-MM-DD HH:mm:ss') 
      var enddate = this.$moment(this.time2).format('YYYY-MM-DD HH:mm:ss') 
      var params={sup_id:this.id,p:this.page,start_time:startdate,end_time:enddate};
      this.axios.post(this.mainUrl+'supplier.php?c=bill&a=supplier_bill', qs.stringify(params)).then(res=>{
        console.log(res)
        var {err_code,err_msg}=res.data
        if(err_code==0){
          this.listData=err_msg.list
          this.count =Number(err_msg.count) 
        }else{
          this.$message({
            type: 'error',
            message: err_msg
          });
        }
      })
    },
    // 导出
    open6() {
      this.$confirm('确认导出?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        var startdate = this.$moment(this.time1).format('YYYY-MM-DD HH:mm:ss')
        var enddate = this.$moment(this.time2).format('YYYY-MM-DD HH:mm:ss')
        var params = {sup_id: this.id,start_time: startdate, end_time: enddate };
        var url = this.mainUrl+"supplier.php?c=bill&a=out_bill"
        this.axios.post(url, qs.stringify(params)).then(res => {
          console.log(res, params)
          let { err_code, err_msg } = res.data;
          if (err_code == 0) {
            url += "&sup_id=" + this.id + "&start_time=" + startdate + "&end_time=" + enddate;
            console.log(url)
            window.location.href = url;
          } else {
            this.$message({
              type: 'error',
              message: err_msg
            });
          }
        })
      }).catch(() => {
        // this.$message({
        //   type: 'info',
        //   message: '已取消'
        // });
      });
    },
    // 导出订单报表
    exportForm(id){
      var url=this.mainUrl+'supplier.php?c=bill&a=out_order_form';
      url+="&id="+id
      window.location.href = url
    },
    // 跳转账单明细
    gotostated(id){
      this.$router.push({
        path:'/stated',
        query:{id:id}
      })
    }

  },
}
</script>
<style lang="">
@import "../common/index.css";
</style>
