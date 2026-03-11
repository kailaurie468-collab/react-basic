import {
  createBrowserRouter,
  Link,
  Outlet,
  useParams,
  useSearchParams,
  redirect,
} from "react-router-dom";
// import Comment from "@/Comment.js";
import { lazy, Suspense } from "react";

const Comment = lazy(() => {
  return import("@/Comment.js");
});

const About = () => {
  const [params] = useSearchParams();
  const { name } = useParams(); // return obj {}
  return (
    <div>
      <h1>About</h1>
      <p>查询参数：{params.get("name")}</p>
      <p>路径参数：{name}</p>
      <Link to={"/about/child1"}>子路由</Link>
      <hr />
      <Link to={"/about/child2"}>子路由2</Link>
      {/* 子路由渲染出口位置 */}
      <Outlet />
    </div>
  );
};
const AboutChild1 = () => {
  return (
    <div>
      <h1>AboutChild1</h1>
    </div>
  );
};
const AboutChild2 = () => {
  return (
    <div>
      <h1>AboutChild2</h1>
    </div>
  );
};

const NotFound = () => {
  return (
    <div>
      <h1>404</h1>
    </div>
  );
};

// 方式一实现类似路由守卫的作用
const authLoader = () => {
  const isLogin = localStorage.getItem("token");
  if (!isLogin) {
    // 🟢 注意：在 loader 里必须用特殊的 redirect() 函数来打断跳转
    // return redirect("/login");
    return null;
  }
  return null; // 验证通过，放行
};

// 方式2 element 使用路由组件包裹要跳转的组件，在父组件中 符合条件才去return children
const AuthRouter = (props) => {
  const isLogin = localStorage.getItem("token");
  if (!isLogin) {
    return null;
  }
  return props.children;
};

// hash模式
// const router = createHashRouter([ ])
/**
 * URL 中 # 后面的内容绝对不会被发送到服务器。它纯粹是给浏览器自己看的。
当 # 后面的字符改变时，
浏览器不会发起网络请求去刷新页面，只会触发一个叫 hashchange 的 JavaScript 事件。
React/Vue 路由就是监听这个事件，然后偷偷把页面上的组件替换掉。
 */
// history 模式
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<div>loading...</div>}>
        <Comment />
      </Suspense>
    ),
    index: true,
    loader: authLoader, // 🚀 绑定守卫：进这个页面前，先给我跑一遍 authLoader！
  },
  {
    path: "/about/:name?",
    element: <About />,
    children: [
      {
        path: "/about/child1",
        element: <AboutChild1 />,
        // index 作用：让这个路由成为默认路由 一级路由渲染的时候，会默认渲染这个路由 path 需要“/”
        index: true,
      },
      {
        path: "/about/child2",
        element: <AboutChild2 />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
// 使用路由懒加载

export default router;
