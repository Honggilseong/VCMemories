import { Image, Transformation } from "cloudinary-react";
import React from "react";
interface Props {
  image: string;
}
function CloudinaryImage({ image }: Props) {
  return (
    <Image
      cloudName={process.env.REACT_APP_CLOUDINARY_USERNAME}
      publicId={image}
      className="w-full h-full"
      crop="scale"
      loading="lazy"
    >
      <Transformation quality="auto" />
    </Image>
  );
}

export default CloudinaryImage;
