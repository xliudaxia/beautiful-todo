/*
 * @Author: jessLiu
 * @Date: 2022-03-20 17:53:22
 * @LastEditTime: 2022-03-27 16:24:09
 * @LastEditors: liuwenhao
 * @Description:Todo APP
 * @FilePath: /beautiful-todo/src/components/todo/index.tsx
 */
import React, { ChangeEvent, useState, FC, useReducer, useEffect } from "react";
import Logo from "../../logo.svg";
import TodoItem from "./components/TodoItem";
import todoReducer, { initState, ToDoItemProps } from "./utils/todoReducer";
import useLocalStorage from "./hooks/useLocalStorage";
import "./index.css";

const ToDo: FC = () => {
  const [localList, setLocalList] = useLocalStorage<ToDoItemProps[]>(
    "todoList",
    []
  );
  const [{ todoList }, Dispatch] = useReducer(
    todoReducer,
    initState(() => {
      if (localList && localList.length !== 0) {
        return localList as ToDoItemProps[];
      }
      return [];
    })
  );
  useEffect(() => {
    setLocalList(todoList);
  }, [todoList]);

  // todo内容存放
  const [todo, setToDo] = useState<string>("");
  // 错误提示
  const [showError, setShowError] = useState(false);

  // 生成ID方法，reducer
  const generateId = () => {
    if (todoList && todoList.length) {
      return Math.max(...todoList.map((t) => t.id)) + 1;
    } else {
      return 1;
    }
  };

  // 显示错误方法
  const displayError = () => {
    setShowError(true);
    const clearTimer = setTimeout(() => {
      setShowError(false);
    }, 3000);
    return () => clearTimeout(clearTimer);
  };

  // 新增项目方法
  const createNewToDoItem = () => {
    if (!todo) {
      displayError();
      return;
    }
    const newId = generateId();
    const newToDo = { id: newId, title: todo, updateTime: "" };
    Dispatch({
      type: "add",
      value: {
        ...newToDo,
      },
    });
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
  // 删除todo方法 Reducer
  const deleteItem = (id: number) => {
    Dispatch({
      type: "delete",
      value: {
        id: id,
        title: "",
        updateTime: "",
      },
    });
  };

  return (
    <div className="ToDo">
      <img src={Logo} alt="ToDo APP" className="Logo" />
      <h1 className="ToDo-Header">简 ToDo</h1>
      <div className="ToDo-Container">
        <div className="ToDo-Content">
          {todoList.map((item) => (
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
