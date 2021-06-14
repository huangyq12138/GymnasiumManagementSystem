<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted () {
    localStorage.setItem('Authorization',"Jared-eyJhbGciOiJIUzUxMiJ9.eyJhdXRob3JpdGllcyI6IlJPTEVfc3VwZXJBZG1pbiwiLCJqdGkiOiIyMDE4MTE3MDExMjciLCJzdWIiOiLogpblrrbosaoiLCJpYXQiOjE2MjM1NjU0MjYsImlzcyI6IkphcmVkIiwiZXhwIjoxNjI0MTcwMDk0fQ.HinBkcKt3yRs-S9saaWdwGP9aFRraYtsQeJLVV-0MhWL5bJ_mlf7NCdAdVNXggDsmP0I4lSMuNL3PfX2pFsHhg")
  }
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
