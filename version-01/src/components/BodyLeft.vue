<template>
   
<div class="bodyLeft">
    <ul v-once v-if="staticId == 0">
      <li v-for="item of indexs" :key="item.id">
        <a>
          <i class="el-icon-message"></i>
          {{item.text}}
        </a>
      </li>
    </ul>
    <ul v-once v-else-if="staticId == 1">
      <li v-for="item of sys" :key="item.id">
        <a>
          <i class="el-icon-message"></i>
          {{item.text}}
        </a>
      </li>
    </ul>
    <ul v-once v-else key="list3">
      <li v-for="item of cam" :key="item.id">
        <a>
          <i class="el-icon-message"></i>
          {{item.text}}
        </a>
      </li>
    </ul>
</div>
</template>
<script>
  export default {
  name: 'BodyLeft',
  data: function () {
    return {
      staticId: 0,
      indexs: [{
        id: 0,
        text: '首页'}
      ],
      sys: [
        {
          id: 11,
          text: '角色权限设置'
        }, {
          id: 12,
          text: '操作员设置'
        }, {
          id: 13,
          text: '系统日志'
        }
      ],
      cam: [
        { id: 21,
          text: '企业信息设置'
        },
        { id: 22,
          text: '部门管理'
        },
        { id: 23,
          text: '职务设置'
        },
        { id: 24,
          text: '员工管理'
        }
      ]
    }
  },
  created: function () {
    this.bbtn()
  },
  methods: {
    bbtn: function () {
      this.bus.$on('sendId', (id) => { this.staticId = id })
    }
 }
  }
</script>
<style scoped>
  .bodyLeft{width: 200px;height:100%;background:#0d5477;color:#fff;min-height:100vh;}
  .bodyLeft ul li{width: 100%;height: 60px;line-height:60px;float: left;}
  .bodyLeft ul li:hover{background-color: rgb(36,168,216);cursor: pointer;}
</style>