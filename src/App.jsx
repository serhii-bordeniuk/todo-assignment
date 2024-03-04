import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box } from "@mui/material";
import NewTodoForm from "./components/NewTodoForm";
import TodoList from "./components/TodoList";
import TodosCounter from "./components/TodosCounter";
import { addNewTodo, fetchTodos } from "./store/todoSlice";
import Filters from "./components/Filters";

function App() {
    const [text, setText] = useState("");
    const { status, error } = useSelector((state) => state.todos);
    const dispatch = useDispatch();

    const handleAction = () => {
        if (text.trim().length < 20 && text.trim().length !== 0) {
            dispatch(addNewTodo(text));
            setText("");
        }
    };

    useEffect(() => {
        dispatch(fetchTodos());
    }, [dispatch]);

    return (
        <Box maxWidth="500px" p="20px" margin="0 auto">
            <NewTodoForm value={text} updateText={setText} handleAction={handleAction} />
            <TodosCounter/>
            <Filters/>
            {status === "loading" && <h2>Loading...</h2>}
            {error && <h2>Ar error occured: {error}</h2>}
            <TodoList />
        </Box>
    );
}

export default App;
