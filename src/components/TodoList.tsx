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
            text: 'Wake up',
            completed: true
        },
        {
            id: 2,
            text: 'Get dressed',
            completed: true
        },
        {
            id: 3,
            text: 'Shower',
            completed: true
        },
        {
            id: 4,
            text: 'Cancel onlyfans subscription',
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
        return new Date().toLocaleDateString('en-US', options);
    }

    function clearAll() {
        setTasks([]);
    }

    return (
        <div className="todo-list">
            <h1 className='title'>Todo-list</h1>
            <h3>{getCurrentDate()}</h3>
            <input
                placeholder="New task"
                value={text}
                type='text'
                onChange = { e => setText(e.target.value)}
            />
            
            <button className='add' onClick={() => addTask(text) }>+</button>
            <button onClick={() => clearAll() }>Clear all</button>

            {tasks.map(task => (
                <TodoItem
                    key={task.id} 
                    task={task}
                    deleteTask={deleteTask}
                    toggleCompleted={toggleCompleted}
                />
            ))}
            {tasks.length > 0 &&  
                <p>You have {tasks.length} pending tasks.</p>
            }
        </div>
    );
}

export default TodoList;