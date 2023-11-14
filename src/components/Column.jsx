import { useStore } from '../store.js'
import { shallow } from 'zustand/shallow'
import './Column.css'
import Task from './Task'
import { useState } from 'react'
import classNames from 'classnames'

function Column({ state }) {
  const [text, setText] = useState('')
  const [open, setOpen] = useState(false)
  const [drop, setDrop] = useState(false)
  const tasks = useStore(store => store.tasks.filter((task) => task.state === state), 
  shallow)

  const addTask = useStore(store => store.addTask)
  const setDraggedTask = useStore(store => store.setDraggedTask)
  const draggedTask = useStore(store => store.draggedTask)
  const moveTask = useStore(store => store.moveTask)

  return (
    <div className={classNames("column" , {drop: drop})}
    onDragOver={(e) => {
      setDrop(true)
      e.preventDefault()
    }} 
    onDragLeave={(e) => {
      setDrop(false)
      e.preventDefault()
    }}
    onDrop={() => {
      setDrop(false)
      moveTask(draggedTask, state)
      setDraggedTask(null)
      }}>
      <div className="titleWrapper">
        <p>{state}</p>
        <button onClick={() => setOpen(true)}>Add</button>
      </div>
      {tasks.map((task) => (
        <Task title={task.title} key={task.title} />
      ))}
     {open && <div className='modal'>
        <div className='modalContent'>
          <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
          <button onClick={() => {
            addTask(text, state)
            setText('')
            setOpen(false)
          }}>Submit</button>
        </div>
      </div>}
    </div>
  )
}

export default Column