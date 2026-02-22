import { useState } from "react";

// 这是一个自定义Hook，用于实现一个简单的开关功能
// 为什么要以use开头？这是React的约定，表示这是一个Hook函数，必须在函数组件或者其他Hook中调用，不能在普通函数中调用。
// 内部调用了 useState（有记忆）或 useEffect（有生命周期）。
// 它和调用它的那个组件是深度绑定的。如果组件卸载了，Hook 内部的副作用也会跟着清理
function useToggle() {
  const [isOn, setIsOn] = useState(false);
  const toggle = () => {
    setIsOn(!isOn);
  };
  // 返回需要的状态和操作函数，供组件使用
  return {
    isOn,
    toggle,
  };
}
export default useToggle;
