import { useEffect } from "react";
import { useState } from "react";
import StyledContainer from "../../components/UI/todoButton/Button";
import Input from "../../components/UI/totoInput/Input";
import styled from "styled-components";

const BASU_URL = "https://1d68bf53cde13854.mokky.dev/todo";

const TodoList = () => {
	const [todos, setTodos] = useState([]);
	const [input, setInput] = useState("");
	const [editInput, setEditInput] = useState("");
	const [edit, setEdit] = useState(null);

	//! Get Todos

	const getTodos = async () => {
		try {
			const response = await fetch(BASU_URL);
			const data = await response.json();
			setTodos(data);
		} catch (error) {
			console.error(error);
		}
	};

	//! Post Todos

	const postTodos = async (e) => {
		e.preventDefault();
		const newData = {
			text: input,
			completed: false,
		};
		try {
			const response = await fetch(BASU_URL, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(newData),
			});
			const newTodo = await response.json();
			setTodos([...todos, newTodo]);
			setInput("");
			getTodos();
		} catch (error) {
			console.error(error);
		}
	};

	//! Delete Todos

	const deleteTodo = async (id) => {
		try {
			await fetch(`${BASU_URL}/${id}`, {
				method: "DELETE",
			});
			getTodos();
		} catch (error) {
			console.error(error);
		}
	};

	//! Patch Todos

	const patchTodos = async (id, updatedData) => {
		try {
			await fetch(`${BASU_URL}/${id}`, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(updatedData),
			});
			getTodos();
			if (edit === id) setEdit(null);
		} catch (error) {
			console.error(error);
		}
	};

	const handleEdit = (id, text) => {
		setEdit(id);
		setEditInput(text);
	};

	const handleToggleComplete = async (id, completed) => {
		const updatedData = {
			completed: !completed,
		};
		patchTodos(id, updatedData);
	};

	//! UseEffect TOdos

	useEffect(() => {
		getTodos();
	}, []);

	return (
		<div>
			<Pstyled>Get Things Done!</Pstyled>
			<StyleCard>
				<ContainerStyle>
					<form onSubmit={postTodos}>
						<InputStyled
							type="text"
							value={input}
							onChange={(e) => setInput(e.target.value)}
						/>
						<ButtonStyled type="submit">Add Task</ButtonStyled>
					</form>
					{todos.map((item) => (
						<StyledContainer key={item.id} completed={item.completed}>
							<div>
								{edit === item.id ? (
									<Div>
										<Input
											className="inputEdit"
											type="text"
											value={editInput}
											onChange={(e) => setEditInput(e.target.value)}
										/>
									</Div>
								) : (
									<h1>{item.text}</h1>
								)}
								<CompletedButton
									onClick={() => handleToggleComplete(item.id, item.completed)}>
									{item.completed ? " uncomplete" : " Complete"}
								</CompletedButton>
								{edit === item.id ? (
									<>
										<EditBtn
											onClick={() => patchTodos(item.id, { text: editInput })}>
											Save
										</EditBtn>
										<EditBtn
											style={{ backgroundColor: "grey" }}
											onClick={() => handleEdit(null)}>
											Cancel
										</EditBtn>
									</>
								) : (
									<EditBtn onClick={() => handleEdit(item.id, item.text)}>
										Edit
									</EditBtn>
								)}
								<DeleteButton onClick={() => deleteTodo(item.id)}>
									Delete
								</DeleteButton>
							</div>
						</StyledContainer>
					))}
				</ContainerStyle>
			</StyleCard>
		</div>
	);
};
export default TodoList;

const DeleteButton = styled.button`
	width: 90px;
	height: 30px;
	border-radius: 4px;
	background-color: #f00505;
	color: white;
	border: none;
	&:active {
		box-shadow: 1px 1px 5px red;
	}
`;
const Div = styled.div`
	margin: 10px;
`;
const CompletedButton = styled.button`
	width: 90px;
	height: 30px;
	border-radius: 4px;
	background-color: blue;
	color: white;
	border: none;
	&:active {
		box-shadow: 1px 1px 5px red;
	}
`;

const EditBtn = styled.button`
	width: 90px;
	height: 30px;
	border-radius: 4px;
	background-color: #08c00b;
	color: white;
	border: none;
	margin: 0 20px;
	&:active {
		box-shadow: 1px 1px 5px white;
	}
`;
const StyleCard = styled.div`
	text-align: center;
	display: flex;
	background-color: bisque;
	width: 500px;
	justify-content: center;
	margin-left: 500px;
	border-radius: 4px;
	width: 750px;
	border: 1px solid black;
	margin: 0 auto;
`;

const Pstyled = styled.p`
	font-size: 30px;
	color: grey;
	font-family: monospace;
	font-weight: 300;
	font-weight: 700;
	text-align: center;
`;

const ButtonStyled = styled.button`
	width: 90px;
	text-transform: uppercase;
	font-weight: 700;
	height: 38px;
	border-radius: 4px;
	border: none;
	position: relative;
	left: 20px;
`;
const InputStyled = styled.input`
	width: 300px;
	padding: 10px 25px 10px 25px;
	border-radius: 2px;
	outline: none;
	font-weight: 700;
	border: 1px solid black;
`;
const ContainerStyle = styled.div`
	margin: 30px 0;
`;
