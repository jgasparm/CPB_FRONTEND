import axios from "axios";

// DOMINIO Y PUERTO LOCAL
const localhost = "http://localhost:8080/wsCodeigniterCPB/";

const allTurnsApi = async () => {
  const res = await axios(
    localhost + "wsConsultaParametroDetalle.php?ai_paca_id=4",
    {
      mode: "cors",
      method: "GET",
      headers: {
        Accept: "application/json;charset=utf-8",
      },
    }
  ).catch((err) => {
    console.log(err);
  });
  return res.data;
};

const allLevelsApi = async () => {
  const res = await axios(
    localhost + "wsConsultaParametroDetalle.php?ai_paca_id=5",
    {
      mode: "cors",
      method: "GET",
      headers: {
        Accept: "application/json;charset=utf-8",
      },
    }
  ).catch((err) => {
    console.log(err);
  });
  return res.data;
};

const allGradesApi = async () => {
  const res = await axios(
    localhost + "wsConsultaParametroDetalle.php?ai_paca_id=6",
    {
      mode: "cors",
      method: "GET",
      headers: {
        Accept: "application/json;charset=utf-8",
      },
    }
  ).catch((err) => {
    console.log(err);
  });
  return res.data;
};

const allSectionsApi = async () => {
  const res = await axios(
    localhost + "wsConsultaParametroDetalle.php?ai_paca_id=7",
    {
      mode: "cors",
      method: "GET",
      headers: {
        Accept: "application/json;charset=utf-8",
      },
    }
  ).catch((err) => {
    console.log(err);
  });
  return res.data;
};

const allStaffApi = async () => {
  const res = await axios(
    localhost + "wsConsultaParametroDetalle.php?ai_paca_id=8",
    {
      mode: "cors",
      method: "GET",
      headers: {
        Accept: "application/json;charset=utf-8",
      },
    }
  ).catch((err) => {
    console.log(err);
  });
  return res.data;
};

const allTypesIncidencesApi = async () => {
  const res = await axios(
    localhost + "wsConsultaParametroDetalle.php?ai_paca_id=2",
    {
      mode: "cors",
      method: "GET",
      headers: {
        Accept: "application/json;charset=utf-8",
      },
    }
  ).catch((err) => {
    console.log(err);
  });
  return res.data;
};
const allSubTypesIncidencesApi = async () => {
  const res = await axios(
    localhost + "wsConsultaParametroDetalle.php?ai_paca_id=2",
    {
      mode: "cors",
      method: "GET",
      headers: {
        Accept: "application/json;charset=utf-8",
      },
    }
  ).catch((err) => {
    console.log(err);
  });
  return res.data;
};
const allPlacesApi = async () => {
  const res = await axios(
    localhost + "wsConsultaParametroDetalle.php?ai_paca_id=3",
    {
      mode: "cors",
      method: "GET",
      headers: {
        Accept: "application/json;charset=utf-8",
      },
    }
  ).catch((err) => {
    console.log(err);
  });
  return res.data;
};

export {
  allTurnsApi,
  allLevelsApi,
  allGradesApi,
  allSectionsApi,
  allStaffApi,
  allTypesIncidencesApi,
  allSubTypesIncidencesApi,
  allPlacesApi
};
