import { AdminRole } from "../../../constants/enums";
import httpClient from "../../httpClient";
import { BaseResource, ResourceId, ResourceTimestamps } from "./interfaces";
import { PaginatedResponse } from "./types";

interface BaseAdminRecord {
  fullName: string;
  email: string;
  role: AdminRole;
}

export interface ListAdminRecord
  extends ResourceId,
    BaseAdminRecord,
    ResourceTimestamps {}

export interface ShowAdminRecord
  extends ResourceId,
    BaseAdminRecord,
    ResourceTimestamps {}

export interface CreateAdminRecord extends BaseAdminRecord {
  password: string;
}

export interface UpdateAdminRecord extends BaseAdminRecord {
  password?: string;
}

class AdminResourceService
  implements
    BaseResource<
      ListAdminRecord,
      ShowAdminRecord,
      CreateAdminRecord,
      UpdateAdminRecord
    >
{
  static URL_PREFIX = "/admins";

  async getMany(page: number): Promise<PaginatedResponse<ListAdminRecord>> {
    const { data } = await httpClient.get<PaginatedResponse<ListAdminRecord>>(
      AdminResourceService.URL_PREFIX,
      {
        params: {
          page,
        },
      }
    );
    return {
      items: data.items,
      meta: data.meta,
    };
  }

  async getOne(id: string | number): Promise<ShowAdminRecord> {
    const { data } = await httpClient.get<ShowAdminRecord>(
      AdminResourceService.URL_PREFIX + "/" + id
    );
    return data;
  }

  create(item: CreateAdminRecord): Promise<void> {
    return httpClient.post(AdminResourceService.URL_PREFIX, item);
  }

  update(id: string | number, updatedItem: UpdateAdminRecord): Promise<void> {
    if (!updatedItem.password) {
      delete updatedItem.password;
    }

    return httpClient.put(
      AdminResourceService.URL_PREFIX + "/" + id,
      updatedItem
    );
  }

  deleteOne(id: string | number): Promise<void> {
    return httpClient.delete(AdminResourceService.URL_PREFIX + "/" + id);
  }
}

const adminResourceService = new AdminResourceService();

export default adminResourceService;
