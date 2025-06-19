import { useState } from 'react';
import { useEffect } from 'react';
import './App.css'
import Header from './components/Header'
import ToDoList from './components/ToDoList'

const API_URL = import.meta.env.VITE_API_URL;



function App() {
  const [todos, setTodos] = useState([]);
  const [newTask, setNewTask] = useState("");

  // ✅ FETCH TODOS FROM BACKEND ON LOAD
  useEffect(() => {
    async function fetchTodos() {
      try {
        const response = await fetch(`${API_URL}/api/todo`);
        const data = await response.json();

        const mappedTodos = data.map(todo => ({
          id: todo._id,
          text: todo.title,
          completed: todo.completed
        }));

        setTodos(mappedTodos);
      } catch (err) {
        console.error("Failed to fetch todos:", err);
      }
    }

    fetchTodos();
  }, []);



  async function addTask() {
    if (newTask === "") return;
    try {
      const response = await fetch(`${API_URL}/api/todo`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: newTask.trim(),
          completed: false,
        }),
      });

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        // Optional: append the new task locally (or refetch all)
        const newTodo = {
          // id: Date.now(), // local ID (ideally use backend ID)
          text: newTask.trim(),
          completed: false,
        };
        setTodos([...todos, newTodo]);
        setNewTask("");
      } else {
        alert("Failed to save task: " + data.error);
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  }

  const toggleCompletion = async (id) => {
    try {
      const res = await fetch(`${API_URL}/api/todo/${id}/toggle`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" }
      })
      const updated = await res.json()
      setTodos(todos.map(todo =>
        todo.id === id ? { ...todo, completed: updated.completed } : todo
      ));
    }
    catch (err) {
      console.error("Error:", err.message);
    }
    // .then(res => res.json())
    // .then(updatedTodo => {
    //   setTodos(todos.map(todo => todo.id === updatedTodo.id ? updatedTodo : todo))
    // })
    // .catch(err => console.error("Error Toggling the Todo", err))
  }

  const deleteToDoListItem = async (id) => {
    try {
      const res = await fetch(`${API_URL}/api/todo/${id}`, {
        method: "DELETE"
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to Delete');
      setTodos(todos.filter(todo => todo.id !== id))
      console.log("Deleted successfully:", data);
    }
    catch (err) {
      console.error("Error:", err.message);
    }
  }

  const editTodoListItem =async (id, newText) => {
    try{
      let res = await fetch(`${API_URL}/api/todo/${id}`, {
        method: "PATCH",
        headers : {"Content-Type" : "application/json"},
        body: JSON.stringify({ title: newText })
      })
      let data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to Delete');
      setTodos(todos.map(todo => todo.id === id ? {...todo, text: data.title} : todo))
    }
    catch(err){
      console.error("Error:", err.message);
    }
    // setTodos(todos.map(todo => todo.id === id ? { ...todo, text: newText } : todo));
  };


  return (
    <div className=' w-full h-screen'>
      <Header />
      <div className='flex items-center justify-center my-8'>
        <div className='flex justify-between p-2 border-2 w-[33%] rounded-xl border-blue-300 bg-gray-300'>
          <input className='px-3 outline-none w-full text-xl' type="text" value={newTask} placeholder='Add Your Task...' onChange={(e) => setNewTask(e.target.value)} />
          <button className='w-30 p-2 rounded-xl font-bold bg-blue-600 cursor-pointer hover:text-white hover:bg-green-600 shadow duration-300' onClick={addTask}>Add Task</button>
        </div>
      </div>
      <ToDoList todos={todos} onToggle={toggleCompletion} onDeleteItem={deleteToDoListItem} onEditItem={editTodoListItem} />
    </div>
  )
}

export default App;
