import React from "react";

type Props = {
  imageUrl: string;
  className?: string;
  alt?: string;
  width?: number;
  height?: number;
};

const JanImage: React.FC<Props> = ({
  imageUrl,
  className = "",
  alt = "",
  width,
  height,
}) => {
  const url = imageUrl.startsWith("https")
    ? `${process.env.NEXT_PUBLIC_DEV_BUCKET_URL}/${imageUrl.split("/").pop()}`
    : imageUrl;

  return (
    <img
      width={width}
      height={height}
      src={url}
      alt={alt}
      className={className}
    />
  );
};

export default JanImage;
