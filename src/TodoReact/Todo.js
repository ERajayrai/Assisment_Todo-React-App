import React, { useState, useEffect } from 'react'
import { Navbar } from './Navbar';
import './style.css'


const getLocalData = () => {
  const lists = localStorage.getItem("mytodolist");

  if (lists) {
    return JSON.parse(lists);
  } else {
    return [];
  }
};

export const Todo = () => {
  const [input, setInput] = useState("");
  const [items, setItems] = useState([])
  const [isEditItem, setIsEditItem] = useState("");
  const [toggleButton, setToggleButton] = useState(false);
  const [textDeco, setTextDeco] = useState("none");
  const [click, setClick] = useState(false);
  const addItems =async () => {
    if (!input) {
      alert("fill blanks")
    } else if (input && toggleButton) {
      setItems(
        items.map((curElem) => {
          if (curElem.id === isEditItem) {
            return { ...curElem, name: input, textDeco: textDeco };
          }
          return curElem;
        })
      );
      setInput("");
      setIsEditItem(null);
      setToggleButton(false);
    } else {
      const myNewInputData = {
        id: new Date().toLocaleString(),
        name: input
      }
      setItems([...items, myNewInputData]);
      
    }
  }
  const checkedItem = (index) => {
    setTextDeco('line-through');
      setItems(
        items.map((curElem) => {
          if (curElem.id === index) {
            return { ...curElem, name: input, textDeco: textDeco };
          }
          return curElem;
        })
      );

  };

  // remove all the elements
  const removeAll = () => {
    setItems([]);
  };
  // adding localStorage
  useEffect(() => {
    localStorage.setItem("mytodolist", JSON.stringify(items));
  }, [items]);

  const editItem = (index) => {
    const item_todo_edited = items.find((curElem) => {
      return curElem.id === index;
    });
    setInput(item_todo_edited.name);
    setIsEditItem(index);
    setToggleButton(true);
  };

  return (
    <>
      <Navbar />
      <div className="main-div">
        <div className="child-div">
          <figure>
            <img src="./images/todo.svg" alt="" />
            <figcaption>Add Your List Here ✌</figcaption>
          </figure>
          <div className="addItems">
            <input type="text" value={input}  onChange={(event) => setInput(event.target.value)} placeholder="✍ add items" className="form-control" />
              <i className="fa fa-plus add-btn" onClick={addItems}></i>
          </div>
          <div className="showItems">
            {items.map((curElem, index) => {
              return (

                <div className="eachItem">
                 {toggleButton ? (
               <>
            		<input type="text"   onChange={(event) => setInput(event.target.value)} placeholder="edit Item" className="form-control" />
              		<i className="far fa-edit add-btn" onClick={addItems}></i>
		</>
            ) : (
         	<><h3 style={{ 'text-decoration': curElem.textDeco }} >{curElem.name}</h3>
                  <h3 style={{ 'text-decoration': curElem.textDeco }} >{curElem.id}</h3>
                  <div className="todo-btn">
                    <i class="far fa-edit add-btn" style={{ 'margin-left': '0px' }} onClick={() => editItem(curElem.id)}></i>
                    <button type="button" id="curElem.id" h3 style={{ width: '100px' }} onClick={() => { checkedItem(curElem.id) }} >done</button>
                  </div> </> 
 
            )}
                </div>
              );
            })}
          </div>
          <div className="showItems">
            <button onClick={removeAll} className="btn effect04" data-sm-link-text="remove All">
              <span>CHECK List</span>
            </button>
          </div>
        </div>
      </div>

    </>
  )
}
