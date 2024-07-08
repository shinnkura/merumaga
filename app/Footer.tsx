"use client";

import { Editor } from "@tiptap/react";
import { Editor as CoreEditor } from "@tiptap/core";
import { useRef } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { PictureIcon } from "./icons/PictureIcon";
import "react-circular-progressbar/dist/styles.css";

const loadImage = (file: File) => {
  return new Promise<{ fileName: string; image: HTMLImageElement }>(
    (resolve) => {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => resolve({ fileName: file.name, image: img });
    }
  );
};

export const handleInsertImages = async (
  inputFiles: FileList,
  editor: Editor | CoreEditor
) => {
  const formData = new FormData();
  const imageElementPromiseList: Promise<{
    fileName: string;
    image: HTMLImageElement;
  }>[] = [];
  for (let i = 0; i < inputFiles.length; i++) {
    const file = inputFiles[i];

    formData.append(`file-${i}`, file, file.name);
    imageElementPromiseList.push(loadImage(file));
  }

  try {
    await fetch("/api", {
      method: "POST",
      body: formData,
    });

    const loadedImageList = await Promise.all(imageElementPromiseList);
    for (const {
      image: { naturalWidth, naturalHeight },
      fileName,
    } of loadedImageList) {
      const src = `/upload/${fileName}`;

      editor
        .chain()
        .focus()
        .setImage({
          "data-natural-height": naturalHeight,
          "data-natural-width": naturalWidth,
          "data-size": "default",
          "data-style": "default",
          src,
          alt: "",
          height: naturalHeight,
          width: naturalWidth,
        })
        .run();
    }
  } catch (error) {
    console.log("ERROR:", error);
  }
};

export function Footer({ editor }: { editor: Editor }) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleOnClcik = () => {
    if (inputRef && inputRef.current) {
      inputRef.current.click();
    }
  };

  const charCount = editor.storage.characterCount.characters() as number;
  const charPercentage = (charCount / 14000) * 100;

  return (
    <div className="footer">
      <div>
        <button
          type="button"
          onClick={handleOnClcik}
          className="picture-icon-button"
        >
          <PictureIcon color="#a7abb1" width="1.25rem" height="1.25rem" />
        </button>
        <input
          className="insert-image-input"
          type="file"
          ref={inputRef}
          accept="image/png,image/jpeg,image/gif,image/webp,image/heic"
          multiple
          onChange={(event) => {
            const { files } = event.target;
            if (!files) return;

            handleInsertImages(files, editor);
          }}
        />
      </div>
      <button
        type="button"
        style={{
          width: 35,
          height: 35,
          display: "block",
          backgroundColor: "white",
          borderWidth: 0,
          margin: 0,
          padding: 0,
          cursor: "pointer",
        }}
      >
        <CircularProgressbar
          value={charPercentage}
          text={charCount.toString()}
          styles={buildStyles({
            pathColor: "#696f73",
            trailColor: "#d8dadf",
            textColor: "rgb(141, 146, 152)",
            textSize: "24",
          })}
        />
      </button>
    </div>
  );
}
