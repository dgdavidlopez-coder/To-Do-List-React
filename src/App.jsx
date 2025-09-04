//Creamos los componentes
import { useState, useEffect } from "react";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";

export default function App() {
	//Recuperamos tareas del localStorage al inciar
	const [todos, setTodos] = useState(() =>{
		const saved = localStorage.getItem("todos");
		return saved ? JSON.parse(saved) : [];
	});

	const [filter, setFilter] = useState("all"); //all, active, completed

	//Guardamos tareas en locaStorage cada vez que cambian
	useEffect(() => {
		localStorage.setItem("todos", JSON.stringify(todos));
	}, [todos]);

	const addTodo = (text) =>{
		const newTodo = { id: Date.now(), text, completed: false };
		setTodos([...todos, newTodo]);
	};

	const toggleTodo = (id) => {
		setTodos(todos.map(todo => 
			todo.id === id ? { ...todo, completed: !todo.completed } : todo
			)
		);
	};

	const deleteTodo = (id) => {
		setTodos(todos.filter(todo => todo.id !== id));
	};

	//Filtrar tareas segun el filtro seleccionado
	const filteredTodos = todos.filter(todo =>{
		if (filter === "completed") return todo.completed;
		if (filter === "pending") return !todo.completed;
		return true; //all
	});
	
	//Contador de tareas pendientes
	const pendingCount = todos.filter(todo => !todo.completed).length;

	return (
		<div className="container py-5">
			<div className="card shadow-lg mx-auto" style={{ maxWidth: "600px" }}>
				<div className="card-body">
					<h1 className="card-title text-center mb-4">
						<span role="img" aria-label="clipboard">📝</span> Lista de Tareas
					</h1>
					<TodoForm addTodo={addTodo} />
					<div className="mb-3 d-flex justify-content-between align-items-center flex-wrap">
						<div className="btn-group mb-2">
							<button 
								className={`btn btn-outline-primary ${filter === "all" ? "active" : ""}`}
								onClick={() => setFilter("all")}
							>
								Todas
							</button>

							<button
								className={`btn btn-outline-success ${filter === "completed" ? "active" : ""}`}
								onClick={() => setFilter("completed")}
							>
								Completadas
							</button>

							<button
								className={`btn btn-outline-warning ${filter === "pending" ? "active" : ""}`}
								onClick={() => setFilter("pending")}
							>
								Pendientes
							</button>
						</div>

						<div className="mb-2">
							<span className="badge bg-info text-dark fs-6">
								Pendientes: {pendingCount}
							</span>
						</div>
					</div>

					<TodoList todos={filteredTodos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
				</div>
			</div>
		</div>
	);
}