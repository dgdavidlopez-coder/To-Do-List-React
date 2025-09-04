import { FaTrash, FaCheck} from "react-icons/fa";

export default function TodoList({ todos, toggleTodo, deleteTodo }) {
	if(todos.length === 0) 
		return <p className="text-center text-muted mt-3">No hay tareas 😅</p>;

	return (
		<ul className="list-group">
			{todos.map((todo) => (
				<li 
					key={todo.id} 
					className={`list-group-item d-flex justify-content-between align-items-center ${todo.completed ? "list-group-item-success" : ""
					}`}
					style= {{transition: "background-color 0.3s ease"}}
				>
					<span
						onClick={() => toggleTodo(todo.id)}
						className={` flex-grow-1 ms-2 ${
							todo.completed ? "text-decoration-line-through" : ""
						}`}
						style={{ cursor: "pointer" }}
					>
						{todo.text}
					</span>
					<div className="d-flex gap-2">
						<button 
							onClick={() => toggleTodo(todo.id)} 
							className={`btn btn-sm ${todo.completed ? "btn-secondary" : "btn-success"}`}>
							<FaCheck />
						</button>
						<button onClick={() => deleteTodo(todo.id)} className="btn btn-danger btn-sm">
							<FaTrash />
						</button>
					</div>
				</li>
			))}
		</ul>
	);
}