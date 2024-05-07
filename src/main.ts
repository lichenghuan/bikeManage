import { createApp } from "vue";
import App from "~/App.vue";
import ElementPlus from 'element-plus'  
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import router from "~/router"; // 引入路由
import "~/styles/index.scss";
import "uno.css";
import "element-plus/theme-chalk/src/message.scss";
import 'element-plus/dist/index.css'
import request from "~/utils/request";

const app = createApp(App);
app.use(router); // 使用路由插件

// 添加全局方法
window.$cloud =request();
// app.config.globalProperties.$cloud = request();
// app.use(ElementPlus);
app.use(ElementPlus, { locale: zhCn })  

app.mount("#app");
