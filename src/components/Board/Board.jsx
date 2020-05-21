import React from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import './board.css';
import { globalAC } from '../../store/boardsReducer';
import ColumnCreation from './ColumnCreation/ColumnCreation';
import InputRename from './Columns/InputRename/InputRename';
import TaskCreator from './Columns/TaskCreation/TaskCreation';
import TaskList from './Columns/TaskList/TaskList';

const Board = (props) => {
  let currentBoard = props.boards.filter((item) => {
    return item.id === Number(props.match.params.boardId);
  });
  currentBoard = currentBoard[0];

  const reinstaller = (parentSourceId, parentDestinationId, nextOrder, childId, boards) => {
    //пришли id задачи, newColumn и db
    //нужно найти column у которого в поле tasks есть пришедший id и удалить у него из массива данный taskID
    //нужно найти column у которого id == newColumn и вписать ему в поле tasks данный taskID
    // В поле order для child записать nextOrder
    // Всем следующим детям order увеличить на 1

    let newBoards = [...boards];

    if (parentSourceId !== parentDestinationId) {
      //Находим бывших и новых братьев
      let oldBrothers = [];
      let newBrothers = [];

      newBoards.forEach((item) => {
        if (parentSourceId === item.id) {
          oldBrothers = [...item.tasks];
        }
        if (parentDestinationId === item.id) {
          newBrothers = [...item.tasks];
        }
      });

      // Меняем order всем нижним детям у приемного род. на +1
      newBrothers.forEach((brother) => {
        newBoards.forEach((item) => {
          if (item.id === brother && item.order >= nextOrder) {
            item.order++;
          }
        });
      });

      // Меняем order всем нижним братьям у родителя-источника на -1
      let childOrder;
      newBoards.forEach((item) => {
        if (item.id === childId) {
          childOrder = item.order;
        }
      });

      oldBrothers.forEach((brother) => {
        newBoards.forEach((item) => {
          if (item.id === brother && item.order > childOrder) {
            item.order--;
          }
        });
      });

      // Меняем order передаваемому ребенку
      newBoards.forEach((item) => {
        if (item.id === childId) {
          item.order = nextOrder;
        }
      });

      //Удаляем ребенка у родителя источника
      newBoards.forEach((item) => {
        if (item.type === 'column') {
          item.tasks.forEach((task, i, arr) => {
            if (task === childId) {
              arr.splice(i, 1);
            }
          });
        }
      });

      //Добавляем ребенка родителю приемному
      newBoards.forEach((item) => {
        if (item.type === 'column' && item.id === parentDestinationId) {
          item.tasks.push(childId);
        }
      });
    }

    if (parentSourceId === parentDestinationId) {
      //Находим order передаваемого ребенка
      let childOrder;
      newBoards.forEach((item) => {
        if (item.id === childId) {
          childOrder = item.order;
        }
      });

      // Находим всех братьев
      let brothers;
      newBoards.forEach((item) => {
        if (item.id === parentSourceId) {
          brothers = [...item.tasks];
        }
      });

      // Всем нижним в бывшем положении меняем order на -1
      brothers.forEach((brother) => {
        newBoards.forEach((item) => {
          if (brother === item.id && item.order > childOrder) {
            item.order--;
          }
        });
      });

      // Всем нижним в новом положении меняем order на +1
      brothers.forEach((brother) => {
        newBoards.forEach((item) => {
          if (brother === item.id && item.order >= nextOrder) {
            item.order++;
          }
        });
      });

      // Перемещаемому ребенку присваиваем newOrder
      newBoards.forEach((item) => {
        if (item.id === childId) {
          item.order = nextOrder;
        }
      });
    }

    return newBoards;
  };

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) {
      return;
    }

    let newBoards = reinstaller(
      Number(source.droppableId),
      Number(destination.droppableId),
      destination.index,
      Number(draggableId),
      props.boards,
    );

    //    window.localStorage.setItem("boardsLS", JSON.stringify(newBoards));
    props.globalAC(newBoards);
  };

  let showColumns = props.boards.map((item, index, boards) => {
    for (let i = 0; i < currentBoard.columns.length; i++) {
      if (item.id === currentBoard.columns[i]) {
        return (
          <Droppable droppableId={String(item.id)} key={item.id}>
            {(provided) => (
              <div className="taskList" {...provided.droppableProps} ref={provided.innerRef}>
                <div className="column" data_column_id={item.id}>
                  <InputRename id={item.id} name={item.name} />

                  <TaskList tasks={item.tasks} currentBoardId={currentBoard.id} />

                  <TaskCreator currentColumnID={item.id} />
                </div>

                {provided.placeholder}
              </div>
            )}
          </Droppable>
        );
      }
    }
  });

  if (currentBoard) {
    return (
      <DragDropContext onDragEnd={onDragEnd}>
        <div>
          <NavLink className="button2" to={'/'}>
            Home
          </NavLink>
          <h2>{currentBoard.name}</h2>
          <div className="columns">
            <ColumnCreation currentBoardID={currentBoard.id} />
            {showColumns}
          </div>
        </div>
      </DragDropContext>
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

const withRouterBoard = withRouter(Board);

const connectBoard = connect(MapStateToProps, MapDispatchToProps)(withRouterBoard);

export default connectBoard;
