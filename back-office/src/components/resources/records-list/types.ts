import { ReactNode } from "react";
import { PaginationMeta } from "../../../api/services/resources/types";
import { ResourceOnDeleteFunc } from "../types";

export type ResourceRecordsListColumn = {
  title: string;
  dataIndex: string;
  render?: (columnValue: any) => ReactNode;
};

export type ResourceRecordsListProps = {
  columns: ResourceRecordsListColumn[];
  records: any[];
  paginationMeta: PaginationMeta;
  onDelete: ResourceOnDeleteFunc;
};
