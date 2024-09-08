import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import "./App.css"


function TodoApp() {
  const {register, handleSubmit, resetField, formState : { errors }} = useForm();
  const [todos, setTodos] = useState(() => {
    const localValue = localStorage.getItem("ITEMS")
    if(localValue == null) {
      return []
    }
    return JSON.parse(localValue)
  })

  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(todos));
  }, [todos])


  const onSubmit = data => {
    setTodos(currTodos => {
      return [
        ...currTodos, 
        {
          id: crypto.randomUUID(), 
          task: data.task, 
          completed: false
        }
      ]
    })
    resetField("task")
  }


  const toggleCheckbox = (id, completed) => {
    setTodos(currTodos => {
      return currTodos.map(todo => {
        if(todo.id === id) {
          return {...todo, completed}
        }
        
        return todo
      })
    })
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("task", {required: 'A task is needed.'})} placeholder='task' />
        <input type='submit' />
      </form>
      {errors.task && <p>{errors.task.message}</p>}


      <ul>
        {todos.map(todo => {
          return(
            <li key={todo.id} className={todo.completed ? 'completed' : ''} >
              <label>
                {todo.task}
                <input 
                  type='checkbox'
                  checked={todo.completed}
                  onChange={e => toggleCheckbox(todo.id, e.target.checked)}
                /> 
              </label>
            </li>
          )
        })}
      </ul>

       {todos.length > 0 && <button onClick={() => setTodos([])}>Delete All</button>}
    </>
  )
}

export default TodoApp
