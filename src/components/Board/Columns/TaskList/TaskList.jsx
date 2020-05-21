import React from 'react';
import { NavLink } from 'react-router-dom';
import './taskList.css';
import { Draggable } from 'react-beautiful-dnd';
import { connect } from 'react-redux';
import { globalAC } from '../../../../store/boardsReducer';

const TaskList = (props) => {
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

  const removeHandler = (taskID, currentTaskOrder) => {
    let newBoards = removerTask(taskID, props.boards, props.tasks, currentTaskOrder);
    //    window.localStorage.setItem("boardsLS", JSON.stringify(newBoards))
    props.globalAC(newBoards);
  };

  let taskList = [];
  let singleTask = [];

  //Выбираем из БД нужные нам элементы
  for (let i = 0; i < props.tasks.length; i++) {
    singleTask = props.boards.filter((item) => {
      return props.tasks[i] === item.id;
    });
    taskList.push(singleTask[0]);
  }

  //Сортируем их по полю order
  taskList.sort((a, b) => {
    return a.order - b.order;
  });

  let showTaskList = taskList.map((item, index, boards) => {
    return (
      <Draggable key={item.id} draggableId={String(item.id)} index={item.order}>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
            <div className="task" key={item.id} id={item.id}>
              <div className="button" onClick={removeHandler.bind(null, item.id, item.order)}>
                Remove
              </div>
              <NavLink
                className="navLink"
                to={'/board/' + props.currentBoardId + '/task/' + item.id}
              >
                <div className="name">{item.name}</div>
              </NavLink>
              <div>
                Order: <b>{item.order}</b>
              </div>
              {item.shortDescription}
              <br />
              <br />
              <div className="id">ID: {item.id}</div>
            </div>
          </div>
        )}
      </Draggable>
    );
  });

  return <>{showTaskList}</>;
};

const MapStateToProps = (state) => {
  return { boards: state.boardsPage.boards };
};

const MapDispatchToProps = (dispatch) => {
  return {
    globalAC: (newBoards) => {
      dispatch(globalAC(newBoards));
    },
  };
};

const connectTaskList = connect(MapStateToProps, MapDispatchToProps)(TaskList);

export default connectTaskList;
