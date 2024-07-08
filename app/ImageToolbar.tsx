import { Editor, isNodeSelection } from "@tiptap/react";
import { useState, ChangeEvent } from "react";
import { ImageAttributes } from "./ImageExtension";
import { ExpandIcon } from "./icons/ExpandIcon";
import { ShrinkIcon } from "./icons/ShrinkIcon";
import ImageFrameIcon from "./icons/ImageFrameIcon";

const activeColor = "rgb(14 165 233)";
const defaultColor = "#798184";

export function ImageToolbar({ editor }: { editor: Editor }) {
  const [visibleAltTextInput, setVisibleAtlTextInput] = useState(false);
  const [altText, setAltText] = useState("");

  const { selection } = editor.state;

  if (!isNodeSelection(selection) || selection.node.type.name !== "image")
    return false;

  const imageAttrs = selection.node.attrs as ImageAttributes;

  const isActiveAlt = imageAttrs.alt !== "";
  const isDefaultSize = imageAttrs["data-size"] === "default";
  const isDefaultStyle = imageAttrs["data-style"] === "default";

  const handleChangeSize = () => {
    editor.commands.updateAttributes("image", {
      "data-size": isDefaultSize ? "small" : "default",
    });
  };

  const handleChangeStyle = () => {
    editor.commands.updateAttributes("image", {
      "data-style": isDefaultStyle ? "photo-frame" : "default",
    });
  };

  const handleVisibleAltTextInput = () => {
    setVisibleAtlTextInput(true);
    setAltText(imageAttrs.alt);
  };

  const handleChangeAltText = (e: ChangeEvent<HTMLInputElement>) => {
    setAltText(e.target.value);
  };

  const applyAltText = () => {
    editor.commands.updateAttributes("image", {
      alt: altText,
    });

    setVisibleAtlTextInput(false);
    setAltText("");
  };

  return (
    <>
      {visibleAltTextInput ? (
        <form onSubmit={applyAltText} className="input-text">
          <div>
            <input value={altText} onChange={handleChangeAltText} />
            <button type="submit">適用</button>
          </div>
        </form>
      ) : (
        <div className="button-toolbar">
          <button
            type="button"
            style={{ color: isActiveAlt ? activeColor : defaultColor }}
            onClick={handleVisibleAltTextInput}
          >
            ALT
          </button>
          <button type="button" onClick={handleChangeSize}>
            {isDefaultSize ? (
              <ShrinkIcon color={defaultColor} height="1.8em" width="1.8em" />
            ) : (
              <ExpandIcon color={defaultColor} height="1.8em" width="1.8em" />
            )}
          </button>
          <button type="button" onClick={handleChangeStyle}>
            <ImageFrameIcon
              color={isDefaultStyle ? defaultColor : activeColor}
              height="1.8em"
              width="1.8em"
            />
          </button>
        </div>
      )}
    </>
  );
}
