import httpClient from "../../httpClient";
import { ShowClientRecord } from "./clientResource";
import { BaseResource, ResourceId, ResourceTimestamps } from "./interfaces";
import { PaginatedResponse } from "./types";

interface BaseClientHomeRecord {
  name: string;
}

export interface ShowClientHomeRecord
  extends ResourceId,
    BaseClientHomeRecord,
    ResourceTimestamps {
  raspberryPiCartKey: string;
  owner: ShowClientRecord;
  members: ShowClientRecord[];
}

export interface ListClientHomeRecord
  extends ResourceId,
    BaseClientHomeRecord,
    ResourceTimestamps,
    ShowClientHomeRecord {}

export interface CreateClientHomeRecord extends BaseClientHomeRecord {
  ownerId: number;
  membersIds: number[];
}

export interface UpdateClientHomeRecord
  extends BaseClientHomeRecord,
    CreateClientHomeRecord {}

class ClientHomeResourceService
  implements
    BaseResource<
      ListClientHomeRecord,
      ShowClientHomeRecord,
      CreateClientHomeRecord,
      UpdateClientHomeRecord
    >
{
  static URL_PREFIX = "/clients-home";

  async getMany(
    page: number
  ): Promise<PaginatedResponse<ListClientHomeRecord>> {
    const { data } = await httpClient.get<
      PaginatedResponse<ListClientHomeRecord>
    >(ClientHomeResourceService.URL_PREFIX, {
      params: {
        page,
      },
    });
    return {
      items: data.items,
      meta: data.meta,
    };
  }

  async getOne(id: string | number): Promise<ShowClientHomeRecord> {
    const { data } = await httpClient.get<ShowClientHomeRecord>(
      ClientHomeResourceService.URL_PREFIX + "/" + id
    );
    return data;
  }

  create(item: CreateClientHomeRecord): Promise<void> {
    return httpClient.post(ClientHomeResourceService.URL_PREFIX, item);
  }

  update(
    id: string | number,
    updatedItem: UpdateClientHomeRecord
  ): Promise<void> {
    return httpClient.put(
      ClientHomeResourceService.URL_PREFIX + "/" + id,
      updatedItem
    );
  }

  deleteOne(id: string | number): Promise<void> {
    return httpClient.delete(ClientHomeResourceService.URL_PREFIX + "/" + id);
  }
}

const clientHomeResourceService = new ClientHomeResourceService();

export default clientHomeResourceService;
