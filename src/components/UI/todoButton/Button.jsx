import styled, { css } from "styled-components";

const StyledContainer = styled.div`
  font-size: 10px;

  ${(props) =>
    props.completed &&
    css`
      text-decoration: line-through;
    `}
`;

export default StyledContainer;

