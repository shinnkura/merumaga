import { Node } from "@tiptap/react";
import { Plugin, PluginKey } from "@tiptap/pm/state";
import { handleInsertImages } from "./Footer";

export interface ImageAttributes {
  "data-natural-width": string;
  "data-natural-height": string;
  "data-size": "default" | "small";
  "data-style": "default" | "photo-frame";
  src: string;
  alt: string;
  width: string;
  height: string;
}

declare module "@tiptap/react" {
  interface Commands<ReturnType> {
    image: {
      setImage: (options: {
        "data-natural-width": number;
        "data-natural-height": number;
        "data-size": string;
        "data-style": string;
        src: string;
        alt: string;
        height: number;
        width: number;
      }) => ReturnType;
    };
  }
}

export const Image = Node.create({
  name: "image",

  inline: false,
  group: "block",

  draggable: true,

  addAttributes() {
    return {
      "data-natural-width": {
        default: null,
      },
      "data-natural-height": {
        default: null,
      },
      "data-size": {
        default: "default",
      },
      "data-style": {
        default: "default",
      },
      src: {
        default: null,
      },
      alt: {
        default: null,
      },
      width: {
        deafult: null,
      },
      height: {
        default: null,
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "figure.e-image",
        getAttrs: (element) => {
          if (typeof element === "string") return false;

          const imageElement = element.querySelector("img");

          return {
            src: imageElement?.getAttribute("src") ?? null,
            width: imageElement?.getAttribute("width") ?? null,
            height: imageElement?.getAttribute("height") ?? null,
            alt: imageElement?.getAttribute("alt") ?? null,
          };
        },
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    const {
      "data-natural-width": naturalWidth,
      "data-natural-height": naturalHeight,
      "data-size": size,
      "data-style": style,
      src,
      alt,
      height,
      width,
    } = HTMLAttributes as ImageAttributes;

    return [
      "figure",
      {
        class: "e-image",
        "data-natural-width": naturalWidth,
        "data-natural-height": naturalHeight,
        "data-size": size,
        "data-style": style,
      },
      [
        "img",
        {
          src,
          alt,
          height,
          width,
        },
      ],
    ];
  },

  addCommands() {
    return {
      setImage:
        (options) =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: options,
          });
        },
    };
  },

  addProseMirrorPlugins() {
    const editor = this.editor;
    return [
      new Plugin({
        key: new PluginKey("dragAndDropImageHandler"),
        props: {
          handleDrop(_, event, __, moved) {
            if (!moved && event.dataTransfer && event.dataTransfer.files) {
              event.preventDefault();

              handleInsertImages(event.dataTransfer.files, editor);

              return true;
            }

            return false;
          },
        },
      }),
    ];
  },
});
