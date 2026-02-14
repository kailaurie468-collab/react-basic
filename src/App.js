import logo from './logo.svg';
import './App.css';


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
    </div>
  );
}

export default App;
