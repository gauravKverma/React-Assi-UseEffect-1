import React, {useState,useEffect} from 'react'
import styles from "./todo.module.css"
import axios from "axios";

const Todo = () => {
    const [todo,setTodo] = useState([]);
    const [newtodo,setnewtodo]=useState("");
    const [prev,setprev]=useState(1);
    const [totalCount, settotalCount] = useState(0);
    const save =() => {
        fetch("http://localhost:8000/todos",{
            method:"POST",
            headers:{
                "content-type": "application/json",
            },
            body: JSON.stringify({
                value:newtodo,
                isCompleted:false
            }),
        })
        .then((r) => r.json())
        .then((d) => {
            // console.log(newtodo)
            setTodo([...todo,d]);
            setnewtodo("");
        });
    }

    useEffect(()=> {
        const gettodo = async () => {
            let res= await axios.get(`http://localhost:8000/todos?_page=${prev}&_limit=5`);
            console.log(res)
            setTodo(res.data);
            settotalCount(res.headers["x-total-count"]);
        }
        gettodo();
    },[prev]);
    
  return (
    <div className={styles.size}>
        <input type="text" value={newtodo} onChange={({target}) => setnewtodo(target.value)}/>
        <button onClick={save}>Save</button>
        {todo.map((e) =>(
        <div key={e.id}>{e.value}</div>
    ))}
    <button disabled={prev<=1} onClick={()=> {
        if(prev>1){
            setprev(prev-1)}
        }
    }
        >Prev</button>
    <button disabled={prev*5>=totalCount} onClick={()=>setprev(prev+1)}>Next</button>
    </div>
    
  )
}

export default Todo