export const SET_ALL_ATTACKENDPERSONS = "SET_ALL_ATTACKENDPERSONS";
export const SET_CURRENT_ATTACKENDPERSONS = "SET_CURRENT_ATTACKENDPERSONS"
export const SET_CURRENT_BITACORAATTACKENDPERSONS = "SET_CURRENT_BITACORAATTACKENDPERSONS"
export const SET_ALLINCIDENCES_BITACORAATTACKENDPERSONS = "SET_ALLINCIDENCES_BITACORAATTACKENDPERSONS"
export const SET_ALLCPB_BITACORAATTACKENDPERSONS = "SET_ALLCPB_BITACORAATTACKENDPERSONS"

export const setAllAttackendPersons = (payload) => ({
  type: SET_ALL_ATTACKENDPERSONS,
  payload,
});

export const setCurrentAttackendPersons = (payload) => ({
  type: SET_CURRENT_ATTACKENDPERSONS, 
  payload,
});

export const setCurrentBitacoraAttackendPersons = (payload) => ({
  type: SET_CURRENT_BITACORAATTACKENDPERSONS, 
  payload,
});
export const setAllIncidencesBitacoraAttackendPersons = (payload) => ({
  type: SET_ALLINCIDENCES_BITACORAATTACKENDPERSONS, 
  payload,
});
export const setAllCpbBitacoraAttackendPersons = (payload) => ({
  type: SET_ALLCPB_BITACORAATTACKENDPERSONS, 
  payload,
});
