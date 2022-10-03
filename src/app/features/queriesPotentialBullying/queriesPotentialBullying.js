export const SET_ALL_QUERYPOTENTIALBULLYING = "SET_ALL_QUERYPOTENTIALBULLYING";
export const SET_CURRENT_QUERYPOTENTIAL = "SET_CURRENT_QUERYPOTENTIALBULLYING"
export const SET_CURRENT_ALUMNOQUERYPOTENTIALBULLYING = "SET_CURRENT_ALUMNOQUERYPOTENTIALBULLYING"

export const setAllQueryPotentialBullying = (payload) => ({
  type: SET_ALL_QUERYPOTENTIALBULLYING,
  payload,
});

export const setCurrentQueryPotentialBullying = (payload) => ({
  type: SET_CURRENT_QUERYPOTENTIALBULLYING, 
  payload,
});
export const setCurrentAlumnoQueryPotentialBullying = (payload) => ({
  type: SET_CURRENT_ALUMNOQUERYPOTENTIALBULLYING, 
  payload,
});