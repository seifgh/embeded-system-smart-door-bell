import React, { FC } from "react";
import { Link } from "react-router-dom";
import { ShowClientRecord } from "../../../../api/services/resources/clientResource";
import ResourceImageColumn from "../resource-image-column/ResourceImageColumn";
import "./styles.scss";

type Props = {
  client: ShowClientRecord;
};

const ClientHomeResourceClientColumn: FC<Props> = ({ client }) => {
  return (
    <Link to={"/client/show/" + client.id} className="res-client-col">
      <ResourceImageColumn src={client.imageUrl} alt={client.fullName} />
      <div className="details">
        <b>{client.fullName}</b>
        <small>{client.email}</small>
      </div>
    </Link>
  );
};

export default ClientHomeResourceClientColumn;
