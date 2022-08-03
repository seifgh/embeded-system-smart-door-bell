import { PaginatedResponse } from "./types";

export interface ResourceId {
  id: number | string;
}

export interface ResourceTimestamps {
  createdAt: string;
  updatedAt: string;
}

export interface BaseResource<
  ListRecordType,
  ShowRecordType,
  CreateRecordType,
  UpdateRecordType
> {
  // formatRecord(record: any): ResourceRecordType;
  getMany(page: number): Promise<PaginatedResponse<ListRecordType>>;
  getOne(id: number | string): Promise<ShowRecordType>;
  create(item: CreateRecordType): Promise<void>;
  update(id: number | string, updatedItem: UpdateRecordType): Promise<void>;
  deleteOne(id: number | string): Promise<void>;
}
