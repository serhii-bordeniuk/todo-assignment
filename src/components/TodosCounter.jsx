import { useSelector } from "react-redux";
import { Box, Typography, Divider } from "@mui/material";

const TodosCounter = () => {
    const { completedCount, pendingCount } = useSelector((state) => state.todos);

    return (
      <Box mt="20px">
        <Divider sx={{width: "100%"}}/>
        <Box mt="10px" display="flex" justifyContent="space-between">
            <Typography>Completed Tasks: {completedCount}</Typography>
            <Typography>Tasks to Complete: {pendingCount}</Typography>
        </Box>
      </Box>
        
    );
};
export default TodosCounter;
