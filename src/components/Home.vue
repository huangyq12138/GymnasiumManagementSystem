<template>
  <div class="Login">
    <el-container
    class="login_container">
      <!-- 顶部导航栏 -->
        <el-header>
          <el-row  class="login_header">
            <el-col :span="5">
              <div class="grid-content bg-purple">
                <span class="l_icon" @click="close_open"><i class="el-icon-s-fold"></i></span>
                广东海洋大学体育馆管理系统
              </div>
            </el-col>
            <el-col :span="15"><div class="grid-content bg-purple-light"></div></el-col>
            <el-col :span="4">
              <div class="grid-content bg-purple">
                <el-menu
                  :default-active="activeIndex"
                  class="el-menu-demo"
                  mode="horizontal"
                  @select="handleSelect"
                  background-color="#545c64"
                  text-color="#fff"
                  active-text-color="#ffd04b">
                  <el-submenu index="1">
                    <template slot="title">个人中心</template>
                    <el-menu-item index="1-1">修改密码</el-menu-item>
                  </el-submenu>
                  <el-menu-item index="2">退出登录</el-menu-item>
                </el-menu>
              </div>
            </el-col>
          </el-row>
        </el-header>
        <el-container>
          <!-- 侧边菜单栏 -->
            <el-aside :width="el_aside_width">
              <el-menu
                default-active="User"
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose"
                background-color="#667777"
                text-color="#fff"
                active-text-color="#ffd04b"
                :collapse="isCollapse"
                router
                >
                <el-menu-item index="User">
                  <i class="el-icon-s-custom"></i>
                  <span slot="title">用户管理</span>
                </el-menu-item>
                <el-menu-item index="Notice">
                  <i class="el-icon-bell"></i>
                  <span slot="title">公告管理</span>
                </el-menu-item>
                <el-menu-item index="Place">
                  <i class="el-icon-map-location"></i>
                  <span slot="title">场地管理</span>
                </el-menu-item>
                <el-menu-item index="Contest">
                  <i class="el-icon-timer"></i>
                  <span slot="title">赛事管理</span>
                </el-menu-item>
                <el-menu-item index="Equipment">
                  <i class="el-icon-basketball"></i>
                  <span slot="title">器材管理</span>
                </el-menu-item>
                <el-menu-item index="Money">
                  <i class="el-icon-s-data"></i>
                  <span slot="title">运营管理</span>
                </el-menu-item>
              </el-menu>
            </el-aside>
            <!-- 内容主体 -->
            <el-main>
              <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      isCollapse: false,
      el_aside_width:"200px",
       activeIndex: '1'
    }
  },
  components: {},
  methods: {
      //侧边栏子菜单展开事件 
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
       //侧边栏子菜单关闭事件 
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      // 菜单折叠事件
      close_open(){
        this.isCollapse = !this.isCollapse
        if(this.isCollapse==true){
          this.el_aside_width="auto"
        }else{
          this.el_aside_width="200px"
        }
      },
      //顶部菜单栏选择事件
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
  }
}
</script>

<style scoped>
.Login,.login_container{
  height: 100%;
  min-width: 1200px;
}
.l_icon{
  cursor: pointer;
  margin-right: 10px;
}
 .el-header{
    background-color: #B3C0D1;
    color: #fff;
    text-align: center;
    line-height: 60px;
    background-color: rgb(84, 92, 100);
  }

  .el-aside {
    background-color: #D3DCE6;
    color: #333;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    overflow: hidden;
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  
  .el-col {
    border-radius: 4px;
  }
  .grid-content {
    border-radius: 4px;
    height: 60px;
    min-height: 40px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
 .el-menu-vertical-demo{
   height: 100%;
 }


</style>

