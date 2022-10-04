import React from "react";

function EditorImageModal({
  imageModalRef,
  handleUploadImage,
  handleInputImageLink,
  imageLink,
  handleInsertImageLink,
}: any) {
  return (
    <div
      className="p-2 border absolute left-0 -bottom-26 z-50 bg-white"
      ref={imageModalRef}
    >
      <p className="font-bold mb-2">File</p>
      <label
        className="border p-2 cursor-pointer flex items-center justify-center bg-purple-500 text-white rounded-lg"
        htmlFor="image"
      >
        Image upload
      </label>
      <input
        className="hidden"
        type="file"
        name="image"
        id="image"
        accept="image/png, image/jpeg, image/jpg"
        onChange={(e) => handleUploadImage(e.target.files)}
      />
      <p className="font-bold my-2">Image link</p>
      <div className="border border-purple-500 p-1 mb-2">
        <input
          name="imageURL"
          id="imageURL"
          type="text"
          onChange={handleInputImageLink}
          value={imageLink}
          placeholder="Enter your image link"
          className="focus:outline-none"
        />
      </div>
      <button
        className="rounded-lg bg-purple-500 p-2 text-white self-center w-full"
        onClick={handleInsertImageLink}
      >
        Insert image
      </button>
    </div>
  );
}

export default EditorImageModal;
