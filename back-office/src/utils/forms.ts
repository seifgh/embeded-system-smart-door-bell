import { Rule } from "antd/lib/form";

export const getFileFieldValue = (e: any) => {
  if (e.fileList.length) {
    return [e.fileList[e.fileList.length - 1]];
  }
  return e.fileList;
};

export const emailValidationRules: Rule[] = [
  { required: true, message: "Email is missing" },
  { type: "email", message: "Please type a valid email" },
];

export const passwordValidationRules: Rule[] = [
  { required: true, message: "Password is missing" },
];

export const fullNameValidationRules: Rule[] = [
  { required: true, message: "Full name is missing" },
];

export const clientImageValidationRules: Rule[] = [
  { required: true, message: "Image is missing" },
];
