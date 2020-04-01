<template>
  <div class="header">
    <ul>
        <li>
          <a class="navbar-brand">
            <img src="../assets/img/MainMenu_logo.png" />
            <span class="workName">地铁广播系统</span>
            <!-- <span class="workName">{{networkName}}</span> -->
          </a>
        </li>
        <li>
          <a class="nav-link"  @click="sidebarMinimize">&#9776;</a>
        </li>
        <li v-for="items of list" :key="items.id" @click="Click(items.id)">
          <a href="javascript:void(0);">{{items.name}}</a>
        </li>
        <li style="float: right;margin-right: 30px;">
          <!-- 用户信息 -->
          <el-dropdown class="user-info-dropdown" trigger="hover">
              <img src="../assets/img/6.png"/>
              <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item @click.native="logout">登出</el-dropdown-item>
              </el-dropdown-menu>
          </el-dropdown>
        </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "HomeHeader",
  data() {
    return {
      list: [
        {
          id: 0,
          path: 'index',
          name: '首页',
          icon: 'el-icon-s-home',
          href: "#"
        },
        {
          id: 1,
          path: 'system',
          name: '系统管理',
          icon: 'el-icon-menu',
          href: "#"
        },
        {
          id: 2,
          path: 'compan',
          name: '企业管理',
          icon: 'el-icon-office-building',
          href: "#"
        }
      ]
    };
  },
  methods: {
    Click: function(id) {
      this.bus.$emit("sendId", id);
    },
    //退出登录
    logout: function() {
      var _this = this;
      this.$confirm("确认退出吗?", "提示", {
        type: "warning"
      })
      .then(() => {
        // localStorage.removeItem("token","");
        this.$router.push({ path:"/login"});
        console.log(this)
      })
      .catch(() => {});
    },
    sidebarMinimize (e) {
    //   e.preventDefault()
    //   document.body.classList.toggle('aside-menu-hidden')
    },
  },
  mounted(){
  }
};
</script>
<style scoped>
.header {width: 100%;float: left;height: 60px;line-height: 60px;background-color: #143f6d; color: #fff;}
.header ul li {min-width: 120px;height: 60px;float: left;list-style: none;text-align: center;}
.header ul li a {text-decoration: none;color: #fff;}
.header ul li:nth-child(1):hover,.header ul li:nth-child(2):hover,.header ul li:nth-last-child(1):hover {background-color:#143f6d !important;}
.header ul li:hover{background-color: rgb(36,168,216);cursor: pointer;}
.nav-link{display:inline-block;font-size:1.25rem;line-height:1;color:#2d8cf0 !important;transition:color .2s ease;cursor: pointer;}
.header ul li:nth-child(1),.navbar-brand {display: inline-block;width: 200px;height: 60px;line-height: 60px;}
.navbar-brand img{ vertical-align:middle;width: 50px;height: 50px;}
.workName{color:#fff;font-size: 22px;display:inline-block;}
.user-info-dropdown {font-size: 20px;padding-right: 20px;color: #fff;cursor: pointer;}
.user-info-dropdown img {width: 40px;height: 40px;border-radius: 5px;margin: 10px 0px 10px 10px;float: right;}
</style>