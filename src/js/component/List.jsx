import React, {useState, useEffect} from "react";
import styles from "./List.module.css";

const List = () => {
    const [inputValue, setInputValue] = useState({label:"",done:false});
    const [items, setItems] = useState([""]);
    const [count, setCount] = useState(0);
    
    
    const postData = async() => {

        try{
            
            const url =`https://assets.breatheco.de/apis/fake/todos/user/emmanuel`;
            const response = await fetch(url, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify(items)
            });
            if (!response.ok){
                throw new Error('Error request');
            }
            const data = await response.json();
            console.log('Respuesta', data);
        }catch (error){
            console.log('Error al postear:', error);
        }
    };

    const createUser = async() => {

        try{
           
            const url =`https://assets.breatheco.de/apis/fake/todos/user/emmanuel`;
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify([])
            });
            if (!response.ok){
                throw new Error('Error request');
            }
            const data = await response.json();
            console.log('Respuesta', data);
        }catch (error){
            console.log('Error al crear usuario, ya existe :', error);
        }
    };

    const getData = async () => {
        try {
          const response = await fetch(
            "https://assets.breatheco.de/apis/fake/todos/user/emmanuel"
          );
          const data = await response.json();
          setItems(data);
        } catch (error) {
          console.log(error);
        }
      };



    useEffect(() => {
        if(!createUser){
        createUser();
        }
        getData();
    }, [])

    useEffect(() => {
        postData();
    }, [items])

    const addItem = async(e) => {
        if (e.key === "Enter" && inputValue.trim() !== "") {
            setItems([...items, { label: inputValue, done: true }]);
            setInputValue({label:"",done:false});
          }if ((e.key === "Enter" && inputValue.trim() == "")||(e.type === "click" && inputValue.label == "")) {
            alert("insert a valid value")
          }
}
        
    useEffect(() => {
        setCount(items.length);
}, [items]);

    

    const deleteValue = async(index) => {
        setItems((prevItems) => prevItems.filter((_, i) => i !== index));
        if (items.length == 0){
            handleRemoveLastItem()
        }
      };

      const handleRemoveLastItem = async() => {
        const newArray = myArray.slice(0, -1); // Crea una nueva instancia del array sin el último elemento
        setItems(newArray); // Actualiza el estado con el nuevo array
      };
      

    
	return (
      
        <div className={styles.app}>
            <li className={`list-group-item ${styles.li}`} >  <div className={` ${styles.count}`}>Number of tasks: </div><div>{count}</div>  </li>
                

            <input placeholder="Write your task" onKeyUp={addItem} onChange={(e)=>setInputValue(e.target.value)} type="text" value={inputValue.label}/>
            <button onClick={addItem}>Add task</button>
            <ul className="list-group">
                {items.length == 0 ? (<li className={`list-group-item ${styles.li}`}>No tasks, add a task</li>)
                :(items.map((item,index)=>(
                    
                    <li className={`list-group-item ${styles.li}`} key={index} >{item.label} <i onClick={() => deleteValue(index)}
                   className="fa-solid fa-square-xmark"></i></li> 

)))}


            
            </ul>
        </div>
	);
};

export default List;
