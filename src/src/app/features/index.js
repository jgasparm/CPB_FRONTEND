import { combineReducers } from "redux";
import agrressorPersonsReducer from "./aggressorPerson/agressorPersonReducer";
import attackendPersonsReducer from "./attackendPerson/attackendPersonReducer";
import queryIncidenceReducer from "./queryIncidence/queriesIncidenceReducer";

const rootReducer = combineReducers({
    attackendPerson: attackendPersonsReducer,
    agrressorPerson: agrressorPersonsReducer,
    queryIncidence: queryIncidenceReducer
});

export default rootReducer;