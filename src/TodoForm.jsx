import { useState } from "react";

export default function TodoForm({ addTodo }) {
	const [text, setText] = useState("");

	const handleSubmit = (e) =>{
		e.preventDefault();
		if (text.trim()){
			addTodo(text);
			setText("");
		}
		
	}

	return (
		<form onSubmit={handleSubmit} className="d-flex mb-3 animate__animated animate__fadeIn">
			<input
				type="text"
				value={text}
				onChange={(e) => setText(e.target.value)}
				className="form-control me-2"
				placeholder="Escribe nueva tarea..."	
			/>
			<button type="submit" className="btn btn-primary">Añadir</button>
		</form>
	);
};