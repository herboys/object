<template>
    <el-menu
        :default-active="this.$route.path"
        router
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        background-color="#042f8e"
        text-color="#fff"
        active-text-color="#fff">
                <el-menu-item v-for="(item,i) in navList" :key="i" :index="item.name">
                  {{ item.navItem }}
                </el-menu-item>
        </el-menu>
</template>
<script>
  export default {
    data() {
      return {
        activeIndex: '1',
        activeIndex2: '1',
        navList:[
            {name:'/login',navItem:'登录'},
            {name:'/retrieval',navItem:'全文检索'},
            {name:'/advanced',navItem:'高级检索'},
            {name:'/searchResult',navItem:'检索结果结果化'},
            {name:'/lookData',navItem:'查看数据集'},
        ],
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        // console.log(key, keyPath);
      }
    }
  }
</script>