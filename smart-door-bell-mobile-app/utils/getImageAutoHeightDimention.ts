import Layout from "../constants/Layout";

export default function getImageAutoHeightDimension(
  width: number,
  height: number,
  toWidth: number = Layout.screen.width,
  maxWidth: number = Layout.screen.width
) {
  if (toWidth > maxWidth) toWidth = maxWidth;
  return {
    width: toWidth,
    height: height * (toWidth / width),
  };
}
