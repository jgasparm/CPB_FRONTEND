import styled from "styled-components";

const DivContent = styled.div`
  position: relative;
`;
const ContainerModal = styled.div`
  display: grid;
  place-content: center;
  width: 100%;
  height: 100vh;
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  background: rgba(0, 26, 73, 0.12);
`;

const Container = styled.section`
  margin: 25px 0px;
  background-color: #fff;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  padding: 20px;
  @media (min-width: 800px) {
    padding: 20px 16px 20px 16px;
  }
`;

const Form = styled.form`
  background-color: #fff;
  padding: 0px 116px 0px 93px;
  @media (max-width: 890px) {
    padding: 0;
  }
`;
const Formulario = styled.form`
  width: 900px;
  height: 800px;
  position: fixed;
  margin: auto;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 40px 40px;
  background: #fff;
  box-shadow: 0px 2px 4px rgba(0, 72, 217, 0.1),
    0px 24px 60px rgba(0, 72, 217, 0.05), 0px 12px 24px rgba(0, 72, 217, 0.05);
  border-radius: 12px;
  z-index: 150;
  overflow-y: auto;
  > input {
    margin-top: 60px;
  }
  ::-webkit-scrollbar {
    width: 8px; /* Tamaño del scroll en vertical */
    height: 8px; /* Tamaño del scroll en horizontal */
  }
  ::-webkit-scrollbar-thumb {
    background: rgba(158, 158, 158, 0.589);
    border-radius: 4px;
  }
  @media (max-width: 800px) {
    width: 96%;
  }
`;

const IncidenceFormContainer = styled.section`
  display: flex !important;
  flex-direction: column !important;
  gap: 20px !important;
  max-height: 100%;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 49%;
`;

const HintInput = styled.span`
  font-size: 13px;
  line-height: 32px;
  color: #503e9d;
`;

const SelectOption = styled.select`
  width: 320px;
  height: 35px;
  border-radius: 4px;
`;

const Input = styled.input`
  /* max-width: 516px; */
  height: 60px;
  background: none;
  padding: 15px;
  border: 1px solid #828282;
  border-radius: 4px;
  font-size: 18px;
  line-height: 32px;
  color: #113255;
  &:focus {
    outline: none;
    box-shadow: 0px 0px 2px #828282;
  }
`;
const FooterButton = styled.div`
  padding: 0px 116px 0px 93px;
  margin-top: 15px;
  display: flex;
  justify-content: end;
  gap: 2px;
`;
export {
  DivContent,
  ContainerModal,
  Container,
  Formulario,
  Form,
  IncidenceFormContainer,
  InputContainer,
  HintInput,
  SelectOption,
  Input,
  FooterButton,
};
