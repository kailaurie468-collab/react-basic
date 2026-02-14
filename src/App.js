import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

const str = 'Hello, React!';
const add = (a, b) => a + b;
const arr = [
  {id: 1, name: 'Alice'},
  {id: 2, name: 'Bob'},
  {id: 3, name: 'Charlie'}
]

// jsx  语法：在js中写html标签
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
      </header>
      {str}
      {/* 调用函数 显示返回值 */}
      <hr/>
      {add(1, 2)}
      {/* 使用js对象 object */}
      <p style={{color: 'red'}}>This paragraph is red.</p>
      <ul>
        {arr.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
      {/* 实现条件渲染 */}
      {arr.length > 2 && <p>There are more than 2 items in the array.</p>}
      {arr.length > 0 ? (
        <span>There are {arr.length} items in the array.</span>
      ) : (
        <p>The array is empty.</p>
      )}
      {/* 把 handleClick 这个函数的**本体（引用）**交给了 React。 */}
      <button onClick={handleClick}>Click me</button>
      {/* function() 会立刻执行 并将结果返回 所以这里需要用lambda传递函数本身 */}
      <button onClick={() => handleClick1('Bob')}>Click me too</button>
      <button onClick={(event) => handleClick2('Alice', event)}>Click me too</button>
      <Counter className="my-counter" string={str}/>
      <ExitObject/>
    </div>
  );
}

const handleClick = (event) => {
  console.log('Button clicked:', event);
  // alert('Button was clicked!');
}

  const handleClick1 = (name) => {
    console.log('Button clicked:', name);
  }
const handleClick2 = (name, event) => {
  console.log('Button clicked:', name, event);
  // alert(`Hello, ${name}!`);
}

// 函数自定义组件 使用useState 进行状态管理
const Counter = (props) => {
  const [count, setCount] = useState(0);
  return (
    <div className={props.className}>
      <p className='subP'>Count: {count}</p>
      <p>{props.string}</p>
      {/* 使用新值替换旧值 直接修改count 无法渲染到视图 */}
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(count - 1)}>Decrement</button>
    </div>
  );
}

const ExitObject = () => {
  const [obj, setObj] = useState({name: 'Alice', age: 25});
  const updateName = () => {
    // setObj({name: 'Bob'});  // 这种写法会覆盖掉age属性
    setObj(prevObj => ({...prevObj, age: prevObj.age + 1})); // 使用函数式更新 保留其他属性
    // setObj({
    //   ...obj,
    //   age: obj.age + 1,
    // })
  }
  return (
    <div>
      <p>Name: {obj.name}, Age: {obj.age}</p>
      <button onClick={updateName}>Update Age</button>
    </div>
  );
}
export default App;
