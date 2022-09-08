import styled from "styled-components";

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

const IncidenceFormContainer = styled.section`
  display: flex !important;
  flex-direction: column !important;
  gap: 16px !important;
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
  Container,
  Form,
  IncidenceFormContainer,
  InputContainer,
  HintInput,
  Input,
  FooterButton,
};
