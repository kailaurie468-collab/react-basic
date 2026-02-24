// 集中管理状态
import counterReducer from "./modules/counterStore.js";
import channelReducer from "./modules/channelStore.js";
// 默认导出 (Default Export)：一个文件只能有一个。导入的时候不需要大括号，而且你可以随便给它起名字。
import { configureStore } from "@reduxjs/toolkit";

// 配置集权store
const store = configureStore({
  reducer: {
    counter: counterReducer,
    // 可能还有其他store
    channel1: channelReducer,
  },
});

export default store;
