<template>  
  <el-menu  
    :default-active="activeIndex"  
    class="el-menu-vertical-demo"  
    @select="handleSelect"  
    background-color="#1F1F1F"  
    text-color="#fff"  
    active-text-color="#59AFEE"  
  >  
    <el-menu-item index="/">自行车品牌管理</el-menu-item>  
    <el-menu-item index="/bikesList">自行车列表</el-menu-item>  
    <el-menu-item index="/about">关于</el-menu-item>  
 
  </el-menu>  
</template>  
  
<script>  
export default {  
  data() {  
    return {  
      activeIndex: '/', // 当前激活的导航项  
    };  
  },  
  methods: {  
    handleSelect(index) {  
      this.$router.push(index); // 使用 Vue Router 导航到对应的路由  
    },  
  },  
};  
</script>  
  
<style scoped>  
.el-menu-vertical-demo:not(.el-menu--collapse) {  
  width: 200px;  
  min-height: 100vh;  
}  
</style>