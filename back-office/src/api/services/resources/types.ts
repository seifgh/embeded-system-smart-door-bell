export type PaginationMeta = {
  totalItems: number;
  currentPage: number;
  itemsPerPage: number;
  totalPages: number;
};
export type PaginatedResponse<ResourceRecordType> = {
  items: ResourceRecordType[];
  meta: PaginationMeta;
};
