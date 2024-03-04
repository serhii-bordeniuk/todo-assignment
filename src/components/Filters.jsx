import { Box, Button, Divider } from "@mui/material";
import { setFilterAll, setFilterCompleted, setFilterPending } from "../store/todoSlice";
import { useDispatch } from "react-redux";

const Filters = () => {
  const dispatch = useDispatch()
    return (
        <Box mt="20px">
          <Box mb="10px" display="flex" gap="10px" justifyContent="center">
            <Button onClick={() => dispatch(setFilterAll())} variant="contained">All</Button>
            <Button onClick={() => dispatch(setFilterCompleted())} variant="contained">Completed</Button>
            <Button onClick={() => dispatch(setFilterPending())} variant="contained">To Complete</Button>
        </Box>
        <Divider sx={{width: "100%", }}/>
        </Box>
         
    );
};
export default Filters;
