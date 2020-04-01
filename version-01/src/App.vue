<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
export default {
  name: 'app',
  components: {
  },
  mounted(){
  },
  created(){

  }
}
</script>
<style lang="scss">
*{
  padding: 0;
  margin: 0;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-height:100vh;
  font-size:0.87rem !important;
  font-weight:400;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.el-icon-message{color: #2d8cf0;font-size: 30px;vertical-align:middle !important;margin-right: 5px;}
</style>
