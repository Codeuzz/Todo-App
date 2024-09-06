import { useState } from 'react';
import { useForm } from 'react-hook-form'


function App() {
const {register, handleSubmit} = useForm();
const [todos, setTodos] = useState([]);

  return (
    <>
      <form onSubmit={handleSubmit((data) => {
        setTodos(currTodos => [...currTodos, {task : data.task, completed: false}])
        console.log(data);
        console.log(todos)

      })}>
        <input {...register("task")} placeholder='task' />
        <input type='submit' />
      </form>
      <ul>
        {todos.map(todo => {
          return(
            <>
            <li>{todo.task}
              <label>
                <input 
                  type='checkbox'
                  checked={todo.completed} 
                /> 
              </label>
            </li>
           </>
          )
        })}
      </ul>
    </>
  )
}

export default App
