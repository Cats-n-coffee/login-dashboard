import styled from "styled-components/macro";

export const ToggleButtonStyled = styled.button`
  width: 45px;
  height: 22px;
  background: var(--color-titles);
  border-radius: 35px;
  position: relative;

  &:before {
    content: "";
    position: absolute;
    top: 3px;
    left: 3px;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: var(--color-background);
    display: block;
    transition: all 500ms;
  }

  &.toggle {
    &:before {
      transform: translateX(22px);
    }
  }
`;
