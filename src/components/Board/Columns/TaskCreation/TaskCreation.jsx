import React, { useState } from 'react';
import { connect } from 'react-redux';
import './taskCreation.css';
import { globalAC } from '../../../../store/boardsReducer';

const TaskCreation = (props) => {
  const [textInput, setInput] = useState('');
  const [editMode, setEditMode] = useState(false);

  const newIDseeker = (boards) => {
    for (let newID = 0; ; newID++) {
      let indicator = true;
      boards.forEach((i) => {
        if (i.id === newID) {
          indicator = false;
        }
      });

      if (indicator === true) {
        return newID;
      }
    }
  };

  const nextOderSeeker = (currentColumnID, boards) => {
    let nextOder;
    let taskList;

    // Ищем колонку с текущим currentColumnID
    // Считывыаем ее поле tasks
    boards.forEach((item) => {
      if (item.id === currentColumnID) {
        taskList = item.tasks;
      }
    });

    if (taskList.length === 0) {
      return 0;
    }

    // Ищем и считываем поле order наших task-ов
    let orderList = [];

    taskList.forEach((itemID) => {
      boards.forEach((item) => {
        if (item.id === itemID) {
          orderList.push(item.order);
        }
      });
    });

    // Выясняем task с наибольшим order
    // Возвращаем order + 1
    nextOder = Math.max(...orderList) + 1;
    return nextOder;
  };

  const taskCreator = (taskName, currentColumnID, boards) => {
    let newBoards = [...boards];

    let currentDate = new Date();
    let setDate = String(currentDate.getFullYear());
    setDate += ` ${currentDate.getMonth() + 1}`;
    setDate += ` ${currentDate.getDate()}`;

    let newTask = {
      id: newIDseeker(boards),
      name: taskName,
      type: 'task',
      order: nextOderSeeker(currentColumnID, boards),
      shortDescription: '',
      fullDescription: '',
      creatingDate: setDate,
      editingDate: setDate,
    };

    newBoards.forEach((item) => {
      if (item.id === currentColumnID) {
        item.tasks.push(newTask.id);
      }
    });

    newBoards = [...newBoards, newTask];
    //    window.localStorage.setItem("boardsLS", JSON.stringify(newBoards))
    return newBoards;
  };

  const clickHandler = () => {
    let newBoards = taskCreator(textInput, props.currentColumnID, props.boards);
    //    window.localStorage.setItem("boardsLS", JSON.stringify(newBoards))
    props.globalAC(newBoards);
    setEditMode(false);
    setInput('');
  };
  if(editMode){
    return (
      <div className="newTask">
          <input
            type="text"
            onChange={(e) => {
              setInput(e.target.value);
            }}
            value={textInput}
          />{' '}
          <br />
          <button onClick={clickHandler}>Add</button>
        </div>
    )
  } else {
    return (
      <div className="newTask" onClick={setEditMode.bind(null, true)}>
          <span>Add new task</span>
        </div>
    )
  }
};

const MapStateToProps = (state) => {
  return {
    boards: state.boardsPage.boards,
  };
};

const MapDispatchToProps = (dispatch) => {
  return {
    globalAC: (newBoards) => {
      dispatch(globalAC(newBoards));
    },
  };
};

const connectTaskCreation = connect(MapStateToProps, MapDispatchToProps)(TaskCreation);

export default connectTaskCreation;
