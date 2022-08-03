import React, { FC } from "react";
import { MEDIA_PROVIDER_BASE_URL } from "../../../../configs";
import "./styles.scss";

type Props = {
  src: string;
  alt: string;
};

const ResourceImageColumn: FC<Props> = ({ src, alt }) => {
  return (
    <img
      className="res-img-col"
      src={MEDIA_PROVIDER_BASE_URL + src}
      alt={alt}
    />
  );
};

export default ResourceImageColumn;
