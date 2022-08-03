import httpClient from "../../httpClient";
import { BaseResource, ResourceId, ResourceTimestamps } from "./interfaces";
import { PaginatedResponse } from "./types";

interface BaseClientRecord {
  fullName: string;
  email: string;
}

export interface ListClientRecord
  extends ResourceId,
    BaseClientRecord,
    ResourceTimestamps {
  imageUrl: string;
}

export interface ShowClientRecord
  extends ResourceId,
    BaseClientRecord,
    ResourceTimestamps {
  imageUrl: string;
}

export interface CreateClientRecord extends BaseClientRecord {
  password: string;
  image: any;
}

export interface UpdateClientRecord extends BaseClientRecord {
  password?: string;
  image?: any;
}

class ClientResourceService
  implements
    BaseResource<
      ListClientRecord,
      ShowClientRecord,
      CreateClientRecord,
      UpdateClientRecord
    >
{
  static URL_PREFIX = "/clients";

  async getMany(page: number): Promise<PaginatedResponse<ListClientRecord>> {
    const { data } = await httpClient.get<PaginatedResponse<ListClientRecord>>(
      ClientResourceService.URL_PREFIX,
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

  async getOne(id: string | number): Promise<ShowClientRecord> {
    const { data } = await httpClient.get<ShowClientRecord>(
      ClientResourceService.URL_PREFIX + "/" + id
    );
    return data;
  }

  create(item: CreateClientRecord): Promise<void> {
    const formData = new FormData();
    formData.append("fullName", item.fullName);
    formData.append("email", item.email);
    formData.append("password", item.password);
    formData.append("image", item.image[0].originFileObj);

    return httpClient.post(ClientResourceService.URL_PREFIX, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  update(id: string | number, updatedItem: UpdateClientRecord): Promise<void> {
    const formData = new FormData();
    if (updatedItem.password) {
      formData.append("password", updatedItem.password);
    }
    if (updatedItem.image && updatedItem.image.length) {
      formData.append("image", updatedItem.image[0].originFileObj);
    }
    formData.append("fullName", updatedItem.fullName);
    formData.append("email", updatedItem.email);

    return httpClient.put(
      ClientResourceService.URL_PREFIX + "/" + id,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
  }

  deleteOne(id: string | number): Promise<void> {
    return httpClient.delete(ClientResourceService.URL_PREFIX + "/" + id);
  }

  async searchByEmail(emailSearchQuery: string): Promise<ListClientRecord[]> {
    const { data } = await httpClient.get<ListClientRecord[]>(
      ClientResourceService.URL_PREFIX + "/search/" + emailSearchQuery
    );
    return data;
  }
}

const clientResourceService = new ClientResourceService();
export default clientResourceService;
