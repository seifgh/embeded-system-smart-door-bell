import { HttpException, HttpStatus } from '@nestjs/common';
import { FILE_IS_NOT_IMAGE_BODY_RESPONSE } from 'src/shared/body-responses';

export const imageFileFilter = (_, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
    return callback(
      new HttpException(
        FILE_IS_NOT_IMAGE_BODY_RESPONSE,
        HttpStatus.BAD_REQUEST,
      ),
      false,
    );
  }
  callback(null, true);
};

export const setFileName = (_, file, callback) => {
  callback(null, `${Date.now()}-${file.originalname}`);
};
