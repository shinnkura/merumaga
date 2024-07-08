"use client";

import { BubbleMenu, useEditor, EditorContent, Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Footer } from "./Footer";
import { Image } from "./ImageExtension";
import { ImageToolbar } from "./ImageToolbar";
import CharacterCount from "@tiptap/extension-character-count";
import Link from "@tiptap/extension-link";
import { BubbleLink } from "./BubbleLink";
import "./page.css";
import { KeyboardEvent } from "react";

const extensions = [
  StarterKit.configure({ heading: { levels: [2, 3] } }),
  Image,
  CharacterCount.configure({ limit: 18000 }),
  Link.configure({
    openOnClick: false,
  }),
];

const content = `<h2>見出し</h2><h3>小見出し</h3><p></p><p>テ<strong>キストテキ</strong>ストテキストテキストテキストテキスト</p><p><a target="_blank" rel="noopener noreferrer nofollow" href="https://kiriri.net">foobarリンク</a></p><p></p><figure class="e-image" data-natural-width="700" data-natural-height="400" data-size="default" data-style="default"><img src="https://placehold.jp/700x400.png" alt="sushi" height="400" width="700"></figure><ul><li><p>hoge</p><ul><li><p>huga</p></li></ul></li></ul><ol><li><p>hana</p><ol><li><p>hoji</p></li><li><p>hoji</p></li></ol></li></ol><blockquote><p>hoge</p><blockquote><p>huga</p></blockquote></blockquote><p>ああ</p>`;

function TitleInput({ editor }: { editor: Editor }) {
  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && event.keyCode === 13) {
      event.preventDefault();
      editor.chain().focus().setTextSelection(0).run();
    }
  };

  return (
    <textarea
      className="title-input"
      placeholder="タイトル"
      onKeyDown={handleKeyDown}
    />
  );
}

const Tiptap = () => {
  const editor = useEditor({
    extensions,
    content,
  });

  if (!editor) return false;

  const isSelectImage = editor.isActive("image");

  return (
    <div className="wrapper">
      <TitleInput editor={editor} />
      <EditorContent editor={editor} />
      <Footer editor={editor} />
      <BubbleMenu
        editor={editor}
        shouldShow={({ from, to }) => {
          const isSelectImage = editor.isActive("image");
          const isSelectLink = editor.isActive("link");
          const isSelectRange = from !== to;

          return isSelectImage || isSelectLink || isSelectRange;
        }}
      >
        {isSelectImage ? (
          <ImageToolbar editor={editor} />
        ) : (
          <BubbleLink editor={editor} />
        )}
      </BubbleMenu>
    </div>
  );
};

export default Tiptap;
