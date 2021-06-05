<template>
  <div class="Contest">
    <el-card class="box-card">
        <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>赛事管理</el-breadcrumb-item>
        </el-breadcrumb>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Contest',
  data () {
    return {
      a:"aaaaaaaaa"
    }
  },
  components: {},
  methods: {}
}
</script>

<style scoped>
.Contest,.box-card {
    width: 100%;
    height: 100%;
}
</style>
