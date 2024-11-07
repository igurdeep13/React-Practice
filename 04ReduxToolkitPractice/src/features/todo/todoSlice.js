import { createSlice, nanoid } from "@reduxjs/toolkit";

// Step1:  We create a initial State of store which means it will show how store will look like initially.
const initialState = {
  todos: [
    {
      id: 1,
      text: "Hello world!",
    },
  ],
};
// Step:2 We create a slice from create Slice method which some properties such as name, initialState and so on.
export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const todo = {
        id: nanoid(),
        text: action.payload,
      };
      state.todos.push(todo);
    },
    removeTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    updateTodo: (state, action) => {
      const { text, id } = action.payload;
      state.todos = state.todos.map((todo) =>
        todo.id === id ? { ...todo, text } : todo
      );
    },
  },
});

export const { addTodo, removeTodo, updateTodo } = todoSlice.actions;

export default todoSlice.reducer;
