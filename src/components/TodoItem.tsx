import { Todo } from "@prisma/client";
import { useState } from "react";
import { trpc } from "src/utils/trpc";

type Props = {
	todo: Todo;
};

const TodoItem = ({ todo }: Props) => {
	// useState<Pick<Todo, "name">>("")
	const [newTodoName, setNewTodoName] = useState<string>(todo.name || "");

	const deleteTodoById = trpc.todo.deleteById.useMutation();
	const editTodo = trpc.todo.edit.useMutation();

	return (
		<form className="space-x-2">
			<input
				key={todo.id}
				value={newTodoName}
				onChange={(e) => setNewTodoName(e.target.value)}
			/>
			<button
				type="submit"
				onClick={() => editTodo.mutate({ id: todo.id, name: newTodoName })}
			>
				Edit
			</button>
			<button type="submit" onClick={() => deleteTodoById.mutate(todo.id)}>
				Delete
			</button>
		</form>
	);
};

export default TodoItem;
