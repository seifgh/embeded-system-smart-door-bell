import { FormInstance, Rule } from "antd/lib/form";
import { ReactNode } from "react";

export type ResourceRecordEditField = {
  label: ReactNode;
  name: string;
  rules?: Rule[];
  input: ReactNode;
  valuePropName?: string;
  validateStatus?: "success" | "warning" | "error" | "validating";
  help?: string;
};

export type ResourceRecordEditProps = {
  fields: ResourceRecordEditField[];
  form: FormInstance<any>;
  onSubmit: (value: any) => void;
  isUpdateForm?: boolean;
};
