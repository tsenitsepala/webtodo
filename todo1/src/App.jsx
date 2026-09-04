import './App.css'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Row from './Row'

const apiUrl = 'http://localhost:3001'
function App() {
  const [task, setTask] = useState('')
  const [tasks, setTasks] = useState([])
  useEffect(() => {
    axios.get(`${apiUrl}/tasks`)
      .then(response => {
        console.log("DATA:", response.data)
        setTasks(response.data)
      })
      .catch(error => {
        alert(error.response.data ? error.response.data.message : error)
      })
    }, [])

  const addTask = (e) => {
    e.preventDefault()
    const NewTask = {description: task}
    axios.post(`${apiUrl}/tasks`, {task: NewTask})
      .then(response => {
        setTasks(currentTasks => [...currentTasks, response.data])
        setTask('')
      })
      .catch(error => {
        alert(error.response ? error.response.data.error.message : error)
      })
    }
  const deleteTask = (deleted) => {
    axios.delete(`${apiUrl}/tasks/${deleted}`)
      .then(response => {
        setTasks(currentTasks =>
          currentTasks.filter(item => item.id !== deleted)
        )
      })
      .catch(error => {
        alert(error.response ? error.response.data.error.message : error)
      })  
  }

 return (
<div id="container">
  <h3>Todos</h3>

  <form onSubmit={addTask}>
    <input 
    placeholder='Add new task'
    value={task}
    onChange={(e) => setTask(e.target.value)} 
    />
  </form>

  <ul>
  {tasks.map(item => (
      <Row key={item.id} task={item} onDelete={deleteTask} />
    ))}
  </ul>
</div>
  )
}

export default App