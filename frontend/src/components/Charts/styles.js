import { css } from "styled-components/macro";
import { medium } from "../../styles/media-queries";

export const ChartWrapper = css`
  background: var(--color-boxes);
  border-radius: 6px;
  /* max-width: 400px; */
  height: auto;
  line-height: 0;
  width: 100%;
  overflow: hidden;

  ${medium} {
    width: auto;

    [data-highcharts-chart] {
      width: 100%;
      max-width: 400px;
    }
  }
`;
