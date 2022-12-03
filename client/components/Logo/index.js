import Image from "next/image";

export const Logo = ({ width = 150, height = 150, style = {} }) => (
  <Image
    src="/logo.png"
    alt="Picture of the author"
    width={width}
    height={height}
    style={{ ...style }}
  />
);
