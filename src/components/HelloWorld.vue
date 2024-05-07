<script setup lang="ts">
import { ref, onMounted } from "vue";
import { ElMessage } from "element-plus";

defineProps<{ msg: string }>();

const count = ref(0);
const input = ref("element-plus");

const curDate = ref("");

const toast = () => {
  ElMessage.success("Hello");
};

 
onMounted(() => {
    console.log(666666);
    getData()
    
});
 

const value1 = ref(true);

const getData = async () => {
  // 声明新的 cloud 实例
  console.log(window.cloud);
  var c1 = new window.cloud.Cloud({
    //必填，表示是未登录模式
    identityless: true,
    //资源方 AppID
    resourceAppid: 'wx681708f2148572cf',
    //资源方环境 ID
    resourceEnv: 'cloud1-5gadhcpyecc20c29',
  });
  console.log(c1);
  //初始化
  await c1.init();
  //初始化执行完再调用

  // 完成后正常使用资源方的已授权的云资源
  c1.callFunction({
    name: 'getAllBikeComp', //调用的云函数名字
    success: (res) => {
      console.log(res);
    },
    fail: (res) => {
      console.log('fail');
      console.log(res);
    },
  });
};




</script>

<template>
  <h1 color="$ep-color-primary">{{ msg }}</h1>

  <!-- example components -->

  <div class="my-2 text-center flex flex-wrap justify-center items-center">
    <el-button @click="count++">count is: {{ count }}</el-button>
    <el-button type="primary" @click="count++">count is: {{ count }}</el-button>
    <el-button type="success" @click="count++">count is: {{ count }}</el-button>
    <el-button type="warning" @click="count++">count is: {{ count }}</el-button>
    <el-button type="danger" @click="count++">count is: {{ count }}</el-button>
    <el-button type="info" @click="count++">count is: {{ count }}</el-button>
  </div>

  <div>
    <el-tag type="success" class="m-1">Tag 1</el-tag>
    <el-tag type="warning" class="m-1">Tag 1</el-tag>
    <el-tag type="danger" class="m-1">Tag 1</el-tag>
    <el-tag type="info" class="m-1">Tag 1</el-tag>
  </div>

  <div>
    <el-switch v-model="value1" />
    <el-switch v-model="value1" class="m-2" style="--ep-switch-on-color: black; --ep-switch-off-color: gray;" />
  </div>

  <div class="my-2">
    <el-input class="m-2" v-model="input" style="width: 200px" />
    <el-date-picker class="m-2" v-model="curDate" type="date" placeholder="Pick a day"></el-date-picker>
  </div>

  <p>For example, we can custom primary color to 'green'.</p>

  <p>
    Edit
    <code>components/HelloWorld.vue</code> to test components.
  </p>
  <p>
    Edit
    <code>styles/element/var.scss</code> to test scss variables.
  </p>

  <p>
    Full Example:
    <a href="https://github.com/element-plus/element-plus-vite-starter" target="_blank">element-plus-vite-starter</a>
    | On demand Example:
    <a href="https://github.com/element-plus/unplugin-element-plus"
      target="_blank">unplugin-element-plus/examples/vite</a>
  </p>
</template>

<style>
.ep-button {
  margin: 4px;
}

.ep-button+.ep-button {
  margin-left: 0;
  margin: 4px;
}
</style>
