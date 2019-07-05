import axios from 'axios'
let qs = require("qs");
export default {
  data() {
    return {
      region: '',
      radio: 1,
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
      count: null,
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
      goods_name: '',
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
      currentPage4: 4
    };
  },
  mounted: function () {
    this.dataStat();
    this.oninit();
  },
  watch: {
    '$router': 'dataStat'
  },
  methods: {
    // 发货订单
    shipper(a, b) {
      this.dialogTableVisible = true;
      console.log(a, b)
      this.orderId = a;
      this.store_id = b;
      var params = { store_id: this.store_id, order_id: this.orderId };
      this.axios.post('supplier.php?c=order&a=package_product', qs.stringify(params)).then(res => {
        console.log(res)
        let { err_code, err_msg } = res.data;
        if (err_code == 0) {
          this.address = err_msg.address;
          console.log(this.addres)
          this.productList = err_msg.products;
          this.express = err_msg.express;
        } else {
          alert(err_msg.err_log)
        }

      })
    },
    // 退出
    logout() {
      if (window.history.length <= 1) {
        this.$router.push({ path: '/' })
        return false
      } else {
        this.$router.go(-1)
      }
      // this.axios.post(this.mainUrl+'supplier.php?c=index&a=login_out').then(res=>{
      // this.$router.push({
      //   path:'/ordersys'
      // })
      // })
    },
    // 订单处理统计
    dataStat() {
      var name = this.$route.query.name;
      var id = this.$route.query.id;
      this.name = name;
      this.id = id;
      var params = { supplier_id: this.id };
      this.axios.post('supplier.php?c=order&a=order_info_count', qs.stringify(params)).then(res => {
        console.log(res)
        let { err_code, err_msg } = res.data;
        if (err_code == 0) {
          this.change_data = err_msg.change_data;
          this.refund_data = err_msg.refund_data;
          this.repair_data = err_msg.repair_data;
          this.sent_data = err_msg.sent_data;
        } else {
          alert(err_msg.err_log)
        }

      })
    },
    // 筛选
    onSubmit() {
      const startdate = this.$moment(this.value1).format('YYYY-MM-DD hh:mm:ss') //2019-04-11
      const enddate = this.$moment(this.value2).format('YYYY-MM-DD hh:mm:ss') //2019-04-11
      var params = { type: this.type, supplier_id: this.id, order_no: this.order_no, goods_name: this.goods_name, start_time: startdate, end_time: enddate, p: this.page };
      this.axios.post('supplier.php?c=order&a=supplier_order', qs.stringify(params)).then(res => {
        console.log(res, params)
        let { err_code, err_msg } = res.data;
        if (err_code == 0) {
          if (this.type == 1 || this.type == 5) {
            this.tableData = err_msg.list;
          } else if (this.type == 2 || this.type == 3 || this.type == 4) {
            this.tableData2 = err_msg.list;
          }
          this.count = err_msg.count;
        } else {
          alert(err_msg)
        }
      })
    },
    oninit() {
      const startdate = this.$moment(this.value1).format('YYYY-MM-DD hh:mm:ss') //2019-04-11
      const enddate = this.$moment(this.value2).format('YYYY-MM-DD hh:mm:ss') //2019-04-11
      var params = { type: this.type, supplier_id: this.id, order_no: this.order_no, goods_name: this.goods_name, start_time: startdate, end_time: enddate, p: this.page };
      this.axios.post('supplier.php?c=order&a=supplier_order', qs.stringify(params)).then(res => {
        console.log(res, params)
        let { err_code, err_msg } = res.data;
        if (err_code == 0) {
          if (this.type == 1 || this.type == 5) {
            this.tableData = err_msg.list;
          } else if (this.type == 2 || this.type == 3 || this.type == 4) {
            this.tableData2 = err_msg.list;
          }
          this.count = err_msg.count;
        } else {
          alert(err_msg)
        }
      })
    },
    handleClick(tab, event) {
      var eventid = event.target.getAttribute('id');
      console.log(eventid)
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

    //  供应商退货、换货、补发
    tableClick(a, b, c, d) {
      console.log(a, b, c, d)
      this.supplier = a;
      this.productId = b;
      this.returnId = c;
      this.orderId = d;
      if (this.type == 1) {
        var params = {
          order_product_id: this.productId, set_status: this.supplier, id: this.returnId, order_id: this.orderId
        }
        this.$confirm('确认继续操作吗?', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          center: true
        }).then(() => {
          this.axios.post('supplier.php?c=order&a=update', qs.stringify(params)).then(res => {
            console.log(res, params)
            let { err_code, err_msg } = res.data;
            if (err_code == 0) {
              this.$message({
                type: 'success',
                message: err_msg
              });
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
      } else {
        var params = { send_type: '', order_id: this.orderId, express_id: '', express_company: '', express_no: '', store_id: '', products: '', order_products: '', sku_data: [] }
      }

    },

    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.page = val;
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.page = val;
      this.oninit();
    },
    open6() {
      this.$confirm('该指定条件下有订单' + this.count + '条, 确认导出?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        const startdate = this.$moment(this.value1).format('YYYY-MM-DD hh:mm:ss') //2019-04-11
        const enddate = this.$moment(this.value2).format('YYYY-MM-DD hh:mm:ss') //2019-04-11
        var params = { type: this.type, supplier_id: this.id, order_no: this.order_no, goods_name: this.goods_name, start_time: startdate, end_time: enddate };
        if (this.type == 2 || this.type == 3 || this.type == 4) {
          var url = "supplier.php?c=order&a=out_return"
        } else if (this.type == 1 || this.type == 5) {
          var url = "supplier.php?c=order&a=out_send_order"
        }
        // this.export2Excel();
        this.axios.post(url, qs.stringify(params)).then(res => {
          console.log(res, params)
          let { err_code, err_msg } = res.data;
          if (err_code == 0) {
            url += "&type=" + this.type + "&supplier_id=" + this.id + "&order_no=" + this.order_no + "&goods_name=" + this.goods_name + "&start_time=" + startdate + "&end_time=" + this.enddate;
            window.location.href = url;
          } else {
            this.$message({
              type: 'info',
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
  },
  filters: {
    // formatDate(time) {
    //     var date = new Date(time);
    //     console.log(date)
    //     return formatDate(date, 'yyyy-MM-dd hh:mm:ss');
    // }
  }
}