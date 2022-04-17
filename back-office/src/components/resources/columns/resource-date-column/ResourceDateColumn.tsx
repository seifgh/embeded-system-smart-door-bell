import { CalendarOutlined, FieldTimeOutlined } from "@ant-design/icons";
import React, { FC } from "react";
import "./styles.scss";

type Props = {
  date: Date;
};

const ResourceDateColumn: FC<Props> = ({ date }) => {
  const formattedDate = date.toLocaleDateString();
  const formattedTime = date.toLocaleTimeString();
  return (
    <div className="resource-date-col">
      <div>
        <CalendarOutlined className="icon" />
        {formattedDate}
      </div>
      <div>
        <FieldTimeOutlined className="icon" />
        {formattedTime}
      </div>
    </div>
  );
};

export default ResourceDateColumn;
