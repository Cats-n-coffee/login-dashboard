import { Injectable } from '@nestjs/common';
import graphData from './datasets/data-graphs';
import tableData from './datasets/data-table';

@Injectable()
export class DashboardService {
  getData() {
    return { graph: graphData, table: tableData };
  }
}
