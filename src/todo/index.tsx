import React, { ChangeEvent, useState, FC, useReducer, useEffect } from "react";
import Logo from "../logo.svg";
import TodoItem from "./components/TodoItem";
import todoReducer, { initState, ToDoItemProps } from "./utils/todoReducer";
import useLocalStorage from "./hooks/useLocalStorage";
import "./index.css";

const ToDo: FC = () => {
  const [todo, setToDo] = useState<string>("");
  // 错误提示
  const [showError, setShowError] = useState(false);
  // localStorage数据持久化
  const [localList, setLocalList] = useLocalStorage<ToDoItemProps[]>(
    "todoList",
    []
  );

  // 初始化数据
  const [{ todoList }, dispatch] = useReducer(
    todoReducer,
    initState(() => {
      if (localList && localList.length !== 0) {
        return localList as ToDoItemProps[];
      }
      return [];
    })
  );

  // 每次操作数据时更新到localStorage
  useEffect(() => {
    setLocalList(todoList);
  }, [todoList, setLocalList]);


// 生成编号
  const generateId = () => {
    if (todoList && todoList.length) {
      return Math.max(...todoList.map((t) => t.id)) + 1;
    } else {
      return 1;
    }
  };

  // 错误信息展示
  const displayError = () => {
    setShowError(true);
    const clearTimer = setTimeout(() => {
      setShowError(false);
    }, 3000);
    return () => clearTimeout(clearTimer);
  };


  // 创建新项目
  const createNewToDoItem = () => {
    if (!todo) {
      displayError();
      return;
    }
    const newId = generateId();
    const newToDo = { id: newId, title: todo, updateTime: "" };
    
    dispatch({
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

  const deleteItem = (id: number) => {
    dispatch({
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
