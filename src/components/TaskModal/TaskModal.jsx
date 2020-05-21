import './taskModal.css';
import React, { useState } from 'react';
import Modal from 'react-modal';
import { withRouter, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { globalAC } from '../../store/boardsReducer';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    backgroundColor: '#dcfdcc',
  },
};

Modal.setAppElement('#root');

const TaskModal = (props) => {
  const [editModeShort, setEditModeShort] = useState(false);
  const [editModeFull, setEditModeFull] = useState(false);

  let currentTask = [];
  currentTask = props.boards.filter((item) => {
    return item.id === Number(props.match.params.taskId);
  });

  let currentColumn;
  let brothers;
  props.boards.forEach((elem) => {
    if (elem.type === 'column') {
      elem.tasks.forEach((task) => {
        if (task === Number(props.match.params.taskId)) {
          currentColumn = elem.name;
          brothers = elem.tasks;
        }
      });
    }
  });

  var subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(true);

  const removerTask = (taskID, boards, brothers, currentTaskOrder) => {
    let newBoards = [...boards];

    // У нижних братьев меняем order на -1
    brothers.forEach((brother) => {
      newBoards.forEach((item) => {
        if (item.id === brother && item.order > currentTaskOrder) {
          item.order--;
        }
      });
    });

    //Удаляем id задачи из поля tasks у колонок
    newBoards.forEach((item) => {
      if (item.type === 'column') {
        item.tasks.forEach((elem, i, arr) => {
          if (elem === taskID) {
            arr.splice(i, 1);
          }
        });
      }
    });

    //Удаляем саму задачу.
    newBoards = newBoards.filter((item, i, arr) => {
      return item.id !== taskID;
    });

    return newBoards;
  };

  const removeHandler = (taskID, currentTaskOrder, boards, brothers) => {
    let newBoards = removerTask(taskID, boards, brothers, currentTaskOrder);
    //    window.localStorage.setItem("boardsLS", JSON.stringify(newBoards))
    props.globalAC(newBoards);
  };

  const replacementDescription = (currentTaskId, newShortDescription, boards, mark) => {
    let newBoards = [...boards];
    newBoards.forEach((item) => {
      if (item.id === currentTaskId) {
        if (mark === 'short') {
          item.shortDescription = newShortDescription;
          let currentDate = new Date();
          let setDate = String(currentDate.getFullYear());
          setDate += ` ${currentDate.getMonth() + 1}`;
          setDate += ` ${currentDate.getDate()}`;
          item.editingDate = setDate;
        } else {
          item.fullDescription = newShortDescription;
          let currentDate = new Date();
          let setDate = String(currentDate.getFullYear());
          setDate += ` ${currentDate.getMonth() + 1}`;
          setDate += ` ${currentDate.getDate()}`;
          item.editingDate = setDate;
        }
      }
    });

    //    window.localStorage.setItem("boardsLS", JSON.stringify(newBoards))
    return newBoards;
  };

  function afterOpenModal() {
    subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }

  const onClickShortHandler = () => {
    setTextShort(currentTask[0].shortDescription);
    setEditModeShort(true);
  };

  const onClickFullHandler = () => {
    setTextFull(currentTask[0].fullDescription);
    setEditModeFull(true);
  };

  const shortDescriptionHandler = () => {
    let newBoards = replacementDescription(currentTask[0].id, textShort, props.boards, 'short');
    //    window.localStorage.setItem("boardsLS", JSON.stringify(newBoards))
    props.globalAC(newBoards);
    setTextShort(currentTask[0].shortDescription);
    setEditModeShort(false);
  };

  const fullDescriptionHandler = () => {
    let newBoards = replacementDescription(currentTask[0].id, textFull, props.boards, 'full');
    //    window.localStorage.setItem("boardsLS", JSON.stringify(newBoards))
    props.globalAC(newBoards);
    setTextFull(currentTask[0].fullDescription);
    setEditModeFull(false);
  };

  let [textShort, setTextShort] = useState('');
  let [textFull, setTextFull] = useState('');

  if (currentTask.length > 0) {
    return (
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <NavLink className="button" to={'/board/' + props.match.params.boardId}>
          Close
        </NavLink>
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>{currentTask[0].name}</h2>
        <div></div>
        <b>Short Description</b>{' '}
        {!editModeShort && (
          <span className="button2" onClick={onClickShortHandler}>
            Edit
          </span>
        )}{' '}
        <br />
        {!editModeShort ? (
          <div>{currentTask[0].shortDescription}</div>
        ) : (
          <textarea
            cols="30"
            rows="5"
            value={textShort}
            onChange={(e) => {
              setTextShort(e.target.value);
            }}
            onKeyUp={(e) => {
              if (e.keyCode === 13) {
                shortDescriptionHandler();
              }
            }}
          />
        )}
        <br />
        <b>Full Description</b>{' '}
        {!editModeFull && (
          <span className="button2" onClick={onClickFullHandler}>
            Edit
          </span>
        )}{' '}
        <br />
        {!editModeFull ? (
          <div>{currentTask[0].fullDescription}</div>
        ) : (
          <textarea
            cols="30"
            rows="7"
            value={textFull}
            onChange={(e) => {
              setTextFull(e.target.value);
            }}
            onKeyUp={(e) => {
              if (e.keyCode === 13) {
                fullDescriptionHandler();
              }
            }}
          />
        )}
        <br />
        <b>Creating Date</b>
        <div>{currentTask[0].creatingDate}</div>
        <br />
        <b>Editing Date</b>
        <div>{currentTask[0].editingDate}</div>
        <br />
        <b>Column Name</b>
        <div>{currentColumn}</div>
        <br />
        <br />
        <NavLink
          className="button2"
          to={'/board/' + props.match.params.boardId}
          onClick={removeHandler.bind(
            null,
            currentTask[0].id,
            currentTask[0].order,
            props.boards,
            brothers,
          )}
        >
          Remove This Task
        </NavLink>
      </Modal>
    );
  } else return <div>...</div>;
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

const withRouterTaskModal = withRouter(TaskModal);

const connectTaskModal = connect(MapStateToProps, MapDispatchToProps)(withRouterTaskModal);

export default connectTaskModal;
