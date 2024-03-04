import { useSelector } from "react-redux";
import TodoItem from "./TodoItem";
import { Box } from "@mui/material";

const TodoList = () => {
    const todos = useSelector((state) => state.todos.todos);
    const filter = useSelector((state) => state.todos.filter);

    let filteredTodos = todos;
    if (filter === "completed") {
        filteredTodos = todos.filter((todo) => todo.completed);
    } else if (filter === "pending") {
        filteredTodos = todos.filter((todo) => !todo.completed);
    }
    return (
        <Box
            m="0 auto"
            mt="50px"
            display="flex"
            gap="5px"
            flexDirection="column"
            alignItems="flex-start"
            maxWidth="500px"
        >
            {filteredTodos.map((todo) => (
                <TodoItem key={todo.id} {...todo} />
            ))}
        </Box>
    );
};
export default TodoList;
