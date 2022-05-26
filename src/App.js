// import logo from './logo.svg';
import './App.css';
import Todo from './components/Todo';

function App() {

  const Todos = async () =>{
    // let res=await fetch("http://localhost:8000/todos")
    // let data=await res.json();
    // console.log(data);
  }

  return (
    <div className="App">
      <Todo/>
    </div>
  );
}

export default App;
