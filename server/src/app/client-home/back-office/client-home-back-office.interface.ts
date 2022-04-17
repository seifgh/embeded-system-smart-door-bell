import { ClientData } from 'src/app/client/back-office/client-back-office.interface';

export class ClientHomeData {
  id: number;
  raspberryPiCartKey: string;
  name: string;

  owner: ClientData;
  members: ClientData[];

  createdAt: Date;
  updatedAt: Date;
}
