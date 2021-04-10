import styled from "styled-components/macro";
import { medium } from "../../styles/media-queries";

export const MobileMenuIcon = styled.div`
  width: 30px;
  height: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  z-index: 3;

  span {
    height: 4px;
    width: 30px;
    background: var(--color-text);
    border-radius: 2px;
  }

  ${medium} {
    display: none;
  }
`;
