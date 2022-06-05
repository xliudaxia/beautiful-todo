import React from "react";

export interface ToDoItemProps {
  id: number;
  title?: string;
  updateTime?: string;
}
interface StateProps {
  todoList: ToDoItemProps[] | [];
}
interface ActionProps {
  type: "add" | "delete" | "update" | "query" | "reset";
  value: ToDoItemProps;
  initValue?: ToDoItemProps[]|[];
}

type TodoReducer<STATE, ACTION> = React.Reducer<STATE, ACTION>;

export function initState(o: () => ToDoItemProps[]): StateProps {
  return {
    todoList: o() ? o() : [],
  };
}

const todoReducer: TodoReducer<StateProps, ActionProps> = (
  state,
  { type, value }
) => {
  switch (type) {
    case "add":
      return {
        ...state,
        todoList: [...state.todoList, value],
      };
    case "delete":
      return {
        ...state,
        todoList: state.todoList.filter((item) => item.id !== value.id),
      };
    case "reset":
      return {
        ...state,
        todoList: [],
      };
    default:
      return state;
  }
};
export default todoReducer;
