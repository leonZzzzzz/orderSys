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
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item class="top-left">订单处理</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="order-content">
          <ul>
            <li @click="waitDel">
              等待发货订单
              <el-button>{{sent_data}}</el-button>
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
                      @click="shipper(scope.row.order_id,scope.row.store_id,null)"
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
                <el-table-column prop="address_user" label="换货人" width="70px"></el-table-column>
                <el-table-column prop="address_tel" label="换货人电话"></el-table-column>
                <el-table-column prop="address" label="换货人地址"></el-table-column>
                <el-table-column prop="dateline" label="申请换货时间"></el-table-column>

                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button
                      v-if="scope.row.supplier_status==0"
                      @click="tableClick(scope.row.supplier_status,scope.row.order_product_id,scope.row.id,scope.row.order_id)"
                      type="text"
                      size="small"
                    >确认收货</el-button>
                    <el-button
                      v-if="scope.row.supplier_status==2"
                      @click="shipper(scope.row.order_id,scope.row.store_id,scope.row.order_product_id)"
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
                      @click="shipper(scope.row.order_id,scope.row.store_id,scope.row.order_product_id)"
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
                  <el-option v-for="(item,index) in express" :label="item.name" :value="item.code"></el-option>
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
        </el-tabs>
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
      url:'',
      isRouterAlive:true,
      express_num:'',
      region: '',
      radio: '1',
      address: {},
      productList: [],
      express: [],
      dialogTableVisible: false,
      store_id: '',
      returnId: '',
      orderId: '',
      productId: '',
      supplier: '',
      ruleList: [],
      mainUrl: this.domain.testUrl,//公共域名
      total: '',
      page: '1',
      type: '1',
      name: '',
      id: '',
      change_data: "",
      refund_data: "",
      repair_data: "",
      sent_data: "",
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
      goods_name: '',
      goods_name2: '',
      goods_name3: '',
      goods_name4: '',
      goods_name5: '',
      goods_code:'',
      goods_code2:'',
      goods_code3:'',
      goods_code4:'',
      goods_code5:'',
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
      window.location.href =this.mainUrl+"supplier.php?c=index&a=index";
    }else{
      this.dataStat();
      this.oninit();
      this.timer = setInterval(this.dataStat, 10000);
    } 
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
    // 发货保存中
    save(){
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
    // 发货补发货订单
    shipper(a, b,c) {
      console.log(a,b,c)
      this.dialogTableVisible = true;
      console.log(a, b)
      this.orderId = a;
      this.store_id = b;
      if(c==null){
        var params = { store_id: this.store_id, order_id: this.orderId ,order_type:1};
      }else{
        var params = { store_id: this.store_id, order_id: this.orderId,order_product_id:c };
      }
      this.axios.post(this.mainUrl+'supplier.php?c=order&a=package_product', qs.stringify(params)).then(res => {
        console.log(res)
        let { err_code, err_msg } = res.data;
        if (err_code == 0) {
          this.address = err_msg.address;
          console.log(this.address)
          this.productList = err_msg.products;
          this.express = err_msg.express;
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
      }
      var params = { code:goods_code,type: this.type, supplier_id: this.id, order_no: order_no, goods_name: goods_name, start_time: startdate, end_time: enddate, p: this.page };
      this.axios.post(this.mainUrl+'supplier.php?c=order&a=supplier_order', qs.stringify(params)).then(res => {
        console.log(res, params)
        let { err_code, err_msg } = res.data;
        if (err_code == 0) {
          if (this.type == 1 || this.type == 5) {
            this.total =Number(err_msg.count);
            this.tableData = err_msg.list;
          } else if (this.type == 2 || this.type == 3 || this.type == 4) {
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
            } else if (this.type == 2 || this.type == 3 || this.type == 4) {
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
        if (this.type == 2 || this.type == 3 || this.type == 4) {
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
