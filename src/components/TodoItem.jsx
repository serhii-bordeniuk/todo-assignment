import { Box, Checkbox, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { toggleStatus, deleteTodo } from "../store/todoSlice";

const TodoItem = ({ id, title, completed }) => {
    const dispatch = useDispatch();


    return (
        <Box p="0px 10px" display="flex" justifyContent="space-between" alignItems="center" gap="0.5rem" border="1px solid black" borderRadius="5px" width="100%">
            <Checkbox
                checked={completed}
                onChange={() => {
                    dispatch(toggleStatus(id));
                }}
            />

            <Typography sx={{textDecoration: completed ? "line-through" : null}}>{title}</Typography>
            <span
            style={{cursor: "pointer", color: "red"}}
                onClick={() => {
                    dispatch(deleteTodo(id));
                }}
            >
                &times;
            </span>
        </Box>
    );
};
export default TodoItem;
