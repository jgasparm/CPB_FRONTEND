import styled,{keyframes} from "styled-components";
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
const Formulario = styled.form`
  width: 800px;
  height: 650px;
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

const TextField = styled.span`
  font-size: 13px;
  line-height: 32px;
  color: #503e9d;
`;

const SectionSearch = styled.section`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;
const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
`;
const ContentSelect = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;
const SelectOption = styled.select`
  width: 350px;
  height: 35px;
  border-radius: 4px;
`;
const ContentInput = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;
const InputText = styled.input`
  width: 350px;
  height: 35px;
  border-radius: 4px;
`;
const FooterButton = styled.div`
  margin-top: 15px;
  display: flex;
  justify-content: end;
  gap: 2px;
`;
export {
  DivContent,
  ContainerModal,
  SectionSearch,
  Formulario,
  TextField,
  ContentBox,
  ContentSelect,
  SelectOption,
  ContentInput,
  InputText,
  FooterButton
};
