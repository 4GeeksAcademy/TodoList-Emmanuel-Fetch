import React, {useState, useEffect} from "react";
import styles from "./List.module.css";

const List = () => {
    const [inputValue, setInputValue] = useState("");
    const [items, setItems] = useState(["No tasks, add a task"]);
    const [count, setCount] = useState(0);
    
    

    const addItem = () => {
        if (inputValue !== ""){
            if(items == "No tasks, add a task"){
            setItems(items.shift())}

            setItems([...items, inputValue]);
            setInputValue("");
            
            
        }
        if(inputValue == ""){
            alert("Enter a valid task");
        }  
        
    };
  
    useEffect(() => {
        setCount(items.length);
}, [items]);

    const handlePress = (e) =>{
        if(e.key === "Enter"){
            addItem();
        }
        if(e.key === "Enter" && inputValue == ""){
            alert("Enter a valid task");
        }
    }

    const deleteValue = (index) => {
        setItems((prevItems) => prevItems.filter((_, i) => i !== index));
      };
      

    
	return (
      
        <div className={styles.app}>
            <li className={`list-group-item ${styles.li}`} >  <div className={` ${styles.count}`}>Number of tasks: </div><div>{count}</div>  </li>
                

            <input placeholder="Write your task" onKeyDown={(e) => handlePress(e)} type="text" value= {inputValue} onChange={(e)=> setInputValue(e.target.value)}/>
            <button onClick={addItem}>Add task</button>
            <ul class="list-group">
                {items.map((item,index)=>{
                    
                    return<li className={`list-group-item ${styles.li}`} key={index}>{item} <i onClick={() => deleteValue(index)}
                   class="fa-solid fa-square-xmark"></i>  </li> 
})}


            
            </ul>
        </div>
	);
};

export default List;