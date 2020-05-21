import React, { useState } from 'react';
import './inputRename.css';
import { connect } from 'react-redux';
import { globalAC } from '../../../../store/boardsReducer';

const InputRename = (props) => {
  const [editMode, setEditMode] = useState(false);
  const [textInput, setInput] = useState('');

  const removerColumn = (columnID, boards) => {
    let newBoards = [...boards];

    // Находим массив задач этой колонки
    let arrTasks = [];

    newBoards.forEach((item) => {
      if (item.id === columnID) {
        arrTasks = item.tasks;
      }
    });

    // Сначала удаляем все задачи этой колонки
    if (arrTasks.length > 0) {
      arrTasks.forEach((item) => {
        newBoards.forEach((elem, i, arr) => {
          if (item === elem.id) {
            arr.splice(i, 1);
          }
        });
      });
    }

    arrTasks = [];

    //Удаляем текущую колонку из поля column текущей доски
    newBoards.forEach((item) => {
      if (item.type === 'board') {
        item.columns.forEach((col, i, arr) => {
          if (col === columnID) {
            arr.splice(i, 1);
          }
        });
      }
    });

    //Теперь удаляем саму колонку
    newBoards.forEach((item, i, arr) => {
      if (item.id === columnID) {
        arr.splice(i, 1);
      }
    });

    return newBoards;
  };

  const renamerColumn = (newColName, columnID, boards) => {
    let newBoards = [...boards];

    newBoards.forEach((item) => {
      if (item.id === columnID) {
        item.name = newColName;
      }
    });

    //    window.localStorage.setItem("boardsLS", JSON.stringify(newBoards))
    return newBoards;
  };

  const removeHandler = (columnID) => {
    let newBoards = removerColumn(columnID, props.boards);
    //    window.localStorage.setItem("boardsLS", JSON.stringify(newBoards))
    props.globalAC(newBoards);
  };

  const renameHandler = () => {
    let newBoards = renamerColumn(textInput, props.id, props.boards);
    props.globalAC(newBoards);
    setEditMode(false);
    setInput('');
  };

  return (
    <div className="inputRename">
      {!editMode ? (
        <div className="name">{props.name}</div>
      ) : (
        <input
          value={textInput}
          onChange={(e) => {
            setInput(e.target.value);
          }}
          onKeyUp={(e) => {
            if (e.keyCode === 13) {
              renameHandler();
            }
          }}
        />
      )}

      <div className="buttonContainer">
        <span className="buttonRemove" onClick={removeHandler.bind(null, props.id)}>
          Remove{' '}
        </span>
        <span className="buttonRename" onClick={setEditMode.bind(null, true)}>
          {' '}
          Rename
        </span>
      </div>
    </div>
  );
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

const connectInputRename = connect(MapStateToProps, MapDispatchToProps)(InputRename);

export default connectInputRename;
