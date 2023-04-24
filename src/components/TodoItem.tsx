import { Todo } from "@prisma/client";
import { Button } from "@ui/Button";
import { useState } from "react";
import { trpc } from "src/utils/trpc";

type Props = {
	todo: Todo;
};

const TodoItem = ({ todo }: Props) => {
	// useState<Pick<Todo, "name">>("")
	const [newTodoName, setNewTodoName] = useState<string>(todo.name || "");

	const deleteTodoById = trpc.todo.deleteById.useMutation();
	const editTodoById = trpc.todo.editById.useMutation();

	return (
		<form className="flex items-stretch w-full">
			<input
				className="flex-1 border rounded rounded-r-none outline-0"
				key={todo.id}
				value={newTodoName}
				onChange={(e) => setNewTodoName(e.target.value)}
			/>
			<Button
				className="rounded-l-none rounded-r-none"
				type="submit"
				onClick={() => editTodoById.mutate({ id: todo.id, name: newTodoName })}
			>
				Edit
			</Button>
			<Button
				className="rounded-l-none"
				type="submit"
				onClick={() => deleteTodoById.mutate(todo.id)}
			>
				Delete
			</Button>
		</form>
	);
};

export default TodoItem;
