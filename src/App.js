import React, {useState, useEffect} from 'react';
import TodoList from './TodoList';

export default function App() {

	const [todos, setTodos]  = useState([
		{id: 1, completed: false, title: 'buy bread'},
		{id: 2, completed: true, title: 'buy butter'},
		{id: 3, completed: false, title: 'buy milk'}	
	]);
	const [todoTitle, setTodoTitle] = useState('');
	
	// Invoke only 1 time
	useEffect(() => {
		const raw = localStorage.getItem('todos') || [];
		setTodos(JSON.parse(raw));
	}, []);
	// Invoke every time when changes todos array
	useEffect(() => {
		localStorage.setItem('todos', JSON.stringify(todos));
		console.log('change Todos');
	}, [todos]);

	const addTodo = event => {
		if(event.key === 'Enter') {
			setTodos([
				...todos,
				{
					id: Date.now(),
					title: todoTitle,
					completed: false
				}
			]);
			setTodoTitle('');
		}
	};

	return (
		<div className='container'>
			<h1>Todo app</h1>

			<div className='input-field'>
				<input 
					type='text'
					value={todoTitle}
					onChange={event => setTodoTitle(event.target.value)}
					onKeyPress={addTodo}
				/>
				<label>Todo name</label>
			</div>

			<TodoList todos={todos}/>
		</div>
	);
}

