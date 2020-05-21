import React, { useState } from 'react';
import { connect } from 'react-redux';
import './boardCreation.css';
import { globalAC } from '../../store/boardsReducer';

const BoardCreation = (props) => {
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

  const boardCreator = (newBoardName, boards) => {
    let newBoards = [...boards];

    let newBoard = {
      id: newIDseeker(boards),
      name: newBoardName,
      type: 'board',
      columns: [],
    };

    newBoards = [...newBoards, newBoard];
    return newBoards;
  };

  const clickHandler = () => {
    let newBoards = boardCreator(textInput, props.boards);

    //    window.localStorage.setItem("boardsLS", JSON.stringify(newBoards))
    props.globalAC(newBoards);
    setEditMode(false);
    setInput('');
  };

  if (editMode) {
    return (
      <div>
        <h3>Board creation</h3>
        Name
        <input
          type="text"
          onChange={(e) => {
            setInput(e.target.value);
          }}
          value={textInput}
        />
        <button onClick={clickHandler}>Create</button>
      </div>
    );
  } else {
    return (
      <div className="newBoard" onClick={setEditMode.bind(null, true)}>
        <div>Create new board</div>
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

const connectBoardCreation = connect(MapStateToProps, MapDispatchToProps)(BoardCreation);

export default connectBoardCreation;
