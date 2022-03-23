/*
 * @Author: jessLiu
 * @Date: 2022-03-20 17:53:22
 * @LastEditTime: 2022-03-23 09:29:30
 * @LastEditors: liuwenhao
 * @Description:Todo APP
 * @FilePath: /beautiful-todo/src/components/todo/index.tsx
 */
import React, { ChangeEvent, useState, FC } from "react";
import Logo from "../../logo.svg";
import TodoItem from "./components/TodoItem";
import "./index.css";

const ToDo: FC = () => {
  const [list, setList] = useState([
    {
      id: 1,
      text: "清理房间",
    },
    { id: 2, text: "做家务" },
  ]);
  const [todo, setToDo] = useState<string>("");
  const [showError, setShowError] = useState(false);

  const generateId = () => {
    if (list && list.length) {
      return Math.max(...list.map((t) => t.id)) + 1;
    } else {
      return 1;
    }
  };
  const displayError = () => {
    setShowError(true);
    const clearTimer = setTimeout(() => {
      setShowError(false);
    }, 3000);
    return () => clearTimeout(clearTimer);
  };
  const createNewToDoItem = () => {
    if (!todo) {
      displayError();
      return;
    }
    const newId = generateId();
    const newToDo = { id: newId, text: todo };
    setList([...list, newToDo]);
    setToDo("");
  };
  const handleKeyPress = (e: any) => {
    if (e.key === "Enter") {
      createNewToDoItem();
    }
  };
  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setToDo(e.target.value);
  };
  const deleteItem = (id: number) => {
    setList(list.filter((item) => item.id !== id));
  };
  return (
    <div className="ToDo">
      <img src={Logo} alt="ToDo APP" className="Logo" />
      <h1 className="ToDo-Header">简 ToDo</h1>
      <div className="ToDo-Container">
        <div className="ToDo-Content">
          {list.map((item) => (
            <TodoItem key={item.id} item={item} deleteItem={deleteItem} />
          ))}
        </div>
        <div className="ToDoInput">
          <input
            type="text"
            placeholder="我需要去……"
            value={todo}
            onChange={handleInput}
            onKeyPress={handleKeyPress}
          />
          <button className="ToDo-Add" onClick={createNewToDoItem}>
            +
          </button>
        </div>
        <div className="ToDo-ErrorContainer">
          {showError && <p>请先输入ToDo内容。</p>}
        </div>
      </div>
    </div>
  );
};
export default ToDo;
