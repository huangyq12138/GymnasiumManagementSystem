<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'App',
  mounted () {}
}
</script>

<style>
*{
  margin:0;
  padding:0;
}
html,body{
  height: 100%;
  min-width: 1400px;
  min-height: 600px;
  overflow-y: hidden;
}
#app{
  height: 100%;
}
a{
  text-decoration: none;
}
</style>
