import React, { useState } from 'react';
import { README_CONTENT } from '../../data/projects';

interface XpNotepadProps {
  initialContent?: string;
}

export const XpNotepad: React.FC<XpNotepadProps> = ({ initialContent = README_CONTENT }) => {
  const [content, setContent] = useState(initialContent);

  return (
    <div className="flex flex-col h-full bg-white select-text">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        spellCheck={false}
        className="flex-1 w-full p-2 text-[12px] font-mono leading-relaxed outline-none resize-none text-gray-900 border-none select-text"
        style={{ fontFamily: '"Lucida Console", Monaco, monospace' }}
      />
    </div>
  );
};
