import { useState } from "react";
import Button from "./Button";

export default function TodoList() {

    const [newTodo, setNewTodo] = useState('')
    const [todos, setTodos] = useState([])
    const [editingIndex, setEditingIndex] = useState(null)
    const [editedToDo, setEditedTodo] = useState('')

    function addNewTask(e){

        if(!newTodo){
            alert('Please enter a task!')
            return
        }

        setTodos( [...todos, newTodo] )

        setNewTodo('')

    }

    function deleteItem(index){
        // setTodos( todos.filter( (item,i) => i !== index ) )

        setTodos( [...todos.slice(0,index), ...todos.slice(index+1)] )

        // todos.splice(index, 1)
        // const newTodos = [...todos]
        // setTodos( newTodos )

    }

    function editItem(index){
        setEditingIndex(index)
        setEditedTodo( todos[index] )
    }

    function handleSave(){
        setTodos([
            ...todos.slice(0, editingIndex),
            editedToDo,
            ...todos.slice(editingIndex+1)
        ])
        setEditingIndex(null)
    }

    return (
        <>
            <h1>My Todo List</h1>

            <input 
                type="text" 
                placeholder="Write your task here..." 
                value={newTodo}
                onChange={e => setNewTodo( e.target.value )}
            />

            <Button onClickFunction={addNewTask}/>

            <ul>
                {todos.map( (todo,index) => { 
                    return ( 

                        <li key={index}>
                            {editingIndex !== index ? (
                                    <>
                                        {todo}{' '} 
                                        <button onClick={() => deleteItem(index)}>DELETE</button> 
                                        <button onClick={() => editItem(index)}>UPDATE</button> 
                                    </>
                                ) 
                                :(
                                    <>
                                        <input 
                                            type="text" 
                                            value={editedToDo} 
                                            onChange={ e => setEditedTodo( e.target.value ) }
                                        />
                                        <button onClick={handleSave}>Save State!</button>
                                     </>     
                                )
                        
                            }
                            
                        </li>
                    )    
                })}
            </ul>
        </>
    );
}