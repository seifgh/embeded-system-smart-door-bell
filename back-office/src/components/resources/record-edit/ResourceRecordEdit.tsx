import { PlusOutlined, SaveOutlined } from "@ant-design/icons";
import { Button, Form } from "antd";
import React, { FC } from "react";
import "./styles.scss";
import { ResourceRecordEditProps } from "./types";

const ResourceRecordEdit: FC<ResourceRecordEditProps> = ({
  fields,
  form,
  onSubmit,
  isUpdateForm,
  children,
}) => {
  return (
    <div className="res-record-create">
      <Form name="basic" layout="vertical" onFinish={onSubmit} form={form}>
        {fields.map((field) => (
          <Form.Item
            key={field.name}
            label={field.label}
            validateStatus={field.validateStatus}
            help={field.help}
            name={field.name}
            rules={field.rules}
            valuePropName={field.valuePropName}
          >
            {field.input}
          </Form.Item>
        ))}

        {children}

        <Form.Item>
          {isUpdateForm ? (
            <Button
              className="submit-btn"
              type="primary"
              htmlType="submit"
              size="large"
              icon={<PlusOutlined />}
            >
              Add new
            </Button>
          ) : (
            <Button
              className="submit-btn"
              type="primary"
              htmlType="submit"
              size="large"
              icon={<SaveOutlined />}
            >
              Save
            </Button>
          )}
        </Form.Item>
      </Form>
    </div>
  );
};

export default ResourceRecordEdit;
