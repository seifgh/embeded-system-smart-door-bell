import Text from "antd/lib/typography/Text";
import React, { FC } from "react";
import { ResourceRecordShowProps } from "./types";
import "./styles.scss";
import { Spin } from "antd";

const ResourceRecordShow: FC<ResourceRecordShowProps> = ({
  columns,
  recordData,
  isLoading,
}) => {
  return (
    <Spin spinning={isLoading}>
      <div className="res-record-show">
        {!isLoading &&
          columns.map((col) => (
            <div className="col" key={col.dataIndex}>
              <Text className="title" type="secondary">
                {col.title}
              </Text>
              {col.render ? (
                col.render(recordData[col.dataIndex])
              ) : (
                <Text>{recordData[col.dataIndex]}</Text>
              )}
            </div>
          ))}
      </div>
    </Spin>
  );
};

export default ResourceRecordShow;
