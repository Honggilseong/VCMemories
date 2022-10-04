import React from "react";
interface Props {
  linkModalRef: React.MutableRefObject<HTMLDivElement>;
  hyperlinkValue: { displayText: string; link: string };
  handleInputHyperlink: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleOpenLinkModal: () => void;
  handleGenerateLink: (hyperLink: string, linkDisplayText: string) => void;
}
function EditorHyperlinkModal({
  linkModalRef,
  hyperlinkValue,
  handleInputHyperlink,
  handleOpenLinkModal,
  handleGenerateLink,
}: Props) {
  return (
    <div
      className="absolute -bottom-62 left-0 z-50 bg-white border p-3"
      ref={linkModalRef}
    >
      <p className="text-center text-2xl font-bold mb-5">Hyperlink</p>
      <label htmlFor="displayText">Display text</label>
      <div className="border border-purple-500 p-1 mb-2">
        <input
          type="text"
          id="displayText"
          name="displayText"
          placeholder="Enter display text"
          className="focus:outline-none"
          value={hyperlinkValue.displayText}
          onChange={handleInputHyperlink}
        />
      </div>
      <label htmlFor="link">Hyperlink</label>
      <div className="border border-purple-500 p-1 mb-2">
        <input
          type="text"
          id="link"
          name="link"
          placeholder="Enter hyperlink"
          value={hyperlinkValue.link}
          onChange={handleInputHyperlink}
          className="focus:outline-none"
        />
      </div>
      <div className="flex gap-2 justify-end mt-5">
        <button
          className="p-1 rounded-lg border w-16 bg-gray-400 text-white hover:bg-gray-500"
          onClick={handleOpenLinkModal}
        >
          Cancel
        </button>
        <button
          className="p-1 rounded-lg border bg-purple-500 text-white w-16 hover:bg-purple-600"
          onClick={() =>
            handleGenerateLink(hyperlinkValue.link, hyperlinkValue.displayText)
          }
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default EditorHyperlinkModal;
