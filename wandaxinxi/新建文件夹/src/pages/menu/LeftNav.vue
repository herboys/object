<template>
    <section>
        <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
            <el-radio-button :label="false">展开</el-radio-button>
            <el-radio-button :label="true">收起</el-radio-button>
            </el-radio-group>
            <el-menu  :default-active="this.$route.path" router class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
                <el-menu-item v-for="(item,i) in navList" :key="i" :index="item.name">
                  {{ item.navItem }}
              </el-menu-item>

                <!-- <el-submenu index="1">
                    <template slot="title">
                    <i class="el-icon-location"></i>
                    <span slot="title">全文检索</span>
                    </template>
                    <el-menu-item index="1-1">全文检索</el-menu-item>
                    <el-menu-item index="1-3">高级检索</el-menu-item>
                </el-submenu>
                <el-menu-item index="2">
                    <i class="el-icon-menu"></i>
                    <span slot="title">登录</span>
                </el-menu-item>
                  <el-submenu index="3">
                      <template slot="title">
                        <i class="el-icon-location"></i>
                        <span slot="title">检索结果结果化</span>
                      </template>
                      <el-menu-item index="1-1">添加数据集</el-menu-item>
                      <el-submenu index="1-4">
                        <span slot="title">查看数据集</span>
                        <el-menu-item index="1-4-1">条件分组</el-menu-item>
                        <el-menu-item index="1-4-1">随机分组</el-menu-item>
                      </el-submenu>
                      <el-menu-item index="1-1">查看数据集-去重</el-menu-item>
                      <el-menu-item index="1-1">查看数据集-筛选</el-menu-item>
                      <el-menu-item index="1-1">查看数据集-排序</el-menu-item>
                      <el-menu-item index="1-1">查看数据集-分组后</el-menu-item>
                </el-submenu> -->
            </el-menu>
    </section>
</template>

<script>
 export default {
    data(){
      return{
        isCollapse: true,
        navList:[
            {name:'/login',navItem:'登录'},
            {name:'/retrieval',navItem:'全文检索'},
            {name:'/advanced',navItem:'高级检索'},
            {name:'/searchResult',navItem:'检索结果结果化'},
            {name:'/lookData',navItem:'查看数据集'},
        ],

      };
    },
    methods:{
      handleOpen(key, keyPath) {
        // console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        // console.log(key, keyPath);
      }
    }
  }
</script>

<style scoped>
    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 200px;
        min-height: 400px;
  }
</style>