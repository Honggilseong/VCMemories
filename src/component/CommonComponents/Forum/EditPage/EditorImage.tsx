import { HashLoader } from "react-spinners";

export const RenderImage = (props: any) => {
  const { src } = props.contentState
    .getEntity(props.block.getEntityAt(0))
    .getData();

  return (
    <div className="flex items-center justify-center w-full">
      <img src={src} alt="userImage" className="self-center" />
    </div>
  );
};

// export const RenderVideo = (props: any) => {
//   const { src } = props.contentState
//     .getEntity(props.block.getEntityAt(0))
//     .getData();

//   return (
//     <iframe
//       src={src}
//       title="Youtube player"
//       sandbox="allow-same-origin allow-forms allow-popups allow-scripts allow-presentation"
//     ></iframe>
//   );
// };

export const RenderMedia = (props: any) => {
  const entity = props.contentState.getEntity(props.block.getEntityAt(0));
  const type = entity.getType();

  let media = null;
  if (type === "IMAGE") {
    media = <RenderImage {...props} />;
  }
  // if (type === "VIDEO") {
  //   media = <RenderVideo {...props} />;
  // }
  return media;
};

export const RenderLoadingImage = (props: any) => {
  const { src } = props.contentState
    .getEntity(props.block.getEntityAt(0))
    .getData();
  return (
    <div className="relative">
      <div className="z-50 h-full absolute m-auto left-0 right-0 flex justify-center items-center flex-col">
        <HashLoader color="purple" className="w-full h-full" />
        <p className="text-white font-bold">Uploading...</p>
      </div>
      <img
        src={src}
        alt="userImageLoading"
        className="self-center blur-sm w-full"
        height={540}
      />
      ;
    </div>
  );
};
