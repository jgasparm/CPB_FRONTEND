import { SET_ALL_QUERYINCIDENCE } from "./queriesIncidence";
import { SET_CURRENT_QUERYINCIDENCE} from "./queriesIncidence";
import { SET_CURRENT_ALUMNOQUERYINCIDENCE} from "./queriesIncidence";

const initialState = {
};

const queryIncidenceReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ALL_QUERYINCIDENCE:
      return { ...state, allQueryIncidences: action.payload };
    case SET_CURRENT_QUERYINCIDENCE:
      return { ...state, currentQueryIncidences: action.payload};
    case SET_CURRENT_ALUMNOQUERYINCIDENCE:
      return { ...state, currentAlumnoQueryIncidences: action.payload};
    default:
      return state;
  }
};

export default queryIncidenceReducer;