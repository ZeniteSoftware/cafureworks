import React, { useRef, useEffect } from 'react';
import { useDesktop } from '../../context/DesktopContext';
import { Volume2, VolumeX } from 'lucide-react';
import { sounds } from '../../utils/sound';

interface XpVolumePopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export const XpVolumePopup: React.FC<XpVolumePopupProps> = ({ isOpen, onClose }) => {
  const { isSoundEnabled, toggleSound } = useDesktop();
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleOutside = (e: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    window.addEventListener('mousedown', handleOutside);
    return () => window.removeEventListener('mousedown', handleOutside);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={popupRef}
      style={{
        boxShadow: '3px -3px 10px rgba(0,0,0,0.4)',
        fontFamily: 'Tahoma, "Segoe UI", sans-serif',
      }}
      className="fixed bottom-[30px] right-2 z-[99999] w-24 bg-[#ECE9D8] border border-[#7A7565] rounded-t-xs p-2 flex flex-col items-center select-none text-[11px]"
    >
      <div className="w-full text-center font-bold text-gray-800 border-b border-[#D5D0C0] pb-1 mb-2">
        Volume
      </div>

      <div className="my-1">
        {isSoundEnabled ? (
          <Volume2 size={22} className="text-blue-900" />
        ) : (
          <VolumeX size={22} className="text-red-600" />
        )}
      </div>

      {/* Vertical Slider Track */}
      <div className="h-28 flex items-center justify-center my-1">
        <input
          type="range"
          min="0"
          max="100"
          defaultValue={isSoundEnabled ? 80 : 0}
          disabled={!isSoundEnabled}
          onChange={() => {
            // Volume slide
          }}
          onMouseUp={() => sounds.playDing()}
          className="h-24 -rotate-90 appearance-none bg-gray-300 rounded-sm cursor-pointer accent-[#316AC5] disabled:opacity-40"
        />
      </div>

      {/* Mute Checkbox */}
      <div className="w-full pt-2 border-t border-[#D5D0C0] flex items-center justify-center space-x-1.5 mt-1">
        <input
          type="checkbox"
          id="xp-volume-mute"
          checked={!isSoundEnabled}
          onChange={toggleSound}
          className="cursor-pointer"
        />
        <label htmlFor="xp-volume-mute" className="text-[10px] text-gray-800 cursor-pointer">
          Sem áudio
        </label>
      </div>
    </div>
  );
};
