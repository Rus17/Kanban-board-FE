import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import BoardCreation from './components/BoardCreation/BoardCreation';
import BoardsList from './components/BoardsList/BoardsList';
import Board from './components/Board/Board';
import TaskModal from './components/TaskModal/TaskModal';
import { globalAC } from './store/boardsReducer';

function App(props) {
  // useEffect(() => {
  //   let newBoards = JSON.parse(window.localStorage.getItem('boardsLS'));
  //   // let newBoards = db.boards
  //   props.globalAC(newBoards);
  // }, []);

  return (
    <div className="App">
      <Route
        exact
        path="/"
        render={() => {
          return (
            <>
              {' '}
              <BoardCreation /> <BoardsList />{' '}
            </>
          );
        }}
      />

      <Route path="/board/:boardId?" render={() => <Board />} />

      <Route path="/board/:boardId?/task/:taskId?" render={() => <TaskModal />} />
    </div>
  );
}

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

const connectApp = connect(MapStateToProps, MapDispatchToProps)(App);

export default connectApp;
