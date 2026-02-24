// 使用rtk 创建store
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
/*
全局的 Store 就像是一个大披萨，包含着整个 App 的所有状态。
而 counterSlice 只是切下来的一块**“计数器披萨（切片）”**，
它只负责管理自己这一小块领域的初始状态（initialState）和修改规则（reducers）
*/
const counterStore = createSlice({
  // store的名称
  name: "counter",
  initialState: { value: 0, isLoading: true, error: null },
  // 相当于原版redux的reducer函数的action
  reducers: {
    // 自于你在 createSlice 里面写的那个 initialState（初始状态）。
    // 同步修改
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    addByNum(state, action) {
      /*
        {
            "type": "counter/addByNum",
            "payload": 10
        }
        */
      console.log(action);
      state.value += action.payload;
    },
    // 异步修改
  },
  // 🌟 2. 专门用来监听 createAsyncThunk 派发的三种状态
  extraReducers: (builder) => {
    builder
      // 状态 1：Pending (请求刚发出去，还没回来)
      .addCase(fetchJsonDataByaysncThunk.pending, (state) => {
        state.isLoading = true; // 开启转圈圈
      })
      // 状态 2：Fulfilled (请求成功回来了)
      .addCase(fetchJsonDataByaysncThunk.fulfilled, (state, action) => {
        state.isLoading = false; // 关掉转圈圈
        // action.payload 就是你刚才在上面 return res.data 的那个值！
        state.value = action.payload;
      })
      // 状态 3：Rejected (请求失败了，比如 404 或断网)
      .addCase(fetchJsonDataByaysncThunk.rejected, (state, action) => {
        state.isLoading = false; // 关掉转圈圈
        state.error = "网络崩了，请重试！";
      });
  },
});

// return asyncThunk
export const fetchJsonDataByaysncThunk = createAsyncThunk(
  // 第一个参数：表示promise 的三种状态前缀
  "counter/fetchJson",
  async (URL, thunkAPI) => {
    const res = await axios.get(URL);
    // 2. 把拿到的数据 return 出去，它会自动变成 fulfilled 状态下的 payload
    return res.data.length;
  },
);

// 导出actionCreator 用来在组件中创建action 分配给dispatch来修改state
/**
 * {
 *  action: ...,
 *  payload: ...
 * }
 */
export const { increment, decrement, addByNum } = counterStore.actions;
// 导出reducer
export default counterStore.reducer;
