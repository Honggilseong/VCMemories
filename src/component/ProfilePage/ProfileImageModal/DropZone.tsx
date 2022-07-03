import { useDropzone } from "react-dropzone";
interface Props {
  onDrop: (acceptedFiles: any) => void;
  previewImage: any;
}
function DropZone({ onDrop, previewImage }: Props) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/png": [".png"], "image/jpeg": [".jpeg"] },
    multiple: false,
  });
  return (
    <>
      {previewImage.length ? (
        <div className="flex items-center justify-center">
          {previewImage.map((file: any) => (
            <div
              className="w-36 h-36 rounded-full overflow-hidden border-4 border-green-500"
              key={1}
            >
              <img
                src={file.preview}
                alt="userPicture"
                className="w-full h-full"
              />
            </div>
          ))}
        </div>
      ) : (
        <div
          {...getRootProps()}
          className={`border-2 border-purple-500 w-96 h-96 flex justify-center items-center ${
            isDragActive ? "border" : "border-dashed"
          }`}
        >
          <input {...getInputProps()} />
          <p className="font-bold">Drop your image or click here</p>
        </div>
      )}
    </>
  );
}

export default DropZone;
