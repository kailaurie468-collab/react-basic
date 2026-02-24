import { createSlice } from "@reduxjs/toolkit";

const channelStore = createSlice({
  // store的名称
  name: "channel",
  initialState: { value: 0 },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
  },
});

// 导出actionCreator 用来在组件中创建action 分配给dispatch来修改state
export const { increment, decrement } = channelStore.actions;
// 导出reducer
export default channelStore.reducer;
