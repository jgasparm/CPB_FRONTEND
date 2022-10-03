import { SET_ALL_QUERYPOTENTIALBULLYING } from "./queriesPotentialBullying";
import { SET_CURRENT_QUERYPOTENTIAL} from "./queriesPotentialBullying";
import { SET_CURRENT_ALUMNOQUERYPOTENTIALBULLYING} from "./queriesPotentialBullying";

const initialState = {
};

const queryPotentialBullyingReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ALL_QUERYPOTENTIALBULLYING:
      return { ...state, allQueryPotentialBullying: action.payload };
    case SET_CURRENT_QUERYPOTENTIAL:
      return { ...state, currentQueryPotentialBullying: action.payload};
    case SET_CURRENT_ALUMNOQUERYPOTENTIALBULLYING:
      return { ...state, currentAlumnoQueryPotentialBullying: action.payload};
    default:
      return state;
  }
};

export default queryPotentialBullyingReducer;