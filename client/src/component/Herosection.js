import '../index.css'
import { useEffect, useState } from 'react';
import { makeStyles, Typography } from '@material-ui/core';

const api_base = 'http://localhost:3001';

const useStyles = makeStyles((theme) => ({
	app: {
		padding: 32,
		marginTop: 110
	},
	h1: {
		fontSize: 40,
		fontWeight: 500,
		marginBottom: 32,
		fontFamily: "'Mochiy Pop P One', sans-serif"
	},
	h4: {
		fontSize: 18,
		color: '#61759b',
		textTransform: 'uppercase',
		fontWeight: 400,
		marginBottom: 16,
		fontFamily: "'Mochiy Pop P One', sans-serif"
	},
	todo: {
		position: 'relative',
		backgroundColor: '#f73378',
		padding: '16px',
		borderRadius: '16px',
		display: 'flex',
		alignItems: 'center',
		transition: '0.5s',
		cursor: 'pointer',
		marginBottom: '16px',
		color: 'white',
		fontFamily: "'Mochiy Pop P One', sans-serif",
		"&:hover": {
			opacity: 0.8
		}
	},
	text: {
		fontSize: 20,
	},
	deleteTodo: {
		position: 'absolute',
		top: '50%',
		transform: 'translateY(-50%)',
		right: 16,
		color: "#EEE",
		width: 24,
		height: 24,
		borderRadius: '50%',
		backgroundColor: '#AF1E2D',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		fontWeight: '700'
	},
	addPopup: {
		position: 'fixed',
		bottom: 32,
		right: 32,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		width: 64,
		height: 64,
		borderRadius: 999,
		fontSize: 28,
		fontWeight: 900,
		color: "#EEE",
		backgroundColor: "#D81E5B",
		backgroundImage: "linear-gradient(to bottom right, #D81E5B, #8A4EFC)",
		cursor: 'pointer',
	},
	popup: {
		position: 'fixed',
		top: '50%',
		left: '50%',
		transform: "translate(-50%, -50%)",
		width: '100%',
		maxWidth: 400,
		backgroundColor: "#EEE",
		padding: 32,
		borderRadius: 16,
		boxShadow: "0px 4px 32px #131A26"
	},
	closePopup: {
		position: 'absolute',
		top: 16,
		right: 16,
		width: 20,
		height: 20,
		fontSize: 20,
		color: "#131A26",
		cursor: 'pointer'
	},
	h3: {
		color: "#131A26",
		marginBottom: 16,
		fontWeight: 400,
		textTransform: 'uppercase',
		fontFamily: "'Mochiy Pop P One', sans-serif"
	},
	addtodoinput: {
		appearance: 'none',
		outline: 'none',
		border: 'none',
		backgroundColor: '#FFF',
		padding: 16,
		borderRadius: 16,
		width: '100%',
		boxShadow: "0px 2px 24px rgba(0, 0, 0, 0.2)",
		fontSize: 20
	},
	button: {
		padding: '16px 32px',
		borderRadius: 999,
		backgroundImage: "linear-gradient(to right, #D81E5B, #8A4EFC)",
		display: 'inline-block',
		fontWeight: 700,
		textTransform: 'uppercase',
		fontSize: 18,
		marginTop: 16,
		textAlign: 'center',
		cursor: 'pointer',
		color: 'white',
		fontFamily: "'Mochiy Pop P One', sans-serif"
	}


}))

function Herosection() {

	const classes = useStyles();

	const [todos, setTodos] = useState([]);
	const [popupActive, setPopupActive] = useState(false);
	const [newTodo, setNewTodo] = useState("");

	useEffect(() => {
		GetTodos();
	}, []);

	const GetTodos = () => {
		fetch(api_base + '/todos')
			.then(res => res.json())
			.then(data => setTodos(data))
			.catch((err) => console.error("Error: ", err));
	}

	const completeTodo = async id => {
		const data = await fetch(api_base + '/todo/complete/' + id).then(res => res.json());

		setTodos(todos => todos.map(todo => {
			if (todo._id === data._id) {
				todo.complete = data.complete;
			}

			return todo;
		}));

	}

	const addTodo = async () => {
		const data = await fetch(api_base + "/todo/new", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				text: newTodo
			})
		}).then(res => res.json());

		setTodos([...todos, data]);

		setPopupActive(false);
		setNewTodo("");
	}

	const deleteTodo = async id => {
		const data = await fetch(api_base + '/todo/delete/' + id, { method: "DELETE" }).then(res => res.json());

		setTodos(todos => todos.filter(todo => todo._id !== data.result._id));
	}

	return (



		<div className={classes.app}>
			<Typography variant='h3' className={classes.h1}>Welcome, User!!!</Typography>
			<Typography variant='h5' className={classes.h4}>Your tasks</Typography>

			<div className={classes.todos}>
				{todos.length > 0 ? todos.map(todo => (
					<div className={
						"todo" + (todo.complete ? " is-complete" : "")
					} key={todo._id} onClick={() => completeTodo(todo._id)}>
						<div className="checkbox"></div>

						<div className="text">{todo.text}</div>

						<div className="delete-todo" onClick={() => deleteTodo(todo._id)}>x</div>
					</div>
				)) : (
					<Typography variant='h5' style={{fontFamily: "'Mochiy Pop P One', sans-serif"}}>You currently have no tasks</Typography>
				)}
			</div>

			<div className={classes.addPopup} onClick={() => setPopupActive(true)}>+</div>

			{popupActive ? (
				<div className={classes.popup}>
					<div className={classes.closePopup} onClick={() => setPopupActive(false)}>X</div>
					<div className={classes.content}>
						<Typography variant='h5' className={classes.h3}>Add Task</Typography>
						<input type={classes.text} className={classes.addtodoinput} onChange={e => setNewTodo(e.target.value)} value={newTodo} />
						<div className={classes.button} onClick={addTodo}>Create Task</div>
					</div>
				</div>
			) : ''}
		</div>
	);
}

export default Herosection;