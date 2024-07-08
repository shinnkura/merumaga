import React, { SVGProps } from "react";

export function ImageFrameIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="M6.73 15.615q-.342 0-.575-.232q-.232-.232-.232-.575V6.73q0-.343.232-.576q.233-.232.576-.232h10.077q.343 0 .575.232q.232.233.232.576v8.077q0 .343-.232.575q-.232.232-.575.232zM3.5 19q-.213 0-.356-.144Q3 18.712 3 18.5t.144-.356Q3.287 18 3.5 18h15.885q.23 0 .423-.192q.192-.193.192-.423V5.5q0-.213.144-.356T20.5 5q.212 0 .356.144q.143.144.143.356v11.885q0 .69-.462 1.152q-.463.463-1.153.463z"
      ></path>
    </svg>
  );
}
export default ImageFrameIcon;
