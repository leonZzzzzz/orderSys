<template>
  <div class="con">
    <div class="content-footer">
      <div class="right1">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item class="top-left">账单明细</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="order-content" style="height:50px;">
          <div class="stated_title">
            2019年07月10日账单汇总详情
            <div class="title_small">（{{lists.status}}）</div>
          </div>
        </div>
        <div class="fix_content">
          <div class="analy">
            <ul>
              <li>发货订单总额：{{lists.order_money}}元</li>
              <li>退货金额：{{lists.return_money}}元</li>
              <li>运费：{{lists.postage_money}}元</li>
            </ul>
            <ul>
              <li>发货订单数：{{lists.order_nums}}元</li>
              <li>退货订单数：{{lists.return_nums}}元</li>
            </ul>
          </div>
          <div class="fix_total">
            总计：{{lists.order_money}}-{{lists.return_money}}+{{lists.postage_money}} =
            <div class="totals">{{lists.total_money}}</div>
          </div>
        </div>

        <div class="bank">
          <div>收款账户：{{lists.bank_info.bank_receive}}</div>
          <div>{{lists.bank_info.bank}}：{{lists.bank_info.bank_number}}</div>
        </div>
        <!-- 表格 -->
        <div style="margin-left:20px;margin-top:20px;padding:10px;background:rgb(242,248,254)">
          <div class="status">发货订单明细</div>
          <el-table :data="listsData" border>
            <el-table-column fixed prop="order_no" label="订单编号"></el-table-column>
            <el-table-column prop="pro_name" label="商品名称"></el-table-column>
            <el-table-column prop="pro_code" label="商品编号"></el-table-column>
            <el-table-column label="商品规格">
              <template scope="scope">
                <span
                  v-for="(item,index) in scope.row.sku_name"
                  v-if="scope.row.sku_name!='--'"
                >{{item.name}}:{{item.value}}</span>
                <span v-else>-</span>
              </template>
            </el-table-column>
            <el-table-column prop="pro_cost_price" label="单价（元）"></el-table-column>
            <el-table-column prop="pro_num" label="数量"></el-table-column>
            <el-table-column prop="total_money" label="总计（元）"></el-table-column>
          </el-table>
        </div>
        <!-- 分页 -->
        <el-pagination
          @current-change="handleCurrentChange"
          :page-size="15"
          layout="total, prev, pager, next, jumper"
          :total="count"
        ></el-pagination>

        <div style="margin-left:20px;margin-top:50px;padding:10px;background:rgb(242,248,254)">
          <div class="status">退货订单明细</div>
          <el-table :data="listsData1" border>
            <el-table-column fixed prop="order_no" label="订单编号"></el-table-column>
            <el-table-column prop="pro_name" label="商品名称"></el-table-column>
            <el-table-column prop="pro_code" label="商品编号"></el-table-column>
            <el-table-column label="商品规格">
              <template scope="scope">
                <span
                  v-for="(item,index) in scope.row.sku_name"
                  v-if="scope.row.sku_name!='--'"
                >{{item.name}}:{{item.value}}</span>
                <span v-else>-</span>
              </template>
            </el-table-column>
            <el-table-column prop="pro_cost_price" label="单价（元）"></el-table-column>
            <el-table-column prop="pro_num" label="数量"></el-table-column>
            <el-table-column prop="total_money" label="总计（元）"></el-table-column>
          </el-table>
        </div>
        <!-- 分页 -->
        <el-pagination
          @current-change="handleCurrentChange1"
          :page-size="15"
          layout="total, prev, pager, next, jumper"
          :total="count1"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
let qs = require("qs");
export default {
    data(){
        return{
            id:'',
            mainUrl: this.domain.testUrl,//公共域名
            // mainUrl:'https://dev.qutego.com/',
            lists:{},
            page:'1',
            page1:'1',
            listsData:[],
            listsData1:[],
            count:'',
            count1:''
        }
    },
    mounted: function () {
        this.id = this.$route.query.id;
        this.getbilldetail()
        this.deliverbill()
        this.salebill()
    },
    methods:{
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            this.page = val;
            this.deliverbill()
        },
        handleCurrentChange1(val){
            console.log(val);
            this.page1 = val;
            this.salebill()
        },
        // 汇总详情
        getbilldetail(){
            var params = {id:this.id}
            this.axios.post(this.mainUrl+'supplier.php?c=bill&a=bill_content',qs.stringify(params)).then(res=>{
                console.log(res)
                var {err_code,err_msg}=res.data
                if(err_code==0){
                    this.lists = err_msg
                }
            })
        },
        // 发货明细
        deliverbill(){
            var params={id:this.id,type:1,p:this.page}
            this.axios.post(this.mainUrl+'supplier.php?c=bill&a=order_return',qs.stringify(params)).then(res=>{
                console.log(res)
                var {err_code,err_msg}=res.data
                if(err_code==0){
                    this.listsData = err_msg.list
                    this.count = Number(err_msg.count)
                }
            })
        },
        // 退货明细
        salebill(){
            var params={id:this.id,type:2,p:this.page1}
            this.axios.post(this.mainUrl+'supplier.php?c=bill&a=order_return',qs.stringify(params)).then(res=>{
                console.log(res)
                var {err_code,err_msg}=res.data
                if(err_code==0){
                    this.listsData1 = err_msg.list
                    this.count1 = Number(err_msg.count)
                }
            })
        }
    }
}
</script>
<style lang="">
.stated_title {
  text-align: center;
  line-height: 50px;
}
.title_small {
  font-size: 14px;
  display: inline;
}
.fix_content {
  margin-bottom: 20px;
  margin-left: 20px;
}
.analy {
  height: 85px;
  background: #f3f6f9;
  padding-right: 20px;
}
.analy ul {
  float: right;
  list-style: none;
  font-size: 14px;
  margin-left: 20px;
}
.analy ul li {
  text-align: right;
}
.fix_total {
  background: #f3f6f9;
  text-align: right;
  padding-right: 20px;
  font-size: 14px;
  padding-bottom: 15px;
}
.totals {
  display: inline;
  color: red;
}
.bank {
  background: #f3f6f9;
  text-align: right;
  padding: 20px;
  font-size: 15px;
  margin-left: 20px;
}
.bank div {
  display: inline;
  margin-left: 20px;
}
.status {
  font-size: 14px;
  margin-bottom: 5px;
  font-weight: bold;
}
</style>