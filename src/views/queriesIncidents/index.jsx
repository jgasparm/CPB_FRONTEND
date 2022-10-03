import React, { useEffect, useState } from "react";
import SeacrhInicidentsRow from "../../components/Tables/searchIncidentsRow";
import { FaSearch } from "react-icons/fa";
import "./tablequeriesIncidents.scss";
import {
  Container,
  ContentBox,
  ContentSelect,
  Form,
  HintInput,
  IncidenceFormContainer,
  Input,
  SectionSearch,
  SelectOption,
} from "./style";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setAllQueryIncidences } from "../../app/features/queryIncidence/queriesIncidence";
import ReactPaginate from "react-paginate";
import { allPlacesApi, allTypesIncidencesApi } from "../../api";
import ModalDetailsIncidence from "../../components/modals/modalDetailsIncidence";

const QueriesIncidents = () => {
  const queriesIncidents = useSelector(
    (state) => state.queryIncidence?.allQueryIncidences
  );
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm({});
  const dispatch = useDispatch();

  /****************  Paginate ***************/
  //VRAIABLE DE CANTIDAD DE REGISTROS A MOSTRAR EN LA TABLA
  const numberRecords = 5;

  const [dataToUse, setDataToUse] = useState(queriesIncidents);
  // const incidencesPersons = useSelector(state => state.queryIncidence?.allQueryIncidences);
  const [currentIncidenceItems, setCurrentIncidenceItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0); // useEffect
  const [itemsPerPage] = useState(numberRecords); // useEffect

  const [isEmptyItems, setIsEmptyITems] = useState(false);

  const [stateDetails, setStatelDetails] = useState(false);

  /************** FECHAS *********************/
  const minDateInitial = useState(new Date().toISOString().slice(0, 10));
  const [minDate, setMinDate] = useState(null);

  /************ APIS PARA SELECTS *********/
  const [tiposIncidencias, setTiposIncidencias] = useState(null);
  const [lugarIncidencia, setLugarIncidencia] = useState();

  useEffect(() => {
    // dispatch(setAllQueryIncidences(null));
    setDataToUse(queriesIncidents);
  }, [dataToUse, queriesIncidents]);

  // CALLS APIS
  useEffect(() => {
    let promise1 = allTypesIncidencesApi();
    promise1.then((res) => {
      setTiposIncidencias(res);
    });
    let promise2 = allPlacesApi();
    promise2.then((res) => {
      setLugarIncidencia(res);
    });
    // ACA ME QUEDE <========>
  }, []);

  // PAGINATE OF DATA
  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentIncidenceItems(dataToUse?.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(dataToUse?.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, dataToUse]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % dataToUse?.length;
    setItemOffset(newOffset);
  };

  const onSubmit = async (data) => {
    dispatch(setAllQueryIncidences(null));
    console.log(data);
    const params =
      "ac_inci_origen=" +
      data.selectOrigen +
      "&ac_inci_tipo=" +
      data.selectTipo +
      "&ai_insu_id=" +
      data.selectSubtipo +
      "&ai_inmo_id=" +
      data.selectMotivo +
      "&ac_inci_lugar=" +
      data.selectLugar +
      "&ac_fecha_inicial=" +
      data.dateInicial +
      "&ac_fecha_final=" +
      data.dateFinal;

    await axios(
      "http://localhost:8080/wsCodeigniterCPB/wsConsultaIncidencias.php?" +
        params +
        "",
      {
        mode: "cors",
        method: "GET",
        headers: {
          Accept: "application/json;charset=utf-8",
        },
      }
    ).then((res) => {
      // console.log(res.data);
      if (res.data.length < 1) {
        setIsEmptyITems(true);
      } else {
        setIsEmptyITems(false);
      }
      dispatch(setAllQueryIncidences(res.data));
    });
  };
  return (
    <>
    <ModalDetailsIncidence stateDetails={stateDetails} setStatelDetails={setStatelDetails} />
      <Container>
        <Form id="formConsulta" onSubmit={handleSubmit(onSubmit)}>
          <h4 className="text-center mb-4">Consulta de incidencias</h4>
          <SectionSearch>
            <ContentSelect>
              <ContentBox>
                <HintInput>Origen de incidencia</HintInput>
                <SelectOption
                  {...register("selectOrigen", {
                    required: "required",
                  })}
                >
                  <option value="0">Todos</option>
                  <option value="1">Personal IE a escolares</option>
                  <option value="2">Entre escolares</option>
                </SelectOption>
                {errors.selectOrigen && (
                  <span className="text-danger" role="alert">
                    Campo requerido
                  </span>
                )}
              </ContentBox>
            </ContentSelect>
            <ContentSelect>
              <ContentBox>
                <HintInput>Tipo de incidencia</HintInput>
                <SelectOption
                  {...register("selectTipo", {
                    required: "required",
                  })}
                >
                  <option value="0">Todos</option>
                  {tiposIncidencias?.map((tipo, index) => (
                    <option key={index} value={tipo?.pade_cadena}>
                      {`${tipo?.pade_descripcion}`}
                    </option>
                  ))}
                </SelectOption>
                {errors.selectTipo && (
                  <span className="text-danger" role="alert">
                    Campo requerido
                  </span>
                )}
              </ContentBox>
              <ContentBox>
                <HintInput>Subtipo de incidencia</HintInput>
                <SelectOption
                  {...register("selectSubtipo", {
                    required: "required",
                  })}
                >
                  <option value="0">Todos</option>
                  <option value="1">Con lesiones</option>
                  <option value="2">Sin lesiones</option>
                  <option value="3">Castigo físico</option>
                </SelectOption>
                {errors.selectSubtipo && (
                  <span className="text-danger" role="alert">
                    Campo requerido
                  </span>
                )}
              </ContentBox>
              <ContentBox>
                <HintInput>Rango inicial</HintInput>
                <Input
                  type="date"
                  max="9999-12-31"
                  onSelect={(e) => setMinDate(e?.target?.value)}
                  {...register("dateInicial", {
                    required: "required",
                  })}
                ></Input>
                {errors.dateInicial && (
                  <span className="text-danger" role="alert">
                    Campo requerido
                  </span>
                )}
              </ContentBox>
            </ContentSelect>
            <ContentSelect>
              <ContentBox>
                <HintInput>Motivo de incidencia</HintInput>
                <SelectOption
                  {...register("selectMotivo", {
                    required: "required",
                  })}
                >
                  <option value="0">Todos</option>
                  <option value="1">
                    Sin motivo alguno, sólo por molestar o por burlarse
                  </option>
                  <option value="2">Por su forma de hablar o expresarse</option>
                  <option value="3">Por su ritmo o estilo de aprendizaje</option>
                </SelectOption>
                {errors.selectMotivo && (
                  <span className="text-danger" role="alert">
                    Campo requerido
                  </span>
                )}
              </ContentBox>
              <ContentBox>
                <HintInput>Lugar de incidencia</HintInput>
                <SelectOption
                  {...register("selectLugar", {
                    required: "required",
                  })}
                >
                  <option value="0">Todos</option>
                  {lugarIncidencia?.map((tipo, index) => (
                    <option key={index} value={tipo?.pade_cadena}>
                      {`${tipo?.pade_descripcion}`}
                    </option>
                  ))}
                </SelectOption>
                {errors.selectLugar && (
                  <span className="text-danger" role="alert">
                    Campo requerido
                  </span>
                )}
              </ContentBox>
              <ContentBox>
                <HintInput>Rango final</HintInput>
                <Input
                  type="date"
                  max="9999-12-31"
                  min={minDate}
                  {...register("dateFinal", {
                    required: "required",
                  })}
                ></Input>
                {errors.dateFinal && (
                  <span className="text-danger" role="alert">
                    Campo requerido
                  </span>
                )}
              </ContentBox>
            </ContentSelect>
            <div className="mt-2 d-flex justify-content-end">
              <input
                className="btn btn-sm btn-secondary bg-gradient"
                form="formConsulta"
                type="submit"
                value="Consultar"
              ></input>
            </div>
          </SectionSearch>
          <div className="my-3">
            <div>
              <span className="fw-semibold">Agraviados</span>
              <ol
                className="collection-incidents collection-container-incidents"
                style={{ paddingLeft: "0px" }}
              >
                <li className="item-incidents item-container-incidents">
                  <div className="attribute-title-incidents">Nombres</div>
                  <div className="attribute-title-incidents">Apellidos</div>
                  <div className="attribute-title-incidents">Nivel</div>
                  <div className="attribute-title-incidents">Grado</div>
                  <div className="attribute-title-incidents">
                    Tipo de incidencia
                  </div>
                  <div className="attribute-title-incidents">
                    Subtipo de incidencia
                  </div>
                  <div className="attribute-title-incidents">Acciones</div>
                </li>
                {currentIncidenceItems != null &&
                  currentIncidenceItems?.map((person, index) => (
                    <SeacrhInicidentsRow
                      key={index}
                      id={person.inci_id}
                      name={person?.alum_nombres}
                      lastname={person?.alum_apellidos}
                      level={person?.nivel_descripcion}
                      grade={person?.grado_descripcion}
                      typeIncident={person?.tipo_incidencia}
                      subTypeIncident={person?.subtipo_incidencia}
                      setStatelDetails={setStatelDetails}
                    />
                  ))}
                {isEmptyItems && (
                  <p className="text-center m-1">
                    No se encontraron coincidencias
                  </p>
                )}
      
                {pageCount > 5 && dataToUse?.length > 5 && (
                  <div className="barra">
                    <div style={{ width: "400px", marginLeft: "20px" }}>
                      {dataToUse?.length > 5 && (
                        <ReactPaginate
                          breakLabel={"..."}
                          nextLabel={">"}
                          onPageChange={handlePageClick}
                          pageRangeDisplayed={5}
                          pageCount={pageCount}
                          previousLabel={"<"}
                          renderOnZeroPageCount={null}
                          containerClassName={
                            "paginationBttns d-flex gap-3 align-items-center justify-content-end py-2 pe-2"
                          }
                          previousLinkClassName={
                            "previousBttn btn border border-1"
                          }
                          nextLinkClassName={"nextBttn btn border border-1"}
                          disabledClassName={"paginationDisabled"}
                          activeClassName={"paginationActive btn btn-primary"}
                        />
                      )}
                    </div>
                  </div>
                )}
                {pageCount <= 5 && dataToUse?.length > 5 && (
                  <ReactPaginate
                    breakLabel="..."
                    nextLabel=">"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={pageCount}
                    previousLabel="<"
                    renderOnZeroPageCount={null}
                    containerClassName={
                      "paginationBttns d-flex gap-3 align-items-center justify-content-end py-2 pe-2"
                    }
                    previousLinkClassName={"previousBttn btn border border-1"}
                    nextLinkClassName={"nextBttn btn border border-1"}
                    disabledClassName={"paginationDisabled"}
                    activeClassName={"paginationActive btn btn-primary"}
                  />
                )}
              </ol>
            </div>
          </div>
        </Form>
      </Container>
    </>
  );
};

export default QueriesIncidents;
