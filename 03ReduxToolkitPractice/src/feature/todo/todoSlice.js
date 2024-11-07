import { createSlice, nanoid } from "@reduxjs/toolkit";

//  Here we are creating the initial State which means how will the store look like initially.

const initialState = {
  todos: [
    {
      id: 1,
      text: "Hello World!",
    },
  ],
};

export const todoSlice = createSlice({
  name: "todo", //There is a name of every slice.
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
      // take the access of id and text from action.payload
      const { id, text } = action.payload;
      const todo = state.todos.map((todo) =>
        todo.id === id ? (todo.text = text) : todo
      );
    },
  },
});

export const { addTodo, removeTodo, updateTodo } = todoSlice.actions;

export default todoSlice.reducer;
