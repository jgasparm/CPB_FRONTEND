import { SET_ALL_ATTACKENDPERSONS } from "./attackendPerson";
import { SET_CURRENT_ATTACKENDPERSONS} from "./attackendPerson";
import { SET_CURRENT_BITACORAATTACKENDPERSONS} from "./attackendPerson";
import { SET_ALLINCIDENCES_BITACORAATTACKENDPERSONS} from "./attackendPerson";
import { SET_ALLCPB_BITACORAATTACKENDPERSONS} from "./attackendPerson";

const initialState = {
};

const attackendPersonsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ALL_ATTACKENDPERSONS:
      return { ...state, allAttackendPersons: action.payload };
    case SET_CURRENT_ATTACKENDPERSONS:
      return { ...state, currentAttackendPersons: action.payload};
    case SET_CURRENT_BITACORAATTACKENDPERSONS:
      return { ...state, currentBitacoraAttackendPersons: action.payload};
    case SET_ALLINCIDENCES_BITACORAATTACKENDPERSONS:
      return { ...state, allIncidencesBitacoraAttackendPersons: action.payload};
    case SET_ALLCPB_BITACORAATTACKENDPERSONS:
      return { ...state, allCpbBitacoraAttackendPersons: action.payload};
    default:
      return state;
  }
};

export default attackendPersonsReducer;