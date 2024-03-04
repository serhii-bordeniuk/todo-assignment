import { Box, TextField, Button } from "@mui/material";

const NewTodoForm = ({ value, updateText, handleAction }) => {
    return (
        <Box display="flex" justifyContent="space-between" gap="50px" alignItems="flex-start">
            <TextField
               sx={{width: "300px"}}
                id="new-todo"
                placeholder="New Todo"
                type="text"
                variant="outlined"
                value={value}
                onChange={(e) => updateText(e.target.value)}
                helperText="The title can't be more than 20 characters"
            />

            <Button onClick={handleAction} variant="contained">Add Todo</Button>
        </Box>
    );
};
export default NewTodoForm;
