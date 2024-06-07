
// Define the type for the task prop
interface Task {
    id: number;
    text: string;
    completed: boolean;
}

// Define the type for the props
interface TodoItemProps {
    task: Task;
    deleteTask: (id: number) => void;
    toggleCompleted: (id: number) => void;
}

const TodoItem = ({ task, deleteTask, toggleCompleted }: TodoItemProps) => {
    function handleChange() {
        toggleCompleted(task.id);
    }

    return (
        <div id={String(task.id)} className="todo-item">
            <input 
                type="checkbox"
                checked={task.completed}
                onChange={handleChange}
            />
            <p className={task.completed ? 'completed' : ''}>{task.text}</p>
            <button onClick={() => deleteTask(task.id)}>
                X
            </button>
        </div>
    );
}

export default TodoItem;
