import React from "react";

interface HighlightProps {
  text: string;
  highlight: string;
}
export default function Highlight({ text, highlight }: HighlightProps) {
  if (highlight.trim().length <= 2) {
    return <span className="break-words">{text}</span>;
  }

  const regex = new RegExp(`(${highlight})`);
  const parts = text.split(regex);

  return (
    <span className="break-words">
      {parts.map((part, index) =>
        part.toLocaleLowerCase() === highlight.toLocaleLowerCase() ? (
          <mark className="bg-golden py-0.5" key={index}>
            {part}
          </mark>
        ) : (
          part
        )
      )}
    </span>
  );
}
