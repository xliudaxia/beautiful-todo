/*
 * @Author: jessLiu
 * @Date: 2022-03-20 17:55:01
 * @LastEditTime: 2022-03-20 18:54:56
 * @LastEditors: liuwenhao
 * @Description:Todo Item
 * @FilePath: /beautiful-todo/src/components/todo/components/TodoItem/index.tsx
 */

import React, { FC } from "react";

import "./index.css";

interface TodoItemProps {
  item: {
    id: number;
    text: string;
  };
  deleteItem: (id: number) => void;
}

const TodoItem: FC<TodoItemProps> = (props) => {
  const { item, deleteItem } = props;
  return (
    <div className="ToDoItem">
      <p className="ToDoItem-Text">{item.text}</p>
      <button className="ToDoItem-Delete" onClick={() => deleteItem(item.id)}>
        -
      </button>
    </div>
  );
};

export default TodoItem;
