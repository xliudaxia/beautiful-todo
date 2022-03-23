import React from "react";

export interface ToDoItemProps {
  id: number;
  title: string;
  updateTime: string;
}
interface StateProps {
  todoList: ToDoItemProps | ToDoItemProps[];
}
interface ActionProps {
  type: "add" | "delete" | "update" | "query";
  value?: ToDoItemProps | ToDoItemProps[];
}

/* 
todoreducer承载的能力有：
1.待办事项的增删改查
2.待办事项的localstorage缓存（后期接入维格表）
*/

type TodoReducer<STATE, ACTION> = React.Reducer<STATE, ACTION>;

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
    default:
      return state;
  }
};
export default todoReducer;
