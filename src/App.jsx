import "./styles.css";
import React, { useState, useRef } from "react";

export const App = () => {
  const [todotext, setTodotext] = useState("");
  const [incomTodo, setIncomTodo] = useState([]);
  const [comTodo, setcomTodo] = useState([]);
  const inputEl = useRef(null);

  // 入力されたテキストを格納する
  const inputTodoText = (e) => setTodotext(e.target.value);

  // 未完了リストへ追加する
  const addTodoList = () => {
    if (todotext === "") return;
    const todoList = [...incomTodo, todotext];
    setIncomTodo(todoList);
    setTodotext("");
  };

  // 未完了リストから削除する
  const deleteTodoList = (index) => {
    const todoList = [...incomTodo];
    todoList.splice(index, 1);
    setIncomTodo(todoList);
  };

  // 未完了から完了リストへ移動する
  const completeTodoList = (index) => {
    const incomTodoList = [...incomTodo];
    const comTodoList = [...comTodo, incomTodoList[index]];

    incomTodoList.splice(index, 1);

    setcomTodo(comTodoList);
    setIncomTodo(incomTodoList);
  };

  // 完了から未完了リストへ戻す
  const backTodoList = (index) => {
    const comTodoList = [...comTodo];
    const incomTodoList = [...incomTodo, comTodoList[index]];

    comTodoList.splice(index, 1);

    setcomTodo(comTodoList);
    setIncomTodo(incomTodoList);
  };

  // 入力フォームにフォーカスを当てる
  const handleOnFocus = () => {
    inputEl.current.focus();
  };

  return (
    <>
      <div className="input-area">
        <input
          placeholder="TODOを追加"
          value={todotext}
          onChange={inputTodoText}
          ref={inputEl}
        />
        <button onClick={addTodoList}>追加</button>
        <button onClick={handleOnFocus}>Focus</button>
      </div>

      <div className="incomplete-area">
        <p className="title">未完了のTODO</p>
        <ul>
          {incomTodo.map((todo, index) => {
            return (
              // ループでレンダリングする際はタグに一意のkeyを設定する（仮想DOMとの比較時に区別するため）
              // onClickには関数を定義する（式や値を渡すと画面読み込み時に評価されるため）
              <div key={todo} className="list-row">
                <li>{todo}</li>
                <button
                  onClick={() => {
                    completeTodoList(index);
                  }}
                >
                  完了
                </button>
                <button onClick={() => deleteTodoList(index)}>削除</button>
              </div>
            );
          })}
        </ul>
      </div>
      <div className="complete-area">
        <p className="title">完了のTODO</p>
        <ul>
          {comTodo.map((todo, index) => {
            return (
              <div key={todo} className="list-row">
                <li>{todo}</li>
                <button onClick={() => backTodoList(index)}>戻す</button>
              </div>
            );
          })}
        </ul>
      </div>
    </>
  );
};
