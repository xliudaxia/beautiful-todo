import React, { useEffect } from "react";

export interface ToDoItemProps {
  id: number;
  title: string;
  updateTime: string;
}
interface StateProps {
  todoList: ToDoItemProps[] | [];
}
interface ActionProps {
  type: "add" | "delete" | "update" | "query" | "reset";
  value: ToDoItemProps;
  initValue?: ToDoItemProps[];
}

/* 
todoreducer承载的能力有：
1.待办事项的增删改查
2.待办事项的localstorage缓存（后期接入维格表）
*/

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
