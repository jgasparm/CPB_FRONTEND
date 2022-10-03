import { combineReducers } from "redux";
import agrressorPersonsReducer from "./aggressorPerson/agressorPersonReducer";
import attackendPersonsReducer from "./attackendPerson/attackendPersonReducer";
import queryPotentialBullyingReducer from "./queriesPotentialBullying/queriesPotentialBullyingReducer";
import queryIncidenceReducer from "./queryIncidence/queriesIncidenceReducer";

const rootReducer = combineReducers({
    attackendPerson: attackendPersonsReducer,
    agrressorPerson: agrressorPersonsReducer,
    queryIncidence: queryIncidenceReducer,
    queryPotentialBullying: queryPotentialBullyingReducer,
});

export default rootReducer;