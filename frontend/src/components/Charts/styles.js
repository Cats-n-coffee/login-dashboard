import styled from "styled-components/macro";
import { medium } from "../../styles/media-queries";

export const ChartWrapper = styled.div`
  background: var(--color-boxes);
  border-radius: 6px;
  max-width: 467px;
  height: auto;
  line-height: 0;
  width: 100%;
  overflow: hidden;

  ${medium} {
    [data-highcharts-chart] {
      width: 100%;
      max-width: 460px;
    }
  }
`;
