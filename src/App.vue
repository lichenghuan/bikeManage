<template>
  <el-config-provider namespace="ep">
    <!-- <BaseHeader /> -->
    <div class="flex main-container">
      <BaseSide />
      <div w="full" py="4">
        <router-view></router-view>  
      </div>
    </div>
  </el-config-provider>
</template>

  
<script>  
  
export default {  
  components: {  
 
  },  
};  
</script>