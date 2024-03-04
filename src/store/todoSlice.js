import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchTodos = createAsyncThunk(
    "todos/fetchTodos",
    async function (_, { rejectWithValue }) {
        try {
            const response = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=10");
            if (!response.ok) {
                throw new Error("Server error");
            }
            const data = response.json();

            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const deleteTodo = createAsyncThunk(
    "todos/deleteTodo",
    async function (id, { rejectWithValue, dispatch }) {
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                throw new Error("Can't delete task. Server error.");
            }
            dispatch(removeTodo({ id }));
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const toggleStatus = createAsyncThunk(
    "todos/toggleStatus",
    async function (id, { rejectWithValue, dispatch, getState }) {
        const todo = getState().todos.todos.find((todo) => todo.id === id);

        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    completed: !todo.completed,
                }),
            });

            if (!response.ok) {
                throw new Error("Can't toggle status. Server error.");
            }

            dispatch(toggleComplete({ id }));
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const addNewTodo = createAsyncThunk(
    "todos/addNewTodo",
    async function (text, { rejectWithValue, dispatch }) {
        try {
            const todo = {
                title: text,
                userId: 1,
                completed: false,
            };

            const response = await fetch("https://jsonplaceholder.typicode.com/todos", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(todo),
            });

            if (!response.ok) {
                throw new Error("Can't add task. Server error.");
            }

            const data = await response.json();
            dispatch(addTodo(data));
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const setError = (state, action) => {
    state.status = "rejected";
    state.error = action.payload;
};

const todoSlice = createSlice({
    name: "todos",
    initialState: {
        todos: [],
        filter: "all",
        completedCount: 0,
        pendingCount: 0,
        status: null,
        error: null,
    },
    reducers: {
        addTodo(state, action) {
            state.todos.push(action.payload);
        },
        toggleComplete(state, action) {
            const toggledTodo = state.todos.find((todo) => todo.id === action.payload.id);
            toggledTodo.completed = !toggledTodo.completed;
        },
        removeTodo(state, action) {
            state.todos = state.todos.filter((todo) => todo.id !== action.payload.id);
        },
        setFilterAll(state, action) {
            state.filter = "all";
        },
        setFilterCompleted(state, action) {
            state.filter = "completed";
        },
        setFilterPending(state, action) {
            state.filter = "pending";
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTodos.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(fetchTodos.fulfilled, (state, action) => {
                state.status = "resolved";
                state.todos = action.payload;
                state.completedCount = action.payload.filter((todo) => todo.completed).length;
                state.pendingCount = action.payload.filter((todo) => !todo.completed).length;
            })
            .addCase(addNewTodo.fulfilled, (state, action) => {
                state.completedCount = state.todos.filter((todo) => todo.completed).length;
                state.pendingCount = state.todos.filter((todo) => !todo.completed).length;
            })
            .addCase(deleteTodo.fulfilled, (state, action) => {
                state.completedCount = state.todos.filter((todo) => todo.completed).length;
                state.pendingCount = state.todos.filter((todo) => !todo.completed).length;
            })
            .addCase(toggleStatus.fulfilled, (state, action) => {
                state.completedCount = state.todos.filter((todo) => todo.completed).length;
                state.pendingCount = state.todos.filter((todo) => !todo.completed).length;
            })
            .addMatcher(
                (action) =>
                    [fetchTodos.rejected, deleteTodo.rejected, toggleStatus.rejected].includes(
                        action.type
                    ),
                setError
            );
    },
});

const { addTodo, toggleComplete, removeTodo } = todoSlice.actions;

export const { setFilterAll, setFilterCompleted, setFilterPending } = todoSlice.actions;

export default todoSlice.reducer;
