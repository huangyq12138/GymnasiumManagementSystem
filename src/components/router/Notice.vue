<template>
  <div class="Notice">
    <el-card class="box-card">
        <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>公告管理</el-breadcrumb-item>
        </el-breadcrumb>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Notice',
  data () {
    return {

    }
  },
  components: {},
  methods: {}
}
</script>

<style scoped>
.Notice,.box-card {
    width: 100%;
    height: 100%;
}
</style>
