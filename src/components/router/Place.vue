<template>
  <div class="Place">
    <el-card class="box-card">
        <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>场地管理</el-breadcrumb-item>
        </el-breadcrumb>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Place',
  data () {
    return {

    }
  },
  components: {},
  methods: {}
}
</script>

<style scoped>
.Place,.box-card {
    width: 100%;
    height: 100%;
}
</style>
