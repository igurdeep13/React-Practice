import { useContext, createContext } from "react";
export const TodoContext = createContext({
  todos: [
    {
      id: 1,
      todo: "task msg",
      completed: false,
    },
  ],
  addTodo: (todo) => {},
  updateTodo: (id, todo) => {},
  deleteTodo: (id) => {},
  taskCompleted: (id) => {},
});

export const TodoProvider = TodoContext.Provider;

export const useTodo = () => {
  return useContext(TodoContext);
};
