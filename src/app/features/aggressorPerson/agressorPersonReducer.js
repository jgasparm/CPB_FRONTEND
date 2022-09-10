import { SET_ALL_AGRRESSORPERSONS } from "./agrressorPerson";
import { SET_CURRENT_AGRRESSORPERSONS} from "./agrressorPerson";

const initialState = {
};

const agrressorPersonsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ALL_AGRRESSORPERSONS:
      return { ...state, allAgrressorPersons: action.payload };
    case SET_CURRENT_AGRRESSORPERSONS:
      return { ...state, currentAgrressorPersons: action.payload};
    default:
      return state;
  }
};

export default agrressorPersonsReducer;