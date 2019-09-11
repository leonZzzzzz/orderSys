<template>
  <div class="con">
    <div class="content-footer">
      <div class="right1">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item class="top-left">订单处理</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="order-content">
          <ul>
            <li @click="waitDel">
              等待发货订单
              <el-button>{{sent_data}}</el-button>
            </li>
            <!-- @click="serverSale" -->
            <li @click="serverSale">
              等待处理售后审核订单
              <el-button>{{aduit_data}}</el-button>
            </li>
            <li @click="waitSal">
              等待处理退货订单
              <el-button>{{refund_data}}</el-button>
            </li>
            <li @click="waitChang">
              等待处理换货订单
              <el-button>{{change_data}}</el-button>
            </li>
            <li @click="waitReis">
              等待处理补发货订单
              <el-button>{{repair_data}}</el-button>
            </li>
          </ul>
        </div>

        <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
          <el-tab-pane label="发货订单" name="first" class="first">
            <!-- 筛选 -->
            <el-form ref="form" :model="form" label-width="80px">
              <el-form-item label="订单号">
                <el-input style="width:230px" v-model="order_no"></el-input>
              </el-form-item>
              <el-form-item label="商品名称">
                <el-input style="width:230px" v-model="goods_name"></el-input>
              </el-form-item>
              <el-form-item label="商品编号">
                <el-input style="width:230px" v-model="goods_code"></el-input>
              </el-form-item>
              <el-form-item label="起止时间">
                <el-col :span="4.5">
                  <el-date-picker
                    v-model="value1"
                    align="right"
                    type="datetime"
                    placeholder="选择日期"
                    :picker-options="pickerOptions1"
                    style="width: 230px;margin-right:10px;"
                  ></el-date-picker>
                  <!-- <el-date-picker type="date" placeholder="选择日期" style="width: 100%;"></el-date-picker> -->
                </el-col>
                <el-col class="line" :span="0.5">-</el-col>
                <el-col :span="4.5">
                  <el-date-picker
                    v-model="value2"
                    align="right"
                    type="datetime"
                    placeholder="选择日期"
                    :picker-options="pickerOptions1"
                    style="width:230px;margin-left:10px;"
                  ></el-date-picker>
                </el-col>
              </el-form-item>
              <el-form-item>
                <el-button class="btn1" type="primary" @click="onSubmit">筛选</el-button>
                <el-button @click="open6">导出数据</el-button>
                <!-- <router-link class="btn3" :to="{path:'/batchdel',query{id:id}}">批量发货</router-link> -->
                <el-button class="btn1" type="primary" @click="gobatch">批量发货</el-button>
              </el-form-item>
            </el-form>
            <!-- 表格 -->
            <div style="margin-top:20px;padding:10px;background:rgb(242,248,254)">
              <el-table :data="tableData" border>
                <el-table-column fixed prop="order_no" label="订单号"></el-table-column>
                <el-table-column label="商品名称">
                  <template scope="scope">
                    <span v-for="(item,index) in scope.row.product_list">
                      {{item.name}}
                      <br />
                    </span>
                  </template>
                </el-table-column>
                <el-table-column label="商品编号">
                  <template scope="scope">
                    <span v-for="(item,index) in scope.row.product_list">
                      {{item.code}}
                      <br />
                    </span>
                  </template>
                </el-table-column>
                <el-table-column label="数量" width="50px">
                  <template scope="scope">
                    <span v-for="(item,index) in scope.row.product_list">
                      {{item.pro_num}}
                      <br />
                    </span>
                  </template>
                </el-table-column>
                <el-table-column label="商品规格">
                  <template scope="scope">
                    <span v-for="(item,index) in scope.row.product_list">
                      {{item.sku_data}}
                      <br />
                    </span>
                  </template>
                </el-table-column>
                <el-table-column label="状态">
                  <template scope="scope">
                    <span v-for="(item,index) in scope.row.product_list">
                      {{item.msg}}
                      <br />
                    </span>
                  </template>
                </el-table-column>
                <el-table-column prop="address_user" label="收货人" width="70px"></el-table-column>
                <el-table-column prop="address_tel" label="收货人电话"></el-table-column>
                <el-table-column prop="address" label="收货人地址"></el-table-column>
                <el-table-column prop="paid_time" label="下单时间"></el-table-column>

                <el-table-column label="操作">
                  <template scope="scope">
                    <el-button
                      @click="shipper(scope.row.order_id,scope.row.store_id,null,scope.row.id)"
                      type="text"
                      size="small"
                    >发货</el-button>
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
              :total="total"
            ></el-pagination>
          </el-tab-pane>
          <el-tab-pane label="售后审核订单" name="sixth" class="sixth">
            <!-- 筛选 -->
            <el-form ref="form" :model="form" label-width="80px">
              <el-form-item label="订单号">
                <el-input style="width:230px" v-model="order_no6"></el-input>
              </el-form-item>
              <el-form-item label="商品名称">
                <el-input style="width:230px" v-model="goods_name6"></el-input>
              </el-form-item>
              <el-form-item label="商品编号">
                <el-input style="width:230px" v-model="goods_code6"></el-input>
              </el-form-item>
              <el-form-item label="起止时间">
                <el-col :span="4.5">
                  <el-date-picker
                    v-model="value11"
                    align="right"
                    type="datetime"
                    placeholder="选择日期"
                    :picker-options="pickerOptions1"
                    style="width: 230px;margin-right:10px;"
                  ></el-date-picker>
                  <!-- <el-date-picker type="date" placeholder="选择日期" style="width: 100%;"></el-date-picker> -->
                </el-col>
                <el-col class="line" :span="0.5">-</el-col>
                <el-col :span="4.5">
                  <el-date-picker
                    v-model="value12"
                    align="right"
                    type="datetime"
                    placeholder="选择日期"
                    :picker-options="pickerOptions1"
                    style="width:230px;margin-left:10px;"
                  ></el-date-picker>
                </el-col>
              </el-form-item>

              <el-form-item>
                <el-button class="btn1" type="primary" @click="onSubmit">筛选</el-button>
              </el-form-item>
            </el-form>
            <!-- 表格 -->
            <div style="margin-top:20px;padding:10px;background:rgb(242,248,254)">
              <el-table :data="tableData2" border>
                <el-table-column fixed prop="return_no" label="售后编号"></el-table-column>
                <el-table-column fixed prop="order_no" label="订单号"></el-table-column>
                <el-table-column prop="name" label="商品名称"></el-table-column>
                <el-table-column prop="code" label="商品编号"></el-table-column>
                <el-table-column prop="pro_num" label="数量" width="50px"></el-table-column>
                <el-table-column prop="sku_data" label="商品规格"></el-table-column>
                <el-table-column prop="type_msg" label="售后类型"></el-table-column>
                <el-table-column prop="content" label="原因" width="70px"></el-table-column>
                <el-table-column prop="phone" label="手机号码"></el-table-column>
                <el-table-column prop="remark" label="备注信息"></el-table-column>
                <!-- <el-table-column prop="dateline" label="图片举证"></el-table-column> -->
                <el-table-column label="图片举证">
                  <template scope="scope">
                    <viewer :images="photo" v-if="scope.row.images!='--'">
                      <img
                        style="width:40px;margin-left:10px;"
                        v-for="(item,index) in scope.row.images"
                        :src="item"
                        :onerror="errorImg"
                      />
                    </viewer>
                    <viewer v-else>
                      <div>{{scope.row.images}}</div>
                    </viewer>
                  </template>
                  <!-- <template scope="scope" v-else>
                    <img
                      style="width:40px;margin-left:10px;"
                      v-for="(item,index) in scope.row.images"
                      :src="item"
                      :onerror="errorImg"
                    />
                  </template>-->
                </el-table-column>
                <el-table-column prop="dateline" label="申请时间"></el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button
                      @click="auditCheck(scope.row.id,scope.row.store_id,scope.row.address,scope.row.address_tel,scope.row.address_user,scope.row.type,scope.row.refund_type)"
                      type="text"
                      size="small"
                    >审核</el-button>
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
              :total="total"
            ></el-pagination>
          </el-tab-pane>
          <el-tab-pane label="退货订单" name="second" class="second">
            <!-- 筛选 -->
            <el-form ref="form" :model="form" label-width="80px">
              <el-form-item label="订单号">
                <el-input style="width:230px" v-model="order_no2"></el-input>
              </el-form-item>
              <el-form-item label="商品名称">
                <el-input style="width:230px" v-model="goods_name2"></el-input>
              </el-form-item>
              <el-form-item label="商品编号">
                <el-input style="width:230px" v-model="goods_code2"></el-input>
              </el-form-item>
              <el-form-item label="起止时间">
                <el-col :span="4.5">
                  <el-date-picker
                    v-model="value3"
                    align="right"
                    type="datetime"
                    placeholder="选择日期"
                    :picker-options="pickerOptions1"
                    style="width: 230px;margin-right:10px;"
                  ></el-date-picker>
                  <!-- <el-date-picker type="date" placeholder="选择日期" style="width: 100%;"></el-date-picker> -->
                </el-col>
                <el-col class="line" :span="0.5">-</el-col>
                <el-col :span="4.5">
                  <el-date-picker
                    v-model="value4"
                    align="right"
                    type="datetime"
                    placeholder="选择日期"
                    :picker-options="pickerOptions1"
                    style="width:230px;margin-left:10px;"
                  ></el-date-picker>
                </el-col>
              </el-form-item>

              <el-form-item>
                <el-button class="btn1" type="primary" @click="onSubmit">筛选</el-button>
                <el-button @click="open6">导出数据</el-button>
              </el-form-item>
            </el-form>
            <!-- 表格 -->
            <div style="margin-top:20px;padding:10px;background:rgb(242,248,254)">
              <el-table :data="tableData2" border>
                <el-table-column fixed prop="return_no" label="退货单号"></el-table-column>
                <el-table-column fixed prop="order_no" label="订单号"></el-table-column>
                <el-table-column prop="name" label="商品名称"></el-table-column>
                <el-table-column prop="code" label="商品编号"></el-table-column>
                <el-table-column prop="pro_num" label="数量" width="50px"></el-table-column>
                <el-table-column prop="sku_data" label="商品规格"></el-table-column>
                <el-table-column prop="supplier_status_msg" label="状态"></el-table-column>
                <el-table-column prop="express_company" label="物流公司"></el-table-column>
                <el-table-column prop="express_no" label="物流单号"></el-table-column>
                <el-table-column prop="address_user" label="退货人" width="70px"></el-table-column>
                <el-table-column prop="address_tel" label="退货人电话"></el-table-column>
                <el-table-column prop="address" label="退货人地址"></el-table-column>
                <el-table-column prop="dateline" label="申请退货时间"></el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button
                      @click="tableClick(scope.row.supplier_status,scope.row.order_product_id,scope.row.id,scope.row.order_id)"
                      type="text"
                      size="small"
                    >确认收货</el-button>
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
              :total="total"
            ></el-pagination>
          </el-tab-pane>
          <el-tab-pane label="换货订单" name="third" class="third">
            <!-- 筛选 -->
            <el-form ref="form" :model="form" label-width="80px">
              <el-form-item label="订单号">
                <el-input style="width:230px" v-model="order_no3"></el-input>
              </el-form-item>
              <el-form-item label="商品名称">
                <el-input style="width:230px" v-model="goods_name3"></el-input>
              </el-form-item>
              <el-form-item label="商品编号">
                <el-input style="width:230px" v-model="goods_code3"></el-input>
              </el-form-item>
              <el-form-item label="起止时间">
                <el-col :span="4.5">
                  <el-date-picker
                    v-model="value5"
                    align="right"
                    type="datetime"
                    placeholder="选择日期"
                    :picker-options="pickerOptions1"
                    style="width: 230px;margin-right:10px;"
                  ></el-date-picker>
                  <!-- <el-date-picker type="date" placeholder="选择日期" style="width: 100%;"></el-date-picker> -->
                </el-col>
                <el-col class="line" :span="0.5">-</el-col>
                <el-col :span="4.5">
                  <el-date-picker
                    v-model="value6"
                    align="right"
                    type="datetime"
                    placeholder="选择日期"
                    :picker-options="pickerOptions1"
                    style="width:230px;margin-left:10px;"
                  ></el-date-picker>
                </el-col>
              </el-form-item>

              <el-form-item>
                <el-button class="btn1" type="primary" @click="onSubmit">筛选</el-button>
                <el-button @click="open6">导出数据</el-button>
              </el-form-item>
            </el-form>
            <!-- 表格 -->
            <div style="margin-top:20px;padding:10px;background:rgb(242,248,254)">
              <el-table :data="tableData2" border>
                <el-table-column fixed prop="return_no" label="换货单号"></el-table-column>
                <el-table-column fixed prop="order_no" label="订单号"></el-table-column>
                <el-table-column prop="name" label="商品名称"></el-table-column>
                <el-table-column prop="code" label="商品编号"></el-table-column>
                <el-table-column prop="pro_num" label="数量" width="50px"></el-table-column>
                <el-table-column prop="sku_data" label="商品规格"></el-table-column>
                <el-table-column prop="supplier_status_msg" label="状态"></el-table-column>
                <el-table-column prop="express_company" label="物流公司"></el-table-column>
                <el-table-column prop="express_no" label="物流单号"></el-table-column>
                <el-table-column prop="address_user" label="换货人" width="70px"></el-table-column>
                <el-table-column prop="address_tel" label="换货人电话"></el-table-column>
                <el-table-column prop="address" label="换货人地址"></el-table-column>
                <el-table-column prop="dateline" label="申请换货时间"></el-table-column>

                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <!-- <el-button
                      v-if="scope.row.supplier_status==0"
                      @click="tableClick(scope.row.supplier_status,scope.row.order_product_id,scope.row.id,scope.row.order_id)"
                      type="text"
                      size="small"
                    >确认收货</el-button>-->
                    <el-button
                      @click="shipper(scope.row.order_id,scope.row.store_id,scope.row.order_product_id,scope.row.id)"
                      type="text"
                      size="small"
                    >发货</el-button>
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
              :total="total"
            ></el-pagination>
          </el-tab-pane>
          <el-tab-pane label="补发货订单" name="fourth" class="fourth">
            <!-- 筛选 -->
            <el-form ref="form" :model="form" label-width="80px">
              <el-form-item label="订单号">
                <el-input style="width:230px" v-model="order_no4"></el-input>
              </el-form-item>
              <el-form-item label="商品名称">
                <el-input style="width:230px" v-model="goods_name4"></el-input>
              </el-form-item>
              <el-form-item label="商品编号">
                <el-input style="width:230px" v-model="goods_code4"></el-input>
              </el-form-item>
              <el-form-item label="起止时间">
                <el-col :span="4.5">
                  <el-date-picker
                    v-model="value7"
                    align="right"
                    type="datetime"
                    placeholder="选择日期"
                    :picker-options="pickerOptions1"
                    style="width: 230px;margin-right:10px;"
                  ></el-date-picker>
                  <!-- <el-date-picker type="date" placeholder="选择日期" style="width: 100%;"></el-date-picker> -->
                </el-col>
                <el-col class="line" :span="0.5">-</el-col>
                <el-col :span="4.5">
                  <el-date-picker
                    v-model="value8"
                    align="right"
                    type="datetime"
                    placeholder="选择日期"
                    :picker-options="pickerOptions1"
                    style="width:230px;margin-left:10px;"
                  ></el-date-picker>
                </el-col>
              </el-form-item>

              <el-form-item>
                <el-button class="btn1" type="primary" @click="onSubmit">筛选</el-button>
                <el-button @click="open6">导出数据</el-button>
              </el-form-item>
            </el-form>
            <!-- 表格 -->
            <div style="margin-top:20px;padding:10px;background:rgb(242,248,254)">
              <el-table :data="tableData2" border>
                <el-table-column fixed prop="return_no" label="补发货单号"></el-table-column>
                <el-table-column fixed prop="order_no" label="订单号"></el-table-column>
                <el-table-column prop="name" label="商品名称"></el-table-column>
                <el-table-column prop="code" label="商品编号"></el-table-column>
                <el-table-column prop="pro_num" label="数量" width="50px"></el-table-column>
                <el-table-column prop="sku_data" label="商品规格"></el-table-column>
                <el-table-column prop="supplier_status_msg" label="状态"></el-table-column>
                <el-table-column prop="address_user" label="收货人" width="70px"></el-table-column>
                <el-table-column prop="address_tel" label="收货人电话"></el-table-column>
                <el-table-column prop="address" label="收货人地址"></el-table-column>
                <el-table-column prop="dateline" label="申请补发货时间"></el-table-column>

                <el-table-column label="操作">
                  <template scope="scope">
                    <el-button
                      @click="shipper(scope.row.order_id,scope.row.store_id,scope.row.order_product_id,scope.row.id)"
                      type="text"
                      size="small"
                    >补发</el-button>
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
              :total="total"
            ></el-pagination>
          </el-tab-pane>
          <el-tab-pane label="全部订单" name="five" class="five">
            <!-- 筛选 -->
            <el-form ref="form" :model="form" label-width="80px">
              <el-form-item label="订单号">
                <el-input style="width:230px" v-model="order_no5"></el-input>
              </el-form-item>
              <el-form-item label="商品名称">
                <el-input style="width:230px" v-model="goods_name5"></el-input>
              </el-form-item>
              <el-form-item label="商品编号">
                <el-input style="width:230px" v-model="goods_code5"></el-input>
              </el-form-item>
              <el-form-item label="起止时间">
                <el-col :span="4.5">
                  <el-date-picker
                    v-model="value9"
                    align="right"
                    type="datetime"
                    placeholder="选择日期"
                    :picker-options="pickerOptions1"
                    style="width: 230px;margin-right:10px;"
                  ></el-date-picker>
                  <!-- <el-date-picker type="date" placeholder="选择日期" style="width: 100%;"></el-date-picker> -->
                </el-col>
                <el-col class="line" :span="0.5">-</el-col>
                <el-col :span="4.5">
                  <el-date-picker
                    v-model="value10"
                    align="right"
                    type="datetime"
                    placeholder="选择日期"
                    :picker-options="pickerOptions1"
                    style="width:230px;margin-left:10px;"
                  ></el-date-picker>
                </el-col>
              </el-form-item>

              <el-form-item>
                <el-button class="btn1" type="primary" @click="onSubmit">筛选</el-button>
                <el-button @click="open6">导出数据</el-button>
              </el-form-item>
            </el-form>
            <!-- 表格 -->
            <div style="margin-top:20px;padding:10px;background:rgb(242,248,254)">
              <el-table :data="tableData" border>
                <el-table-column fixed prop="order_no" label="订单号"></el-table-column>
                <el-table-column label="商品名称">
                  <template scope="scope">
                    <span v-for="(item,index) in scope.row.product_list">
                      {{item.name}}
                      <br />
                    </span>
                  </template>
                </el-table-column>
                <el-table-column label="商品编号">
                  <template scope="scope">
                    <span v-for="(item,index) in scope.row.product_list">
                      {{item.code}}
                      <br />
                    </span>
                  </template>
                </el-table-column>
                <el-table-column label="数量" width="50px">
                  <template scope="scope">
                    <span v-for="(item,index) in scope.row.product_list">
                      {{item.pro_num}}
                      <br />
                    </span>
                  </template>
                </el-table-column>
                <el-table-column label="商品规格">
                  <template scope="scope">
                    <span v-for="(item,index) in scope.row.product_list">
                      {{item.sku_data}}
                      <br />
                    </span>
                  </template>
                </el-table-column>
                <el-table-column label="状态">
                  <template scope="scope">
                    <span v-for="(item,index) in scope.row.product_list">
                      {{item.msg}}
                      <br />
                    </span>
                  </template>
                </el-table-column>
                <el-table-column prop="address_user" label="收货人" width="70px"></el-table-column>
                <el-table-column prop="address_tel" label="收货人电话"></el-table-column>
                <el-table-column prop="address" label="收货人地址"></el-table-column>
                <el-table-column prop="paid_time" label="下单时间"></el-table-column>
              </el-table>
            </div>
            <!-- 分页 -->
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :page-size="15"
              layout="total, prev, pager, next, jumper"
              :total="total"
            ></el-pagination>
          </el-tab-pane>

          <el-dialog title="商品发货" :visible.sync="dialogTableVisible">
            <div style="height:30px;color:red;">收到退货后请及时寄出相应的换货商品</div>
            <el-table
              :data="productList"
              ref="products"
              :row-class-name="tableRowClassName"
              @select="onTableSelect"
              @select-all="selectAll"
              @selection-change="handleSelectionChange"
            >
              <el-table-column type="selection"></el-table-column>
              <el-table-column property="name" label="商品"></el-table-column>
              <!-- <el-table-column property="sku_data" label="规格"></el-table-column> -->
              <el-table-column label="规格">
                <template scope="scope">
                  <span v-for="(item,index) in scope.row.skus">
                    {{item.name}}:{{item.value}}
                    <br />
                  </span>
                </template>
              </el-table-column>
              <el-table-column property="pro_num" label="数量"></el-table-column>
            </el-table>
            <div class="modelcontent" v-if="address.name!='' || address.tel!=''">
              <div class="model_row">
                <div style="float:left;width:70px;text-align:right">
                  <span class="label">收货人：</span>
                </div>
                <span class="modeltext">{{address.name}}</span>
              </div>
              <div class="model_row">
                <div style="float:left;width:70px;text-align:right">
                  <label class="label">联系电话：</label>
                </div>
                <span class="modeltext">{{address.tel}}</span>
              </div>
              <div class="model_row">
                <div style="float:left;width:70px;text-align:right">
                  <label class="label">收货地址：</label>
                </div>
                <span
                  class="modeltext"
                >{{address.province}}{{address.city}}{{address.area}}{{address.address}}</span>
              </div>
              <div class="model_row">
                <div style="float:left;width:70px;text-align:right">
                  <label class="label">发货方式：</label>
                </div>
                <div>
                  <el-radio v-model="radio" label="1">需要物流</el-radio>
                  <el-radio v-model="radio" label="2">无需物流</el-radio>
                </div>
              </div>
              <div class="model_row" v-if="radio=='1'">
                <div style="float:left;width:70px;text-align:right">
                  <label class="label">物流公司：</label>
                </div>
                <el-select @change="selectGet" v-model="region" placeholder="请选择物流公司" width="220px">
                  <!-- <el-option>--请选择--</el-option> -->
                  <el-option
                    v-for="(item,index) in express"
                    :key="item.pigcms_id"
                    :label="item.name"
                    :value="item.code"
                  ></el-option>
                </el-select>
              </div>
              <div class="model_row" v-if="radio=='1'">
                <div style="float:left;width:70px;text-align:right">
                  <label class="label">快递单号：</label>
                </div>
                <input
                  class="el-input__inner"
                  style="width:217px !important;display:inline !important;"
                  type="text"
                  v-model="express_num"
                />
                <!-- <el-input v-model="express_num"></el-input> -->
              </div>
            </div>
            <div class="modelcontent" v-else>
              <span>无收货信息</span>
            </div>
            <div style="text-align:right;">
              <el-button type="primary" @click="save" v-if="address.name!=''|| address.tel!=''">保存</el-button>
            </div>
          </el-dialog>

          <el-dialog title="售后审核" :visible.sync="dialogTablefrom">
            <div class="modelcontent">
              <div class="model_row">
                <div style="width:70px;text-align:right;display:inline;">
                  <label class="label">审核状态：</label>
                </div>
                <div style="display:inline;">
                  <el-radio v-model="iscon" label="3">同意</el-radio>
                  <el-radio v-model="iscon" label="2">不同意</el-radio>
                </div>
              </div>
              <div v-if="iscon=='3'">
                <div class="model_row">
                  <div style="width:70px;text-align:right;display:inline;">
                    <span class="label">售后类型：</span>
                  </div>
                  <el-select
                    @change="afterselectSale"
                    v-model="sales"
                    placeholder="请选择售后类型"
                    width="220px"
                  >
                    <el-option
                      v-for="(item,index) in afterSale"
                      :label="item.name"
                      :value="item.type"
                    ></el-option>
                  </el-select>
                </div>

                <div v-if="saleId!='1'">
                  <div class="sales">退货信息</div>
                  <div class="model_row sale">
                    <div style="width:70px;text-align:right;display:inline;">
                      <label class="label">退货地址：</label>
                    </div>
                    <el-input style="width:230px" v-model="address_sit"></el-input>
                  </div>
                  <div class="model_row sale">
                    <div style="width:70px;text-align:right;float:left;margin-right:4px;">
                      <label class="label">收货人：</label>
                    </div>
                    <el-input style="width:230px" v-model="address_user"></el-input>
                  </div>
                  <div class="model_row sale">
                    <div style="width:70px;text-align:right;display:inline;">
                      <label class="label">收货电话：</label>
                    </div>
                    <el-input style="width:230px" v-model="address_tel"></el-input>
                  </div>
                </div>
              </div>
              <div v-if="iscon=='2'">
                <span style="float:left;">不同意理由：</span>
                <div style="float:left;">
                  <textarea name id cols="30" rows="3" v-model="disagree" style="resize:none;"></textarea>
                </div>
              </div>
            </div>
            <div style="text-align:right;">
              <el-button type="primary" @click="confirm">确定</el-button>
            </div>
          </el-dialog>
        </el-tabs>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
let qs = require("qs");
// import bigSrc from 'bigSrc.vue';
export default {
  provide(){
    return{
      reload:this.reload
    }
  },
  data() {
    return {
      afterSale:[
        {name:'仅退款',type:'1'},
        {name:'退货退款',type:'2'},
        {name:'换货',type:'3'},
        {name:'补发',type:'4'},
      ],
      saleId:'',
      saleType:'',
      refund_type:'',
      address_sit:'',
      address_tel:'',
      address_user:'',
      url:'',
      isRouterAlive:true,
      express_num:'',
      region: '',
      sales:'',
      radio: '1',
      iscon:'3',
      disagree:'',
      address: {},
      productList: [],
      express: [],
      dialogTableVisible: false,
      dialogTablefrom:false,
      store_id: '',
      returnId: '',
      orderId: '',
      productId: '',
      supplier: '',
      ruleList: [],
      mainUrl: this.domain.testUrl,//公共域名
      // mainUrl:'https://grayscale.qutego.com/',
      total: '',
      page: '1',
      type: '1',
      name: '',
      id: '',
      change_data: "",
      refund_data: "",
      repair_data: "",
      sent_data: "",
      aduit_data:"",
      activeName2: 'first',
      pickerOptions1: {
        // disabledDate(time) {
        //   return time.getTime() > Date.now();
        // },
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
      order_no: '',
      order_no2: '',
      order_no3: '',
      order_no4: '',
      order_no5: '',
      order_no6:'',
      goods_name: '',
      goods_name2: '',
      goods_name3: '',
      goods_name4: '',
      goods_name5: '',
      goods_name6:'',
      goods_code:'',
      goods_code2:'',
      goods_code3:'',
      goods_code4:'',
      goods_code5:'',
      goods_code6:'',
      value1: '',
      value2: '',
      value3: '',
      value4: '',
      value5: '',
      value6: '',
      value7: '',
      value8: '',
      value9: '',
      value10: '',
      value11:'',
      value12:'',
      tableData: [],
      tableData2: [],
      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4,
      expressCode:'',
      expressName:'',
      rowIndex:0,
      product:'',
      orderproduct:'',
      sku_data:[],
      timer:'',
    };
  },
  mounted: function () {
    this.name = this.$route.query.name;
    this.id = this.$route.query.id;
    if(!this.name || !this.id){
      // window.location.href =this.mainUrl+"supplier.php?c=index&a=index";
    }else{
      this.dataStat();
      this.oninit();
      this.timer = setInterval(this.dataStat, 10000);
    } 
  },
  onShow(){
    console.log(78787878)
  },
  created(){
    // this.timer = setInterval(this.dataStat, 10000);
  },
  beforeDestroy(){
    clearInterval(this.timer);
  },
  watch: {
    '$router': 'dataStat'
  },
  methods: {
    goBill(){
      var that = this;
      that.$router.push({
        path:'/billing',
        // query:{id:err_msg.id,name:err_msg.name}
      }) 
    },
    reload(){
      this.isRouterAlive=false;
      this.$nextTick(()=>{
        this.isRouterAlive = true;
      })
    },
    gobatch(){
      this.$router.push({
              path:'/batchDel',
              query:{id:this.id,name:this.name}
            })
    },
    // tableRowClassName ({row, rowIndex}) {
    //   //把每一行的索引放进row
    //   console.log(row,rowIndex) 
    // },
    // 单选按钮
    onTableSelect(rows, row) {
      console.log(row)
      let selected = rows.length && rows.indexOf(row) !== -1
      console.log(selected)
     if(selected == true){
       this.sku_data.push(row.sku_data);
       this.product=row.product_id;
       this.orderproduct=row.order_product_id;
     }
    },
    // 全选按钮
    selectAll(row){
      console.log(row)
    },
    handleSelectionChange(val) {
      console.log(val)
      var a=[], b=[];
      if(val.length>0){
        for(var i=0;i<val.length;i++){
          var product=val[i].product_id;
          var order_product=val[i].order_product_id;
          a.push(product)
          b.push(order_product)
          if(a.length>1){
            var product=a.join(',');
          }
          if(b.length>1){
            var order_product=b.join(',');
          }
          console.log(product,order_product)
          this.product = product;
          this.orderproduct = order_product;
        }
      }else{
        this.product = '';
        this.orderproduct = '';
      }
      
    },
    toggleSelection(rows) {
      console.log(rows)
      // 这里的articleTable为表格引用的名字。
      // 个人理解：如果这行代码直接写在回调函数里，那么这个this就是相当于回调函数来说的，就会报未定义的异常
      this.$refs.articleTable.clearSelection();
      var len = app.selectedIds.length;
      app.selectedIds=splice(0,len); // 移除选中的数据
    },

    selectGet(vId){
      let obj = {};
      obj = this.express.find((item)=>{//这里的selectList就是上面遍历的数据源
          return item.code === vId;//筛选出匹配数据
      });
      this.expressCode = obj.code;
      this.expressName = obj.name
      console.log(obj.name);//我这边的name就是对应label的
      console.log(obj.code);
    },
    afterselectSale(e){
      console.log(e)
      this.saleId=e
    },
    // 发货保存中
    save(){
      if(!this.express_num||!this.expressName){
        this.$message({
          type: 'error',
          message: '请填写完整信息'
        });
        return;
      }
      var params = {send_type:this.type,order_id:this.orderId,express_id:this.expressCode,express_company:this.expressName,express_no:this.express_num,store_id:this.store_id,
      products:this.product,order_products:this.orderproduct,sku_data:this.sku_data};
      this.axios.post(this.mainUrl+'supplier.php?c=order&a=send_order',qs.stringify(params)).then(res=>{
        console.log(res,params)
        let {err_code,err_msg} = res.data;
        if(err_code==0){
          if( this.type==4){
            var params = {
              order_product_id: this.orderproduct, set_status: 3, id: this.returnId, order_id: this.orderId
            }
            this.axios.post(this.mainUrl+'supplier.php?c=order&a=update', qs.stringify(params)).then(res => {
              console.log(res, params)
              let { err_code, err_msg } = res.data;
              if (err_code == 0) {
                this.$message({
                  type: 'success',
                  message: '发货成功'
                });
                this.dialogTableVisible = false;
                this.oninit();
              } else {
                // alert(err_msg)
                this.$message({
                  type: 'error',
                  message: err_msg
                });
              }
            })
          }else if(this.type==3){
            var params = {
              order_product_id: this.orderproduct, set_status: 4, id: this.returnId, order_id: this.orderId
            }
            console.log(params)
            this.axios.post(this.mainUrl+'supplier.php?c=order&a=update', qs.stringify(params)).then(res => {
              console.log(res, params)
              let { err_code, err_msg } = res.data;
              if (err_code == 0) {
                this.$message({
                  type: 'success',
                  message: '发货成功'
                });
                this.dialogTableVisible = false;
                this.oninit();
              } else {
                // alert(err_msg)
                this.$message({
                  type: 'error',
                  message: err_msg
                });
              }
            })
          }else{
            this.dialogTableVisible = false;
            this.oninit();
          }
        }else{
          this.$message({
            type: 'error',
            message: err_msg
          });
        }
      })
    },
    confirm(){
      if(this.iscon==3){
        var params={id:this.salId,store_content:'',status:this.iscon,
        store_id:this.store_id,return_type:this.saleId,sup_address:this.address_sit
      ,sup_address_tel:this.address_tel,sup_address_user:this.address_user}
      }else if(this.iscon==2){
        var params={id:this.salId,store_content:this.disagree,status:this.iscon,store_id:this.store_id,return_type:'',sup_address:this.address_sit
      ,sup_address_tel:this.address_tel,sup_address_user:this.address_user}
      }
      
      this.axios.post(this.mainUrl+'supplier.php?c=order&a=aduit',qs.stringify(params)).then(res=>{
        let { err_code, err_msg } = res.data;
        console.log( err_code, err_msg)
        if(err_code==0){
          this.$message({
            type: 'success',
            message: err_msg
          });
          this.dialogTablefrom = false;
          this.oninit();
        }else{
          this.$message({
            type: 'error',
            message: err_msg
          });
        }
      })
    },
    // 审核
    auditCheck(a,b,c,d,e,f,g){
      console.log(a,b,c,d,e,f,g)
      this.dialogTablefrom=true
      this.salId=a;
      this.store_id=b;
      this.address_sit=c;
      this.address_tel=d;
      this.address_user=e;
      this.saleType=f;
      this.refund_type=g;
      if((f==1&&g==1)||(f==1&&g==0)){
        this.sales='退货退款'
        this.saleId=2
      }else if(f==1&&g==2){
        this.sales='仅退款'
        this.saleId=1
      }else if(f==2){
        this.sales='换货'
        this.saleId=3
      }else if(f==4){
        this.sales='补发'
        this.saleId=4
      }
    },
    // 发货补发货订单
    shipper(a, b,c,d) {
      console.log(a,b,c,d)
      this.dialogTableVisible = true;
      console.log(a, b)
      this.orderId = a;
      this.store_id = b;
      this.returnId = d;
      if(c==null){
        var params = { store_id: this.store_id, order_id: this.orderId ,order_type:1,sup_id:this.id };
      }else{
        var params = { store_id: this.store_id, order_id: this.orderId,order_product_id:c,sup_id:this.id };
      }
      this.axios.post(this.mainUrl+'supplier.php?c=order&a=package_product', qs.stringify(params)).then(res => {
        console.log(res)
        let { err_code, err_msg } = res.data;
        if (err_code == 0) {
          this.address = err_msg.address;
          console.log(this.address)
          this.productList = err_msg.products;
          this.express = err_msg.express;
          this.expressCode="";
          this.expressName="";
          this.express_num="";
          this.orderproduct="";
          this.product="";
          this.sku_data=[];
          this.region = '请选择物流公司';
        } else {
          // alert(err_msg.err_log)
          this.$message({
            type: 'error',
            message: err_msg.err_log
          });
        }

      })
    },
    // 退出
    logout() {
      // if (window.history.length <= 1) {
      //   this.$router.push({ path: '/' })
      //   return false
      // } else {
      //   this.$router.go(-1)
      // }
      this.axios.post(this.mainUrl+'supplier.php?c=index&a=login_out').then(res=>{
        window.location.href =this.mainUrl+"supplier.php?c=index&a=index";
      })
    },
    // 订单处理统计
    dataStat() {
      var params = { supplier_id: this.id };
      this.axios.post(this.mainUrl+'supplier.php?c=order&a=order_info_count', qs.stringify(params)).then(res => {
        let { err_code, err_msg } = res.data;
        if (err_code == 0) {
          this.change_data = err_msg.change_data;
          this.refund_data = err_msg.refund_data;
          this.repair_data = err_msg.repair_data;
          this.sent_data = err_msg.sent_data;
          this.aduit_data = err_msg.aduit_data;
        } else {
          this.$message({
            type: 'error',
            message: err_msg.err_log
          });
        }

      })
    },
    // 筛选
    onSubmit() {
      if(this.type==1){
        var order_no = this.order_no;
        var goods_name = this.goods_name;
        var goods_code = this.goods_code
        var startdate = this.$moment(this.value1).format('YYYY-MM-DD HH:mm:ss') //2019-04-11
        var enddate = this.$moment(this.value2).format('YYYY-MM-DD HH:mm:ss') //2019-04-11
      }else if(this.type==2){
        var order_no = this.order_no2;
        var goods_name = this.goods_name2;
        var goods_code = this.goods_code2
        var startdate = this.$moment(this.value3).format('YYYY-MM-DD HH:mm:ss') //2019-04-11
        var enddate = this.$moment(this.value4).format('YYYY-MM-DD HH:mm:ss') //2019-04-11
      }else if(this.type==3){
        var order_no = this.order_no3;
        var goods_name = this.goods_name3;
        var goods_code = this.goods_code3
        var startdate = this.$moment(this.value5).format('YYYY-MM-DD HH:mm:ss') //2019-04-11
        var enddate = this.$moment(this.value6).format('YYYY-MM-DD HH:mm:ss') //2019-04-11
      }else if(this.type==4){
        var order_no = this.order_no4;
        var goods_name = this.goods_name4;
        var goods_code = this.goods_code4
        var startdate = this.$moment(this.value7).format('YYYY-MM-DD HH:mm:ss') //2019-04-11
        var enddate = this.$moment(this.value8).format('YYYY-MM-DD HH:mm:ss') //2019-04-11
      }else if(this.type==5){
        var order_no = this.order_no5;
        var goods_name = this.goods_name5;
        var goods_code = this.goods_code5
        console.log(order_no,goods_name)
        var startdate = this.$moment(this.value9).format('YYYY-MM-DD HH:mm:ss') //2019-04-11
        var enddate = this.$moment(this.value10).format('YYYY-MM-DD HH:mm:ss') //2019-04-11
      }else if(this.type==6){
        var order_no = this.order_no6;
        var goods_name = this.goods_name6;
        var goods_code = this.goods_code6
        console.log(order_no,goods_name)
        var startdate = this.$moment(this.value11).format('YYYY-MM-DD HH:mm:ss') //2019-04-11
        var enddate = this.$moment(this.value12).format('YYYY-MM-DD HH:mm:ss') //2019-04-11
      }
      var params = { code:goods_code,type: this.type, supplier_id: this.id, order_no: order_no, goods_name: goods_name, start_time: startdate, end_time: enddate, p: this.page };
      this.axios.post(this.mainUrl+'supplier.php?c=order&a=supplier_order', qs.stringify(params)).then(res => {
        console.log(res, params)
        let { err_code, err_msg } = res.data;
        if (err_code == 0) {
          if (this.type == 1 || this.type == 5) {
            this.total =Number(err_msg.count);
            this.tableData = err_msg.list;
          } else if (this.type == 2 || this.type == 3 || this.type == 4|| this.type == 6) {
            this.tableData2 = err_msg.list;
            this.total = Number(err_msg.count);
          }
        } else {
          // alert(err_msg)
          this.$message({
            type: 'error',
            message: err_msg
          });
        }
      })
    },
    oninit() {
     if(this.type==1){
        var order_no = this.order_no;
        var goods_name = this.goods_name;
        var goods_code = this.goods_code
        var startdate = this.$moment(this.value1).format('YYYY-MM-DD HH:mm:ss') //2019-04-11
        var enddate = this.$moment(this.value2).format('YYYY-MM-DD HH:mm:ss') //2019-04-11
      }else if(this.type==2){
        var order_no = this.order_no2;
        var goods_name = this.goods_name2;
        var goods_code = this.goods_code2
        var startdate = this.$moment(this.value3).format('YYYY-MM-DD HH:mm:ss') //2019-04-11
        var enddate = this.$moment(this.value4).format('YYYY-MM-DD HH:mm:ss') //2019-04-11
      }else if(this.type==3){
        var order_no = this.order_no3;
        var goods_name = this.goods_name3;
        var goods_code = this.goods_code3
        var startdate = this.$moment(this.value5).format('YYYY-MM-DD HH:mm:ss') //2019-04-11
        var enddate = this.$moment(this.value6).format('YYYY-MM-DD HH:mm:ss') //2019-04-11
      }else if(this.type==4){
        var order_no = this.order_no4;
        var goods_name = this.goods_name4;
        var goods_code = this.goods_code4
        var startdate = this.$moment(this.value7).format('YYYY-MM-DD HH:mm:ss') //2019-04-11
        var enddate = this.$moment(this.value8).format('YYYY-MM-DD HH:mm:ss') //2019-04-11
      }else if(this.type==5){
        var order_no = this.order_no5;
        var goods_name = this.goods_name5;
        var goods_code = this.goods_code5
        console.log(order_no,goods_name)
        var startdate = this.$moment(this.value9).format('YYYY-MM-DD HH:mm:ss') //2019-04-11
        var enddate = this.$moment(this.value10).format('YYYY-MM-DD HH:mm:ss') //2019-04-11
      }else if(this.type==6){
        var order_no = this.order_no6;
        var goods_name = this.goods_name6;
        var goods_code = this.goods_code6;
        console.log(order_no,goods_name)
        var startdate = this.$moment(this.value11).format('YYYY-MM-DD HH:mm:ss') //2019-04-11
        var enddate = this.$moment(this.value12).format('YYYY-MM-DD HH:mm:ss') //2019-04-11
      }
      var params = {code:goods_code, type: this.type, supplier_id: this.id, order_no: order_no, goods_name: goods_name, start_time: startdate, end_time: enddate, p: this.page };
      this.axios.post(this.mainUrl+'supplier.php?c=order&a=supplier_order', qs.stringify(params)).then(res => {
        console.log(res, params)
        if(typeof(res.data)=='string'){
          window.location.href =this.mainUrl+"supplier.php?c=index&a=index";
        }else{
          let { err_code, err_msg } = res.data;
          if (err_code == 0) {
            if (this.type == 1 || this.type == 5) {
              this.total = Number(err_msg.count);
              this.tableData = err_msg.list;
            } else if (this.type == 2 || this.type == 3 || this.type == 4 || this.type == 6) {
              this.tableData2 = err_msg.list;
              this.total = Number(err_msg.count);
            } 
          } else {
            this.$message({
                type: 'error',
                message: err_msg.err_log
              });
          }
        }
        
      })
    },
    handleClick(tab, event) {
      var eventid = event.target.getAttribute('id');
      console.log(eventid)
      this.page=1;
      if (eventid == 'tab-second') {
        this.type = 2
      } else if (eventid == 'tab-third') {
        this.type = 3
      } else if (eventid == 'tab-fourth') {
        this.type = 4
      } else if (eventid == 'tab-first') {
        this.type = 1
      } else if (eventid == 'tab-five') {
        this.type = 5
      }else if(eventid=='tab-sixth'){
        this.type=6
      }
      this.oninit()
    },
    waitDel(){
      this.activeName2 = 'first'
      this.type = 1
      this.order_no='';
      this.goods_name='';
      this.goods_code='';
      this.value1='';
      this.value2='';
      this.page=1;
      this.oninit()
    },
    waitSal(){
      this.activeName2 = 'second'
      this.type=2;
      this.order_no2='';
      this.goods_name2='';
      this.goods_code2='';
      this.value3='';
      this.value4='';
      this.page=1;
      this.oninit()
    },
    waitChang(){
      this.activeName2 = 'third'
      this.type = 3;
      this.order_no3='';
      this.goods_name3='';
      this.goods_code3='';
      this.value5='';
      this.value6='';
      this.page=1;
      this.oninit();
    },
    waitReis(){
      this.activeName2 = 'fourth'
      this.type = 4;
      this.order_no4='';
      this.goods_name4='';
      this.goods_code4='';
      this.value7='';
      this.value8='';
      this.page=1;
      this.oninit()
    },
    serverSale(){
      this.activeName2 = 'sixth'
      this.type = 6
      this.order_no6='';
      this.goods_name6='';
      this.goods_code6='';
      this.value11='';
      this.value12='';
      this.page=1;
      this.oninit()
    },

    //  供应商退货、换货、补发
    tableClick(a, b, c, d) {
      console.log(a, b, c, d)
      this.supplier = a;
      this.productId = b;
      this.returnId = c;
      this.orderId = d;
      if(this.type==2){
        var params = {
          order_product_id: this.productId, set_status: 1, id: this.returnId, order_id: this.orderId
        }
      }else if(this.type==3){
        var params = {
          order_product_id: this.productId, set_status: 2, id: this.returnId, order_id: this.orderId
        }
      }else if(this.type==4){
        var params = {
          order_product_id: this.productId, set_status: 3, id: this.returnId, order_id: this.orderId
        }
      }
      this.$confirm('确认继续操作吗?', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        center: true
      }).then(() => {
        this.axios.post(this.mainUrl+'supplier.php?c=order&a=update', qs.stringify(params)).then(res => {
          console.log(res, params)
          let { err_code, err_msg } = res.data;
          if (err_code == 0) {
            this.$message({
              type: 'success',
              message: err_msg
            });
            // location.reload();
            this.oninit();
          } else {
            this.$message({
              type: 'error',
              message: err_msg.err_log
            });
          }
        })
      }).catch(() => {
        // this.$message({
        //   type: 'info',
        //   message: '已取消删除'
        // });
      });
    },

    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      // this.page = val;
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.page = val;
      this.oninit();
    },
    open6() {
      this.$confirm('确认导出?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        if(this.type==1){
        var order_no = this.order_no;
        var goods_name = this.goods_name;
        var goods_code = this.goods_code
        var startdate = this.$moment(this.value1).format('YYYY-MM-DD HH:mm:ss') //2019-04-11
        var enddate = this.$moment(this.value2).format('YYYY-MM-DD HH:mm:ss') //2019-04-11
      }else if(this.type==2){
        var order_no = this.order_no2;
        var goods_name = this.goods_name2;
        var goods_code = this.goods_code2
        var startdate = this.$moment(this.value3).format('YYYY-MM-DD HH:mm:ss') //2019-04-11
        var enddate = this.$moment(this.value4).format('YYYY-MM-DD HH:mm:ss') //2019-04-11
      }else if(this.type==3){
        var order_no = this.order_no3;
        var goods_name = this.goods_name3;
        var goods_code = this.goods_code3
        var startdate = this.$moment(this.value5).format('YYYY-MM-DD HH:mm:ss') //2019-04-11
        var enddate = this.$moment(this.value6).format('YYYY-MM-DD HH:mm:ss') //2019-04-11
      }else if(this.type==4){
        var order_no = this.order_no4;
        var goods_name = this.goods_name4;
        var goods_code = this.goods_code4
        var startdate = this.$moment(this.value7).format('YYYY-MM-DD HH:mm:ss') //2019-04-11
        var enddate = this.$moment(this.value8).format('YYYY-MM-DD HH:mm:ss') //2019-04-11
      }else if(this.type==5){
        var order_no = this.order_no5;
        var goods_name = this.goods_name5;
        var goods_code = this.goods_code5
        var startdate = this.$moment(this.value9).format('YYYY-MM-DD HH:mm:ss') //2019-04-11
        var enddate = this.$moment(this.value10).format('YYYY-MM-DD HH:mm:ss') //2019-04-11
      }
        
        var params = { code:goods_code,type: this.type, supplier_id: this.id, order_no: order_no, goods_name: goods_name, start_time: startdate, end_time: enddate };
        if (this.type == 2 || this.type == 3 || this.type == 4||this.type==6) {
          var url = this.mainUrl+"supplier.php?c=order&a=out_return"
        } else if (this.type == 1 || this.type == 5) {
          var url = this.mainUrl+"supplier.php?c=order&a=out_send_order"
        }
        // this.export2Excel();
        this.axios.post(url, qs.stringify(params)).then(res => {
          console.log(res, params)
          let { err_code, err_msg } = res.data;
          if (err_code == 0) {
            url += "&code=" + goods_code + "&type=" + this.type + "&supplier_id=" + this.id + "&order_no=" + order_no + "&goods_name=" + goods_name + "&start_time=" + startdate + "&end_time=" + enddate;
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
  },
}
</script>
<style lang="">
@import "../common/index.css";
/* input {
  width: 220px;
  height: 36px;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
} */
</style>
