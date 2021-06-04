<template>
  <div class="Equipment">
    <el-card class="box-card">
        <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>器材管理</el-breadcrumb-item>
        </el-breadcrumb>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Equipment',
  data () {
    return {

    }
  },
  components: {},
  methods: {}
}
</script>

<style scoped>
.Equipment,.box-card {
    width: 100%;
    height: 100%;
}
</style>
