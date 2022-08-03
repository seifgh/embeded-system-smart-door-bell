import { FC } from "react";
import { Link } from "react-router-dom";
import LogoImg from "./../../assets/images/logo.png";

type LogoProps = {
  className?: string;
};

const Logo: FC<LogoProps> = ({ className }: LogoProps) => {
  return (
    <Link className={className} to={"/"}>
      <img src={LogoImg} alt="Smart door bell logo" />
    </Link>
  );
};

export default Logo;
