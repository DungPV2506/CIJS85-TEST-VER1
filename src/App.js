import './App.css';
import { Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import TaskItem from './components/TaskItem';

function App() {

  //trang thai mang

  const [taskListState, setTaskListState] = useState();

  // init

  const [taskArr, setTaskArr] = useState(() => {
    let taskData = JSON.parse(localStorage.getItem('listTask')) || [
      {
        id: 1,
        name: 'Default completed task',
        isCompleted: true,
      },
      {
        id: 2,
        name: 'Default incompleted task',
        isCompleted: false,
      }
    ];
    return taskData;
  });

  const [taskActive, setTaskActive] = useState([]);
  const [taskComplete, setTaskComplete] = useState([]);

  const [tempTaskList, setTempTaskList] = useState([]);


  //add

  const [newTask, setNewTask] = useState({})

  const addTask = () => {
    console.log('add a task');
    setTaskArr([...taskArr, newTask]);
    console.log(taskArr);
    localStorage.setItem(
      'listTask',
      JSON.stringify([...taskArr, newTask])
    );
  }

  const handleChangeInput = (event) => {

    console.log(event.target.value);
    setNewTask({
      id: taskArr.length + 1,
      name: event.target.value,
      isCompleted: false,
    })
  }

  //update

  //delete

  const handleDeleteTask = (id) => {
    console.log('chay delete')
    const taskArrAfterDelete = taskArr.filter(
      (element) => {
        if (element.id !== id)
          return element;
      }
    );

    setTaskArr(taskArrAfterDelete);
    console.log(taskArr);
    localStorage.setItem('listTask', JSON.stringify(taskArrAfterDelete));
  };

  useEffect(() => {
    if (taskListState == 'active') {
      setTaskActive(() => {
        taskArr.filter(
          (element) => {
            if (element.isCompleted == false)
              return element;
          }
        );
      });

      console.log("active", taskActive);
      setTempTaskList(taskActive);
      localStorage.setItem('listTaskActive', JSON.stringify(taskActive));
    }

    if (taskListState == 'completed') {
      setTaskComplete(() => {
        taskArr.filter(
          (element) => {
            if (element.isCompleted == true)
              return element;
          }
        );
      })

      console.log("completed", taskComplete);
      setTempTaskList(taskComplete);
      localStorage.setItem('listTaskComplete', JSON.stringify(taskComplete));
    }

    setTempTaskList(taskArr);
    localStorage.setItem('listTask', JSON.stringify(taskArr));

    // console.log('IT JUST WORK !')
  }, [taskListState]);

  //change list render

  return (
    <div className="App">
      <h1>#todo</h1>

      <div>
        <button onClick={() => setTaskListState('all')}>All</button>
        <button onClick={() => setTaskListState('active')}>Active</button>
        <button onClick={() => setTaskListState('completed')}>Complete</button>
      </div>




      <div className='add-field'>
        <input type='text' placeholder='Add tasks here!' onChange={handleChangeInput}></input>

        <button onClick={addTask}>Add</button>
      </div>
      <div className='task-list'>

        {
          taskArr.map((task) => {
            return (
              <TaskItem isCompleted={task.isCompleted}
                name={task.name} onDelete={handleDeleteTask} id={task.id}
              ></TaskItem>
            )
          })

        }
       
      </div>

    </div>
  );
}

export default App;
