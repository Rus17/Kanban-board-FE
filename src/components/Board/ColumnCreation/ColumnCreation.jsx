import React, { useState } from 'react';
import { connect } from 'react-redux';
import './columnCreation.css';
import { globalAC } from '../../../store/boardsReducer';

const ColumnCreation = (props) => {
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

  const columnCreator = (currentBoardID, newColumnName, boards) => {
    let newBoards = [...boards];

    let newColumn = {
      id: newIDseeker(props.boards),
      name: newColumnName,
      type: 'column',
      tasks: [],
    };

    newBoards.forEach((item) => {
      if (item.id === currentBoardID) {
        item.columns.push(newColumn.id);
      }
    });

    newBoards = [...newBoards, newColumn];

    return newBoards;
  };

  const clickHandler = () => {
    let newBoards = columnCreator(props.currentBoardID, textInput, props.boards);

    //    window.localStorage.setItem("boardsLS", JSON.stringify(newBoards))
    props.globalAC(newBoards);
    setEditMode(false);
    setInput('');
  };

  if (editMode) {
    return (
      <div className="newColumn">
        <h3>Column creation</h3>
        <div>Name</div>
        <input
          type="text"
          onChange={(e) => {
            setInput(e.target.value);
          }}
          value={textInput}
        />{' '}
        <br />
        <button onClick={clickHandler}>Create</button>
      </div>
    );
  } else {
    return (
      <div className="newColumn" onClick={setEditMode.bind(null, true)}>
        <div>Create new column</div>
      </div>
    );
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

const connectColumnCreation = connect(MapStateToProps, MapDispatchToProps)(ColumnCreation);

export default connectColumnCreation;
