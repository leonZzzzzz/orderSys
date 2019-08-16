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
              @select="handleSelect"
              text-color="#000"
              active-text-color="#409EFF"
            >
              <el-menu-item index="1">
                <i class="el-icon-tickets"></i>
                <span slot="title">订单处理</span>
              </el-menu-item>
              <el-menu-item index="2">
                <i class="el-icon-notebook-2"></i>
                <span slot="title">账单结算</span>
              </el-menu-item>
            </el-menu>
          </el-col>
        </el-row>
      </div>
      <div class="right">
        <router-view class="view"></router-view>
      </div>
    </div>
  </div>
</template>
<script>
export default {
    name: 'navbar',
    data: function () {
        return {
            mainUrl:this.domain.testUrl,
            // mainUrl:"https://dev.qutego.com/",
            active: true,
            name: '',
            id: '',
        }
    },
    mounted: function () {
        this.name = this.$route.query.name;
        this.id = this.$route.query.id;
        console.log(this.name,this.id)
        if(!this.name || !this.id){
         window.location.href =this.mainUrl+"supplier.php?c=index&a=index";
        }else{
        
        } 
    },
    methods:{
      logout() {
      this.axios.post(this.mainUrl+'supplier.php?c=index&a=login_out').then(res=>{
        window.location.href =this.mainUrl+"supplier.php?c=index&a=index";
      })
    },
        handleIconClick(ev) {
            console.log(ev);
        },
         handleSelect(key, keyPath){
        switch(key){
          case '1':
            this.$router.push({path:'/ordersys',query:{id:this.id,name:this.name}});
            // this.breadcrumbItems  = ['导航一']
            break;
          case '2':
            this.$router.push({path:'/billing',query:{id:this.id,name:this.name}})
            // this.breadcrumbItems  = ['导航二']
            break;
        }
      },
    }
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
