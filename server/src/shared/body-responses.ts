export const UNIQUE_EMAIL_BODY_RESPONSE = {
  error: 'uniqueEmailError',
  message: 'Item with this email already exists.',
};

export const NOT_FOUND_BODY_RESPONSE = {
  error: 'notFound',
  message: 'Item with this id does not exists',
};

export const IMAGE_REQUIRED_BODY_RESPONSE = {
  error: 'imageRequired',
  message: 'Image is required',
};

export const FILE_IS_NOT_IMAGE_BODY_RESPONSE = {
  error: 'fileNotAllowed',
  message: 'File type is not allowed (jpg|jpeg|png)',
};
