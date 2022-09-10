export const SET_ALL_AGRRESSORPERSONS = "SET_ALL_AGRRESSORPERSONS";
export const SET_CURRENT_AGRRESSORPERSONS = "SET_CURRENT_AGRRESSORPERSONS"

export const setAllAgrressorPersons = (payload) => ({
  type: SET_ALL_AGRRESSORPERSONS,
  payload,
});

export const setCurrentAgrressorPersons = (payload) => ({
  type: SET_CURRENT_AGRRESSORPERSONS, 
  payload,
});