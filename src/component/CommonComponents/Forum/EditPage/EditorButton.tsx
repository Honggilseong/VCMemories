import React from "react";
import { IconType } from "react-icons";
// interface IconTypeProps {
//   size: number;
//   color?: string;
// }
// type IconType = (props: IconTypeProps) => JSX.Element;
interface Props {
  active?: boolean;
  label?: string;
  handleClickButton: (inlineStyle: string) => void;
  Icon?: any;
  name?: string;
  size?: number;
}
function EditorButton({
  active,
  label,
  handleClickButton,
  Icon,
  name,
  size,
}: Props) {
  return (
    <button
      className={`border p-2 cursor-pointer hover:bg-gray-300 h-10 w-10 flex items-center justify-center ${
        name ? "font-bold" : "font-normal"
      }`}
      onClick={() => handleClickButton(label ? label : null)}
    >
      {Icon ? Icon : name}
    </button>
  );
}

export default EditorButton;
