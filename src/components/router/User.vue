<template>
  <div class="User">
     <el-card class="box-card">
        <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        </el-breadcrumb>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'User',
  data () {
    return {

    }
  },
  components: {},
  methods: {}
}
</script>

<style scoped>
.User,.box-card {
    width: 100%;
    height: 100%;
}
</style>
