import { useState, useRef, useContext, createContext, useEffect } from "react";
import "./Comment.css";
import dayjs from "dayjs";
import axios from "axios";
import useToggle from "./IHook.js";
import { legacy_createStore as createStore } from "redux";
import { useDispatch, useSelector } from "react-redux";
import {
  increment,
  decrement,
  addByNum,
  fetchJsonDataByaysncThunk,
} from "./store/modules/counterStore.js";

const ctx = createContext();
const URL = "https://jsonplaceholder.typicode.com/comments";

// 所有组件公用 的逻辑
function useFetchComments(afterIdRef) {
  const [commentList, setComment] = useState([]);
  // useRef 可以用来存储一个可变的值，这个值在组件的整个生命周期内都存在，并且修改它不会触发组件的重新渲染。
  useEffect(() => {
    console.log("组件挂载后执行了-1111111111");
    // 发送GET请求获取评论数据
    axios.get(URL).then((response) => {
      const data = response.data.slice(0, 10); // 取前10条数据
      afterIdRef.current = data[data.length - 1].id + 1; // 获取最后一条数据的id，并加1作为下一条数据的id
      const formattedData = data.map((item) => ({
        id: item.id,
        content: item.body,
        pubDate: dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss"),
        likeCount: 0,
      }));
      setComment(formattedData);
    });
  }, []);
  return [commentList, setComment, afterIdRef];
}

// 1.原始 redux 使用：1.创建reducer函数 2.创建store 3.组件通过store.getState()获取状态，通过store.dispatch(action)分发动作来修改状态
function reducer(state = { count: 0 }, action) {
  switch (action.type) {
    case "INCREMENT":
      // 注意：reducer函数必须是纯函数，不能直接修改传入的状态对象，而是应该返回一个新的状态对象。
      return { count: state.count + 1 };
    case "DECREMENT":
      return { count: state.count - 1 };
    default:
      return state;
  }
}
// 创建store
const store = createStore(reducer);

// 订阅state 变化
store.subscribe(() => {
  console.log("Redux state发生了变化，新的状态是：", store.getState());
});

// 2. react-redux 使用：1.创建reducer函数 2.创建store
// 2.1.在组件树的根组件使用Provider组件将store传递下去
// 2.2.在需要使用状态的组件中使用useSelector获取状态，使用useDispatch分发动作来修改状态

function Comment() {
  //index.js 的provider传入的store综合对象  store.getState()
  // counter 来自于你 configureStore 时的那个属性名
  const { value, isLoading, error } = useSelector((state) => {
    // provider的store存储的reducer其实是state、action（原版的reducer函数综合），
    // 通过getState方法获取所有slice store的current state
    /**
     * {
    "counter": {
        "value": 0
    },
    "channel": {
        "value": 0
    }
     */
    return state.counter;
  });
  // 这个只能在组件中使用
  const dispatch = useDispatch();
  /*
 你绝对不能在 Reducer 里面写 async/await，也不能在里面发起 Axios 网络请求、设置 setTimeout 或者操作 localStorage。
 */
  // 第一次渲染的时候需要从store请求数据 进行渲染
  const fetchJsonData = () => {
    // 将axios请求封装到独立的js文件，依然能够拿到dispatch
    // 门卫说：“兄弟，你在这个文件里拿不到 useDispatch。来，用我传给你的这把 dispatch 钥匙！”
    return async (dispatch) => {
      const res = await axios.get(URL);
      dispatch(addByNum(res.data.length));
    };
  };
  // thunk 正常的 Redux 规定 dispatch 只能接收对象
  // useEffect(() => {
  //   dispatch(fetchJsonData());
  // }, [dispatch]);

  // 使用asyncThunk 代理派发
  useEffect(() => {
    dispatch(fetchJsonDataByaysncThunk(URL));
  }, [dispatch]);

  // 只要组件不被销毁（Unmount），保险箱里的数据就永远在，哪怕组件重新渲染了一万次。
  const afterIdRef = useRef(null);
  const [commentList, setComment] = useFetchComments(afterIdRef);
  // js主任务栈暂时不会执行axios的回调函数，此时idNumber 就是null
  // const [idNumber, setIdNumber] = useState(afterIdRef.current);
  // 组件挂载后发送请求获取评论数据，并将其存储在状态中
  // 1.没有依赖项：组件渲染或者更新后就执行一次
  useEffect(() => {
    console.log("组件渲染或者更新后执行了--------22222222222222");
    // 2. 这里就是“清理函数”（Cleanup） 下面的组件会更新，清除上一次的副作用
    return () => {
      console.log(
        "组件要卸载了（或者依赖变了），我先把之前搞的事情擦干净！-----------3333333333333",
      );
    };
  });
  // 2.依赖项是一个空数组：组件挂载（初始渲染）后执行一次，更新时不执行
  // useEffect(() => {
  //   console.log("组件挂载后执行了");
  //   // 发送GET请求获取评论数据
  //   axios.get(URL).then((response) => {
  //     const data = response.data.slice(0, 10); // 取前10条数据
  //     const formattedData = data.map((item) => ({
  //       id: item.id,
  //       content: item.body,
  //       pubDate: dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss"),
  //       likeCount: 0,
  //     }));
  //     setComment(formattedData);
  //   });
  // }, []);

  // 3.依赖项是一个或多个状态或props：组件挂载后执行一次，更新时如果依赖项发生变化则执行
  useEffect(() => {
    console.log(
      "组件挂载或者依赖项发生变化时执行了 ---------------44444444444444 ----",
      afterIdRef.current,
    );
  }, [afterIdRef]);
  // 必须要在dom渲染完成后 才能获取到input元素的引用，所以需要使用useRef来创建一个ref对象，并将其绑定到input元素上。
  const inputRef = useRef(null);
  const [broMsg, setBroMsg] = useState("");

  const pubComment = (context) => {
    if (context.trim() === "") {
      alert("评论内容不能为空");
      return;
    }
    // setIdNumber((prev) => prev + 1);
    setComment((prev) => [
      {
        id: afterIdRef.current++,
        content: context,
        pubDate: dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss"),
        likeCount: 0,
      },
      ...commentList,
    ]);
    inputRef.current.value = "";
    // 重新聚焦
    inputRef.current.focus();
  };

  const deleteComment = (id) => {
    setComment((prev) => prev.filter((comment) => comment.id !== id));
  };

  const sortByLikeCount = () => {
    const sortedList = [...commentList].sort(
      (a, b) => b.likeCount - a.likeCount,
    );
    setComment(sortedList);
  };

  const sortByPubDate = () => {
    const sortedList = [...commentList].sort((a, b) => b.pubDate - a.pubDate);
    setComment(sortedList);
  };

  const handlerClick = (msg) => {
    console.log("父组件的handlerClick被调用了，参数是：", msg);
  };
  const msg = "这是一个通过Context传递的消息";
  const { isOn, toggle } = useToggle();

  if (isLoading) return <div>正在拼命加载中...转圈圈...</div>;
  if (error) return <div>{error}</div>;
  return (
    <div className="main-wrapper">
      <ctx.Provider value={msg}>
        <Navigation
          commentCount={commentList.length}
          sortByLikeCount={sortByLikeCount}
          sortByPubDate={sortByPubDate}
          onClick={handlerClick}
          toggle={toggle}
        >
          <span>props:children</span>
        </Navigation>
      </ctx.Provider>
      <ctx.Provider value={[broMsg, setBroMsg]}>
        {isOn && <A />}
        <B />
      </ctx.Provider>
      {/* <button onClick={() => store.dispatch({ type: "INCREMENT" })}>
        点击增加Redux计数器
      </button> */}
      {/* 因为 这个count并不是ref，react不能感知并同步更新渲染，这只是普通的js对象  使用react-redux 桥接*/}
      {/* <p>Redux计数器的值: {store.getState().count}</p>
      <button onClick={() => store.dispatch({ type: "DECREMENT" })}>
        点击减少Redux计数器
      </button> */}
      <button onClick={() => dispatch(increment())}>点击增加Redux计数器</button>
      <p>Redux计数器的值: {value}</p>
      <button onClick={() => dispatch(decrement())}>点击减少Redux计数器</button>
      <button onClick={() => dispatch(addByNum(10))}>点击加10</button>
      <hr className="divider" />

      <div className="input-box">
        <input
          type="text"
          placeholder="请输入评论内容"
          ref={inputRef}
          className="comment-input"
        />
        <button
          className="pub-btn"
          onClick={() => pubComment(inputRef.current.value)}
        >
          发表评论
        </button>
      </div>

      <hr className="divider" />

      <ul className="comment-list">
        {/* { 条件 && <要渲染的组件/标签> } 条件渲染 */}
        {/* {commentList.map((comment) => {
          return (
            <li key={comment.id} className="comment-item">
              <p className="item-id">评论ID: {comment.id}</p>
              <p className="item-content">{comment.content}</p>
              <p className="item-date">
                {new Date(comment.pubDate).toLocaleString()}
              </p>
              <p className="item-likes">点赞数: {comment.likeCount}</p>
              <button
                className="del-btn"
                onClick={() => deleteComment(comment.id)}
              >
                删除
              </button>
            </li>
          );
        })} */}
        {commentList.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            onDelete={deleteComment}
          />
        ))}
      </ul>
    </div>
  );
}

const Navigation = (props) => {
  return (
    <div className="nav-container">
      <span className="commentCount">评论数量: {props.commentCount}</span>
      {/* 父类传入的标签值，类似vue的插槽，存储在props对象的children 属性中 */}
      <button
        className="nav-btn"
        onClick={() => props.onClick("导航按钮被点击了")}
      >
        导航按钮
      </button>
      <button className="nav-btn" onClick={props.toggle}>
        切换组件显示
      </button>
      {props.children}
      <div className="sort-box">
        <p className="likeCount" onClick={props.sortByLikeCount}>
          点赞排序
        </p>
        <p className="pubDate" onClick={props.sortByPubDate}>
          时间排序
        </p>
      </div>
      <Footer />
    </div>
  );
};
// 兄弟组件 通信 方式1： 通过共同父组件来实现中转，useState状态提升
// 方式2 ： Context 上下文
const Footer = () => {
  const msg = useContext(ctx);
  return (
    <div className="footer">
      <p>这是一个评论系统的底部组件，接收到的消息是：{msg}</p>
    </div>
  );
};
const A = () => {
  const setBroMsg = useContext(ctx)[1];
  return (
    <div>
      <button onClick={() => setBroMsg("Hello from component A!")}>
        点击A组件发送消息给B组件
      </button>
    </div>
  );
};
const B = () => {
  const broMsg = useContext(ctx)[0];
  return (
    <div>
      <p>这是组件B，接收到的兄弟组件A发送的消息是：{broMsg}</p>
    </div>
  );
};

// 封装评论item
function CommentItem({ comment, onDelete }) {
  return (
    <li key={comment.id} className="comment-item">
      <p className="item-id">评论ID: {comment.id}</p>
      <p className="item-content">{comment.content}</p>
      <p className="item-date">{new Date(comment.pubDate).toLocaleString()}</p>
      <p className="item-likes">点赞数: {comment.likeCount}</p>
      <button className="del-btn" onClick={() => onDelete(comment.id)}>
        删除
      </button>
    </li>
  );
}

export default Comment;
