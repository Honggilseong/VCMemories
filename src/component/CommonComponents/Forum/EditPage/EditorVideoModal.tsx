import React from "react";

function EditorVideoModal({
  videoModalRef,
  handleInsertVideoLink,
  handleInputVideoLink,
  videoLink,
}: any) {
  return (
    <div
      className="p-2 border absolute left-0 -bottom-26 z-50 bg-white"
      ref={videoModalRef}
    >
      <label htmlFor="videoURL" className="font-bold my-2">
        Video link
      </label>
      <div className="border border-purple-500 p-1 mb-2">
        <input
          name="videoURL"
          id="videoURL"
          type="text"
          onChange={handleInputVideoLink}
          value={videoLink}
          placeholder="Enter a video link"
          className="focus:outline-none"
        />
      </div>
      <button
        className="rounded-lg bg-purple-500 p-2 text-white self-center w-full"
        onClick={handleInsertVideoLink}
      >
        Insert video
      </button>
    </div>
  );
}

export default EditorVideoModal;
