import styled from "styled-components";

export const Todo = styled.div`
  display: flex;
  column-gap: 10px;
  text-align: initial;

  p {
    margin: 0;
    flex: 1;
  }
`;

export const DeleteButton = styled.button`
  place-self: baseline;
`;
