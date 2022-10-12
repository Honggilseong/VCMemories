import {
  EditorState,
  DraftEditorCommand,
  RichUtils,
  convertFromRaw,
  convertToRaw,
  Modifier,
  AtomicBlockUtils,
  ContentBlock,
  Editor,
} from "draft-js";
import { useEffect, useRef, useState } from "react";
import { FaItalic, FaUnderline } from "react-icons/fa";
import { RiVideoLine } from "react-icons/ri";
import { GoBold } from "react-icons/go";
import "draft-js/dist/Draft.css";
import { AiOutlineOrderedList, AiOutlineUnorderedList } from "react-icons/ai";
import { BsImage, BsLink45Deg } from "react-icons/bs";
import { linkDecorator } from "./EditorLink";
import { toastError, toastSuccess } from "../../../../util/toast";
import { RenderLoadingImage, RenderMedia } from "./EditorImage";
import { useSelector } from "react-redux";
import { RootState } from "../../../../reducers/store";
import * as api from "../../../../api";
import EditorButton from "./EditorButton";
import EditorHyperlinkModal from "./EditorHyperlinkModal";
import { useInternalRouter } from "../../../../pages/routing";
import Header from "../Main/Header";
import EditorImageModal from "./EditorImageModal";
import EditorVideoModal from "./EditorVideoModal";
import useInterval from "../../../../hooks/useSetInterval";
import { useParams } from "react-router-dom";

const BOARDPOST_SAVE_TIME = 30000;
interface HyperlinkValue {
  displayText: string;
  link: string;
}
interface Props {
  isEdit?: boolean;
}
function EditorComponent({ isEdit }: Props) {
  const [categoryList] = useState<string[]>([
    "Unity",
    "Blender",
    "Questions",
    "Tips",
    "Requests",
    "etc",
  ]);
  const [category, setCategory] = useState<string>("");
  const [editorState, setEditorValue] = useState<EditorState | null>(
    EditorState.createEmpty()
  );
  const [title, setTitle] = useState<string>("");
  const [isLinkOpen, setIsLinkOpen] = useState<boolean>(false);
  const [isImageOpen, setIsImageOpen] = useState<boolean>(false);
  const [isVideoOpen, setIsVideoOpen] = useState<boolean>(false);
  const [imageLink, setImageLink] = useState<string>("");
  const [videoLink, setVideoLink] = useState<string>("");

  const [hyperlinkValue, setHyperlinkValue] = useState<HyperlinkValue>({
    displayText: "",
    link: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const authUser = useSelector((state: RootState) => state.auth);
  const editorRef = useRef(null);
  const inlineType = editorState.getCurrentInlineStyle();
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  const linkModalRef = useRef(
    null
  ) as unknown as React.MutableRefObject<HTMLDivElement>;
  const imageModalRef = useRef(
    null
  ) as unknown as React.MutableRefObject<HTMLDivElement>;
  const videoModalRef = useRef(
    null
  ) as unknown as React.MutableRefObject<HTMLDivElement>;
  const params = useParams();
  const { push, goBack } = useInternalRouter();
  const handleSaveEditor = () => {
    const data = JSON.stringify(convertToRaw(editorState.getCurrentContent()));
    localStorage.setItem("TextEdit", data);
  };

  useInterval(() => {
    handleSaveEditor();
    toastSuccess("Your post has been saved automatically (30s)", 1000);
  }, BOARDPOST_SAVE_TIME);

  const handleKeyCommand = (command: DraftEditorCommand) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorValue(newState);
      return "handled";
    }
    return "not-handled";
  };
  const handleChangeTitleValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const handleClickCategory = (category: string) => {
    setCategory(category);
  };
  const handleUploadPost = async () => {
    if (isLoading)
      return toastError("Please wait until the image has uploaded");
    if (!title) return toastError("Please set your title");
    if (!category) return toastError("Please set the category");
    const editorToRaw = JSON.stringify(
      convertToRaw(editorState.getCurrentContent())
    );
    const boardPost = {
      username: authUser.name,
      createdAt: Date.now(),
      content: editorToRaw,
      category,
      userId: authUser._id,
      channel: "vrchat",
      title,
    };
    try {
      await api.postBoardPost(boardPost);
      toastSuccess("Your post has been shared successfully :)");
      push("/forum/vrchat");
      localStorage.removeItem("TextEdit");
    } catch (e: any) {
      toastError(e.message);
    }
  };
  const handleUploadEditBoardPost = async () => {
    if (isLoading)
      return toastError("Please wait until the image has uploaded");
    if (!title) return toastError("Please set your title");
    if (!category) return toastError("Please set the category");
    const editorToRaw = JSON.stringify(
      convertToRaw(editorState.getCurrentContent())
    );
    const boardPost = {
      username: authUser.name,
      updatedAt: Date.now(),
      content: editorToRaw,
      category,
      userId: authUser._id,
      channel: "vrchat",
      title,
    };
    try {
      await api.updateBoardPost(params.id, boardPost);
      toastSuccess("Your post has been updated successfully :)");
      goBack();
      localStorage.removeItem("TextEdit");
    } catch (e: any) {
      toastError(e.message);
    }
  };
  const handleClickInlineStyleButton = (inlineStyle: string) => {
    setEditorValue(RichUtils.toggleInlineStyle(editorState, inlineStyle));
  };
  const handleClickBlockStyleButton = (blockStyle: string) => {
    setEditorValue(RichUtils.toggleBlockType(editorState, blockStyle));
  };
  const handleOpenLinkModal = () => {
    setIsLinkOpen((prev) => !prev);
  };
  const handleOpenImageModal = () => {
    setIsImageOpen((prev) => !prev);
  };
  const handleInputImageLink = (e: any) => {
    setImageLink(e.target.value);
  };
  const handleOpenVideoModal = () => {
    setIsVideoOpen((prev) => !prev);
  };
  const handleInputVideoLink = (e: any) => {
    setVideoLink(e.target.value);
  };

  const handleGenerateLink = (hyperLink: string, linkDisplayText: string) => {
    const decorator = linkDecorator;
    let link = hyperLink;
    if (!hyperLink.includes("http://")) {
      if (!hyperLink.includes("https://")) {
        link = `http://${hyperLink}`;
      }
    }
    const currentContent = editorState.getCurrentContent();
    currentContent.createEntity("LINK", "MUTABLE", {
      url: link,
      target: "_blank",
    });
    const entityKey = currentContent.getLastCreatedEntityKey();
    const selection = editorState.getSelection();
    const textWithEntity = Modifier.replaceText(
      currentContent,
      selection,
      linkDisplayText,
      editorState.getCurrentInlineStyle(),
      entityKey
    );
    const newState = EditorState.createWithContent(textWithEntity, decorator);
    setEditorValue(newState);
    setHyperlinkValue({ displayText: "", link: "" });
    setIsLinkOpen(false);
  };
  const handleInputHyperlink = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setHyperlinkValue({ ...hyperlinkValue, [name]: value });
  };
  const insertMedia = (mediaType: string, url: any) => {
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
      mediaType,
      "IMMUTABLE",
      {
        src: url,
      }
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(editorState, {
      currentContent: contentStateWithEntity,
    });
    return AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, " ");
  };
  const insertLoadingImage = (url: any) => {
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
      "IMAGE",
      "IMMUTABLE",
      {
        src: URL.createObjectURL(url),
      }
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(editorState, {
      currentContent: contentStateWithEntity,
    });
    return AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, " ");
  };
  const getBase64Data = async (file: Blob) => {
    return new Promise((resolve, reject) => {
      let fileReader = new FileReader();
      fileReader.onerror = () => {
        reject("Err");
      };
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        if (fileReader.result !== undefined) {
          resolve(fileReader.result);
        } else {
          reject("Err");
        }
      };
    });
  };
  const handleUploadImage = async (files: any) => {
    setEditorValue(insertLoadingImage(files[0]));
    setIsLoading(true);
    try {
      await getBase64Data(files[0]).then(async (base64) => {
        const { data } = await api.uploadBoardPostPreviewImage(
          authUser._id,
          base64
        );
        setEditorValue(insertMedia("IMAGE", data.url));
      });
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  const handleInsertImageLink = () => {
    if (!imageLink) return;
    setEditorValue(insertMedia("IMAGE", imageLink));
    setImageLink("");
    setIsLinkOpen(false);
  };
  const handleInsertVideoLink = () => {
    if (!videoLink) return;
    setEditorValue(insertMedia("VIDEO", videoLink));
    setVideoLink("");
    setIsVideoOpen(false);
  };
  const blockRendererFunction = (contentBlock: ContentBlock) => {
    if (contentBlock.getType() === "atomic") {
      return {
        component: isLoading ? RenderLoadingImage : RenderMedia,
        editable: false,
      };
    }
    return null;
  };

  const getBlockStyle = (block: any) => {
    switch (block.getType()) {
      case "header-one":
        return "text-3xl font-bold";
      case "header-two":
        return "text-2xl font-bold";
      case "header-three":
        return "text-xl font-bold";
      default:
        return null;
    }
  };
  useEffect(() => {
    const initializeBoardPostData = async () => {
      if (isEdit) {
        const { data } = await api.getEditBoardPost(params.id);
        if (data.userId !== authUser._id) {
          goBack();
          toastError("Wrong requests");
          return;
        }
        setEditorValue(
          EditorState.createWithContent(
            convertFromRaw(JSON.parse(data.content)),
            linkDecorator
          )
        );
        setCategory(data.category);
        setTitle(data.title);
        return;
      }
      const data = localStorage.getItem("TextEdit");
      const initialState = data
        ? EditorState.createWithContent(
            convertFromRaw(JSON.parse(data)),
            linkDecorator
          )
        : EditorState.createEmpty(linkDecorator);
      setEditorValue(initialState);
    };
    initializeBoardPostData();
  }, []);
  useEffect(() => {
    const handleClickBackground = (e: any) => {
      if (
        isLinkOpen &&
        linkModalRef.current &&
        !linkModalRef.current.contains(e.target)
      )
        setIsLinkOpen(false);
      if (
        isImageOpen &&
        imageModalRef.current &&
        !imageModalRef.current.contains(e.target)
      )
        setIsImageOpen(false);
      if (
        isVideoOpen &&
        videoModalRef.current &&
        !videoModalRef.current.contains(e.target)
      )
        setIsVideoOpen(false);
    };
    document.addEventListener("mousedown", handleClickBackground);
    return () =>
      document.removeEventListener("mousedown", handleClickBackground);
  }, [isLinkOpen, isImageOpen, isVideoOpen]);
  return (
    <div className="w-full h-full">
      <Header />
      <div className="flex flex-col items-center h-full w-full justify-center mt-32">
        <div className="w-[700px] mb-1">
          <div className="flex gap-3">
            {categoryList.map((categoryName, index) => (
              <div
                key={index + Date.now()}
                className={`cursor-pointer rounded-lg p-1 transition duration-150 ease-linear hover:text-purple-500 ${
                  categoryName === category &&
                  "bg-purple-500  text-white  hover:text-white"
                }`}
                onClick={() => handleClickCategory(categoryName)}
              >
                <span>{categoryName}</span>
              </div>
            ))}
          </div>
          <input
            type="text"
            value={title}
            className="flex-1 w-full focus:outline-1 focus:outline-purple-500 p-1"
            onChange={(e) => handleChangeTitleValue(e)}
            placeholder="Title"
            name="title"
            id="title"
          />
        </div>
        <div className="w-[700px] border min-h-[200px]">
          <div className="flex">
            <EditorButton
              name="H1"
              handleClickButton={handleClickBlockStyleButton}
              label="header-one"
              active={blockType === "header-one"}
            />
            <EditorButton
              name="H2"
              handleClickButton={handleClickBlockStyleButton}
              label="header-two"
              active={blockType === "header-two"}
            />
            <EditorButton
              name="H3"
              handleClickButton={handleClickBlockStyleButton}
              label="header-three"
              active={blockType === "header-three"}
            />
            <EditorButton
              Icon={
                <FaItalic
                  color={inlineType.has("ITALIC") ? "white" : undefined}
                />
              }
              handleClickButton={handleClickInlineStyleButton}
              active={inlineType.has("ITALIC")}
              label="ITALIC"
            />
            <EditorButton
              Icon={
                <FaUnderline
                  color={inlineType.has("UNDERLINE") ? "white" : undefined}
                />
              }
              handleClickButton={handleClickInlineStyleButton}
              active={inlineType.has("UNDERLINE")}
              label="UNDERLINE"
            />
            <EditorButton
              Icon={
                <GoBold
                  size={20}
                  color={inlineType.has("BOLD") ? "white" : undefined}
                />
              }
              handleClickButton={handleClickInlineStyleButton}
              active={inlineType.has("BOLD")}
              label="BOLD"
            />
            <EditorButton
              Icon={
                <AiOutlineUnorderedList
                  size={20}
                  color={
                    blockType === "unordered-list-item" ? "white" : undefined
                  }
                />
              }
              handleClickButton={handleClickBlockStyleButton}
              label="unordered-list-item"
              active={blockType === "unordered-list-item"}
            />
            <EditorButton
              Icon={
                <AiOutlineOrderedList
                  size={20}
                  color={
                    blockType === "ordered-list-item" ? "white" : undefined
                  }
                />
              }
              handleClickButton={handleClickBlockStyleButton}
              label="ordered-list-item"
              active={blockType === "ordered-list-item"}
            />
            <div className="relative">
              <EditorButton
                Icon={<BsLink45Deg size={20} />}
                handleClickButton={handleOpenLinkModal}
              />
              {isLinkOpen && (
                <EditorHyperlinkModal
                  linkModalRef={linkModalRef}
                  hyperlinkValue={hyperlinkValue}
                  handleInputHyperlink={handleInputHyperlink}
                  handleOpenLinkModal={handleOpenLinkModal}
                  handleGenerateLink={handleGenerateLink}
                />
              )}
            </div>
            <div className="relative">
              <EditorButton
                Icon={<BsImage size={20} />}
                handleClickButton={handleOpenImageModal}
              />
              {isImageOpen && (
                <EditorImageModal
                  imageModalRef={imageModalRef}
                  handleUploadImage={handleUploadImage}
                  handleInputImageLink={handleInputImageLink}
                  imageLink={imageLink}
                  handleInsertImageLink={handleInsertImageLink}
                />
              )}
            </div>
            <div className="relative">
              <EditorButton
                Icon={<RiVideoLine size={20} />}
                handleClickButton={handleOpenVideoModal}
              />
              {isVideoOpen && (
                <EditorVideoModal
                  videoModalRef={videoModalRef}
                  handleInputVideoLink={handleInputVideoLink}
                  imageLink={videoLink}
                  handleInsertVideoLink={handleInsertVideoLink}
                />
              )}
            </div>
          </div>
          <div className="h-full">
            <Editor
              editorState={editorState}
              onChange={setEditorValue}
              blockStyleFn={getBlockStyle}
              handleKeyCommand={handleKeyCommand}
              ref={editorRef}
              blockRendererFn={blockRendererFunction}
            />
          </div>
        </div>
        <button
          onClick={isEdit ? handleUploadEditBoardPost : handleUploadPost}
          className="rounded-lg p-2 bg-purple-500 text-white w-20 mt-5"
        >
          Post
        </button>
      </div>
    </div>
  );
}

export default EditorComponent;
