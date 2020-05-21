const GLOBAL_TYPE = 'GLOBAL_TYPE';

const initialState = {
  boards: JSON.parse(window.localStorage.getItem('boardsLS')) || [],
};

const boardsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GLOBAL_TYPE: {
      return {
        ...state,
        boards: [...action.boards],
      };
    }

    default:
      return state;
  }
};

//======================= AC =======================

export const globalAC = (newBoards) => {
  return {
    type: GLOBAL_TYPE,
    boards: newBoards,
  };
};

export default boardsReducer;
