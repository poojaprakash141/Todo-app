import { useEffect, useState } from "react"
import styles from './styles.module.css'
export default function Todoapp() {
const[task, Settask] = useState('');
const[err,seterr]=useState('')
const[edit,setedit]=useState(null)
const[list,setlist]=useState([])
const handlesumit=()=>{
  if (task.trim() === '') {
  alert("Please write a task before adding!");
  return;
};
if(edit===null){
setlist (prev=>[...prev,task])
Settask('')
seterr('')
console.log("task added",task);
console.log("previous task",list)}
else {
const newtask =[...list]
newtask[edit]=task
setlist(newtask)
setedit(null)
}
}
const deletebutton = (id) => {
  console.log("ID passed to deletebutton:", id);

  setlist(
    list.filter((item, index) => {
      console.log(`Inside filter: current index = ${index}, id = ${id}`);
      return index !== id;
    })
  );
};
const editbutton=(index)=>{
  // 1. Log the index you clicked:
  console.log("📝 Edit clicked for index:", index);

  // 2. Log the task text you’re about to load:
  console.log("📝 Task content:", list[index]);

  // 3. Now actually load it into your input and enter edit mode:
  Settask(list[index]);
  setedit(index);
};

 useEffect(() => {
  const getdata = JSON.parse(localStorage.getItem("name"));
  console.log("Loaded from localStorage getdata:", getdata);
  if (getdata) {
    setlist(getdata);
  }
}, []);
localStorage.clear()
useEffect(()=>{
  console.log("Loaded from localStorage setting data:", list);
 localStorage.setItem("name",JSON.stringify(list))},[list])
return (

<div className={styles.container}><h1>Make It Happen</h1>
 <div className={styles.flex}>
 <input className={styles.input} type="text"value={task}onChange={(e) => Settask(e.target.value)}name="input" placeholder="what is your task" required/>
 <button  className={styles.button}onClick={handlesumit}>Add Task</button>
 {err && <p style={{ color: 'red' }}>{err}</p>}
 </div>
{list.map((item,index)=>( 
<div key={index} className={styles.map} style={{width:"400px", height:"50px"}}>
<ol > <li >{item} </li>
<div className={styles.btn}>
<button  className={styles.button2} onClick={()=>editbutton(index)}>📝</button>
<button  className={styles.button3} onClick={()=>deletebutton(index)}>🗑️</button>
</div>
</ol> 
</div>))}
</div>)
}