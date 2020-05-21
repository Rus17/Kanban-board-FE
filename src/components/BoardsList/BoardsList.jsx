import React from 'react';
import './boardList.css';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { globalAC } from '../../store/boardsReducer';

const BoardsList = (props) => {
  const removerBoard = (boardID, boards) => {
    let newBoards = [...boards];

    let arrItems = [];
    let arrColumn = [];

    //Находим все колонки этой доски
    boards.forEach((board) => {
      if (board.id === boardID && board.columns.length > 0) {
        arrColumn = [...board.columns];
      }
    });

    //Находим все задачи этой доски
    if (arrColumn.length > 0) {
      arrColumn.forEach((selectColumn) => {
        boards.forEach((column) => {
          if (column.id === selectColumn && column.tasks.length > 0) {
            arrItems = [...arrItems, ...column.tasks];
          }
        });
      });
    }

    arrItems = [...arrItems, ...arrColumn];

    //Удаляем всех потомков
    if (arrItems.length > 0) {
      arrItems.forEach((item) => {
        newBoards.forEach((elem, i, arr) => {
          if (elem.id === item) {
            arr.splice(i, 1);
          }
        });
      });
    }

    arrItems = [];
    arrColumn = [];

    //Удаляем доску
    newBoards.forEach((item, i, arr) => {
      if (item.id === boardID) {
        arr.splice(i, 1);
      }
    });

    return newBoards;
  };

  const delHandler = (boardID, boards) => {
    let newBoards = removerBoard(boardID, boards);
    //    window.localStorage.setItem("boardsLS", JSON.stringify(newBoards))
    props.globalAC(newBoards);
  };

  let listBoards = props.boards.map((item, i, arr) => {
    if (item.type === 'board') {
      return (
        <div key={item.id} className="boardList">
          <NavLink to={'./board/' + item.id}>
            <h3>{item.name}</h3>
          </NavLink>
          <button onClick={delHandler.bind(null, item.id, arr)}>Delete</button>
        </div>
      );
    }
  });

  return <div> {listBoards} </div>;
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

const connectBoardsList = connect(MapStateToProps, MapDispatchToProps)(BoardsList);

export default connectBoardsList;
