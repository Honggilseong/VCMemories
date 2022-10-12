import { useEffect } from "react";
import { useDropzone } from "react-dropzone";
import Carousel from "../../../CommonComponents/Carousel";

interface Props {
  onDrop: (acceptedFiles: any) => void;
  previewImage: any;
}
function DropZone({ onDrop, previewImage }: Props) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/png": [".png"], "image/jpeg": [".jpeg"] },
    multiple: true,
    maxFiles: 10,
    maxSize: 5242880,
  });

  return (
    <div className="h-96 max-w-md">
      {previewImage.length ? (
        <div className="w-full h-full flex items-center justify-center">
          <Carousel
            images={previewImage.map((image: any) => image.preview)}
            preview
          />
        </div>
      ) : (
        <div
          {...getRootProps()}
          className={`border-2 border-purple-500 w-96 h-96 flex flex-col justify-center items-center ${
            isDragActive ? "border" : "border-dashed"
          }`}
        >
          <input {...getInputProps()} />
          <p className="font-bold">Drop your images or click here</p>
          <p className="text-gray-400">(maximum 10)</p>
        </div>
      )}
    </div>
  );
}

export default DropZone;
