import React, { useEffect, useState } from "react";
import "./tablequeriesIncidents.scss";
import {
    Container,
    ContentBox,
    ContentSelect,
    Form,
    HintInput,
    IncidenceFormContainer,
    Input,
    InputText,
    SectionSearch,
    SelectOption,
} from "./style";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import ReactPaginate from "react-paginate";
import SearchPotentialBullyingRow from "../../components/Tables/searchPotentialBullyingRow";
import {
    allGradesApi,
    allLevelsApi,
    allSectionsApi,
    allTurnsApi,
} from "../../api";
import { setAllQueryPotentialBullying } from "../../app/features/queriesPotentialBullying/queriesPotentialBullying";

const QueriesPotentialBullyin = () => {

    const queriesPotentialBullying = useSelector((state) => state.queryPotentialBullying?.allQueryPotentialBullying);

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

    const [dataToUse, setDataToUse] = useState(queriesPotentialBullying);
    const [currentIncidenceItems, setCurrentIncidenceItems] = useState(null);
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0); // useEffect
    const [itemsPerPage] = useState(numberRecords); // useEffect
    const [isEmptyItems, setIsEmptyITems] = useState(false);

    /****************  Validacion para CAMPO DE APELLIDOS Y NOMBRES ***************/
    const regex = new RegExp("^[ñíóáéú a-zA-Z ]+$");

    /****************  Paginate ***************/
    //VRAIABLE DE CANTIDAD DE REGISTROS A MOSTRAR EN LA TABLA

    /************** FECHAS *********************/
    const minDateInitial = useState(new Date().toISOString().slice(0, 10));
    const [minDate, setMinDate] = useState(null);

    const [allturns, setAllTurns] = useState(null);
    const [allLevels, setAllLevels] = useState(null);
    const [allGrades, setAllGrades] = useState(null);
    const [allSections, setAllSections] = useState(null);
    // CALL APIS
    useEffect(() => {
        let promise1 = allTurnsApi();
        promise1.then((res) => {
            setAllTurns(res);
        });
        let promise2 = allLevelsApi();
        promise2.then((res) => {
            setAllLevels(res);
        });
        let promise3 = allGradesApi();
        promise3.then((res) => {
            setAllGrades(res);
        });
        let promise4 = allSectionsApi();
        promise4.then((res) => {
            setAllSections(res);
        });
    }, []);
    
    useEffect(() => {
        // dispatch(setAllQueryIncidences(null));
        setDataToUse(queriesPotentialBullying);
    }, [dataToUse, queriesPotentialBullying]);

      // PAGINATE OF DATA
    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
        setCurrentIncidenceItems(dataToUse?.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(dataToUse?.length / itemsPerPage));
    }, [itemOffset, itemsPerPage, dataToUse]);

    const onSubmit = async (data) => {
        dispatch(setAllQueryPotentialBullying(null));
        console.log(data);
        const params =
        "ac_alum_turno=" + data.selectTurn +
        "&ac_alum_nivel=" + data.selectLevel +
        "&ac_alum_grado=" + data.selectGrade +
        "&ac_alum_seccion=" + data.selectSection +
        "&av_alum_apellidos=" + data.apellidos +
        "&av_alum_nombres=" + data.nombres;
        // "&ac_fecha_inicial=" + data.dateInicial +
        // "&ac_fecha_final=" + data.dateFinal;
        
        await axios(
            "http://localhost:8080/wsCodeigniterCPB/wsConsultaCPB.php?" + params +"",
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
                dispatch(setAllQueryPotentialBullying(res.data));
            }
        });
    };

    return (
        <Container>
            <Form id="formConsulta" onSubmit={handleSubmit(onSubmit)}>
                <h4 className="text-center mb-4">
                    Lista de casos potenciales de Bullying
                </h4>
                <SectionSearch>
                    <ContentSelect>
                        <ContentBox>
                            <HintInput>Turno</HintInput>
                            <SelectOption
                                {...register("selectTurn", {
                                    required: "required",
                                })}
                                control={control}
                            >
                                <option value="0">Todos</option>
                                {allturns?.map((turn, index) => (
                                    <option key={index} value={turn?.pade_cadena}>
                                        {`${turn?.pade_descripcion}`}
                                    </option>
                                ))}
                            </SelectOption>
                            {errors.selectTurn && (
                                <p style={{ color: "red" }}>Campo obligatorio</p>
                            )}
                        </ContentBox>
                        <ContentBox>
                            <HintInput>Nivel</HintInput>
                            <SelectOption
                                {...register("selectLevel", {
                                    required: "required",
                                })}
                                control={control}
                            >
                                <option value="0">Todos</option>
                                {allLevels?.map((level, index) => (
                                    <option key={index} value={level?.pade_cadena}>
                                        {`${level?.pade_descripcion}`}
                                    </option>
                                ))}
                            </SelectOption>
                            {errors.selectLevel && (
                                <p style={{ color: "red" }}>Campo obligatorio</p>
                            )}
                        </ContentBox>
                    </ContentSelect>
                    <ContentSelect>
                        <ContentBox>
                            <HintInput>Grado</HintInput>
                            <SelectOption
                                {...register("selectGrade", {
                                    required: "required",
                                })}
                                control={control}
                                defaultValue={""}
                            >
                                <option value="0">Todos</option>
                                {allGrades?.map((Grade, index) => (
                                    <option key={index} value={Grade?.pade_cadena}>
                                        {`${Grade?.pade_descripcion}`}
                                    </option>
                                ))}
                            </SelectOption>
                            {errors.selectGrade && (
                                <p style={{ color: "red" }}>Campo obligatorio</p>
                            )}
                        </ContentBox>
                        <ContentBox>
                            <HintInput>Sección</HintInput>
                            <SelectOption
                                {...register("selectSection", {
                                    required: "required",
                                })}
                            >
                                <option value="0">Todos</option>
                                {allSections?.map((Section, index) => (
                                    <option key={index} value={Section?.pade_cadena}>
                                        {`${Section?.pade_descripcion}`}
                                    </option>
                                ))}
                            </SelectOption>
                            {/* {errors.selectSection && <p style={{ color: 'red' }}>Campo obligatorio</p>} */}
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
                            <HintInput>Apellidos</HintInput>
                            <InputText
                                placeholder="apellidos"
                                maxLength="100"
                                id="apellidos"
                                {...register("apellidos", {
                                    // required: "required",
                                    pattern: {
                                        value: regex,
                                    },
                                })}
                            ></InputText>
                            {errors.apellidos && (
                                <span className="text-danger" role="alert">
                                    Ingrese solo letras
                                </span>
                            )}
                        </ContentBox>
                        <ContentBox>
                            <HintInput>Nombres</HintInput>
                            <InputText
                                placeholder="nombres"
                                maxLength="100"
                                id="nombres"
                                {...register("nombres", {
                                    // required: "required",
                                    pattern: {
                                        value: regex,
                                    },
                                })}
                            ></InputText>
                            {errors.nombres && (
                                <span className="text-danger" role="alert">
                                    Ingrese solo letras
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
                        <span className="fw-semibold">Casos potenciales de bullying</span>
                        <ol
                            className="collection-incidents collection-container-incidents"
                            style={{ paddingLeft: "0px" }}
                        >
                            <li className="item-incidents item-container-incidents">
                                <div className="attribute-title-incidents">Nombres</div>
                                <div className="attribute-title-incidents">Apellidos</div>
                                <div className="attribute-title-incidents">Fecha y Hora</div>
                                <div className="attribute-title-incidents">Motivo</div>
                                <div className="attribute-title-incidents">
                                    Acción realizada
                                </div>
                                <div className="attribute-title-incidents">
                                    Resultados Esperados
                                </div>
                                <div className="attribute-title-incidents">Acciones</div>
                            </li>
                            {/*****   PAGINADO DE REGISTROS DE CASOS POTENCIALES ********/}
                             {currentIncidenceItems != null &&
                            currentIncidenceItems?.map((person, index) => (
                            <SearchPotentialBullyingRow
                                key={index}
                                id={person.inci_id}
                                name={person?.alum_nombres}
                                lastname={person?.alum_apellidos}
                                date={person?.turno_descripcion}
                                reason={person?.nivel_descripcion}
                                action={person?.grado_descripcion}
                                results={person?.alum_descripcion_estado}
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
    );
};

export default QueriesPotentialBullyin;
