import styled from "styled-components";

export const Form = styled.form`
  display: flex;
  gap: 10px;
  align-items: stretch;
  flex-wrap: wrap;
  justify-content: flex-end;

  margin-bottom: 10px;
`;

export const TextArea = styled.textarea`
  resize: none;
  flex: 1;
`;

export const ErrorLabel = styled.label`
  color: red;
  order: 3;
  flex-basis: 100%;
  text-align: left;
`;
