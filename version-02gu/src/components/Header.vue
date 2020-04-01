<template>
    <div class="header">
        <ul>
            <li v-for="items of list" :key="items.id" @click="Click(items.id)">
                <a href="javascript:void(0);">{{items.text}}</a>
            </li>
        </ul>
    </div>
</template>
<script>
    export default {
        name: 'HomeHeader',
        data () {
            return {
            list: [
                { id: 0,
                name: 'index',
                text: '首页',
                href: '#'
                },
                {id: 1,
                name: 'sys',
                text: '系统管理',
                href: '#'
                },
                { id: 2,
                name: 'cam',
                text: '企业管理',
                href: '#'
                }]
            }
        },
        methods:{
            Click: function (id) {
            this.bus.$emit('sendId', id)
            }
        }
    }
</script>
<style scoped>
    .header{width:100%;float:left;}
    .header ul li{width:100px;height: 30px;float: left;}
</style>