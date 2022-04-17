import { ReactNode } from "react";

export type ResourceRecordShowColumn = {
  title: string;
  dataIndex: string;
  render?: (columnValue: any) => ReactNode;
};

export type ResourceRecordShowProps = {
  recordData: any;
  columns: ResourceRecordShowColumn[];
  isLoading: boolean;
};
