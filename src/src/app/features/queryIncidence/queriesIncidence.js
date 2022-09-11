export const SET_ALL_QUERYINCIDENCE = "SET_ALL_QUERYINCIDENCE";
export const SET_CURRENT_QUERYINCIDENCE = "SET_CURRENT_QUERYINCIDENCE"
export const SET_CURRENT_ALUMNOQUERYINCIDENCE = "SET_CURRENT_ALUMNOQUERYINCIDENCE"

export const setAllQueryIncidences = (payload) => ({
  type: SET_ALL_QUERYINCIDENCE,
  payload,
});

export const setCurrentQueryIncidences = (payload) => ({
  type: SET_CURRENT_QUERYINCIDENCE, 
  payload,
});
export const setCurrentAlumnoQueryIncidences = (payload) => ({
  type: SET_CURRENT_ALUMNOQUERYINCIDENCE, 
  payload,
});