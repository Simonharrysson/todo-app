import { useState } from 'react';
import TodoItem from './TodoItem';

// Define the type of the task
interface Task {
    id: number;
    text: string;
    completed: boolean;
}

function TodoList() {
    const [tasks, setTasks] = useState<Task[]>([
        {
            id: 1,
            text: 'Doctor Appointment',
            completed: true
        },
        {
            id: 2,
            text: 'Meeting at School',
            completed: false
        }
    ]);

    const [text, setText] = useState<string>('');

    function addTask(text: string) {
        const newTask = {
            id: Date.now(),
            text,
            completed: false
        };
        setTasks([...tasks, newTask]);
        setText('');
    }

    function deleteTask(id: number) {
        setTasks(tasks.filter(task => task.id !== id));
    }

    function toggleCompleted(id: number) {
        setTasks(tasks.map(task => {
            if (task.id === id) {
                return { ...task, completed: !task.completed };
            } else {
                return task;
            }
        }));
    }
    
    const getCurrentDate = () => {
        const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return new Date().toLocaleDateString(undefined, options);
    }

    return (
        <div className="todo-list">
            <h1>My Todo-list</h1>
            <h3>{getCurrentDate()}</h3>
            {tasks.map(task => (
                <TodoItem
                    key={task.id} 
                    task={task}
                    deleteTask={deleteTask}
                    toggleCompleted={toggleCompleted}
                />
            ))}
            <input
                placeholder="What's on your mind?"
                value={text}
                type='text'
                onChange = { e => setText(e.target.value)}
            />
            <button onClick={() => addTask(text) }>+</button>
        </div>
    );
}

export default TodoList;