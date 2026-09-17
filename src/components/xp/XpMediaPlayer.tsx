import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX } from 'lucide-react';
import { sounds } from '../../utils/sound';

interface Track {
  title: string;
  artist: string;
  duration: number; // in seconds
  bpm: number;
}

const PLAYLIST: Track[] = [
  { title: 'Bliss Valley Synthwave', artist: 'Pedro Cafure', duration: 184, bpm: 95 },
  { title: 'Cloudflare Edge Ambient Drift', artist: 'CafureWorks Audio', duration: 156, bpm: 82 },
  { title: 'Subdomain Odyssey (XP Mix)', artist: 'Pedro Cafure', duration: 210, bpm: 110 },
];

export const XpMediaPlayer: React.FC = () => {
  const [currentTrackIdx, setCurrentTrackIdx] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [volume, setVolume] = useState<number>(0.7);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number | null>(null);

  const currentTrack = PLAYLIST[currentTrackIdx];

  // Visualizer animated canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let phase = 0;

    const draw = () => {
      ctx.fillStyle = '#061325';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const barCount = 28;
      const barWidth = canvas.width / barCount - 2;

      for (let i = 0; i < barCount; i++) {
        let height = 4;
        if (isPlaying) {
          const sinVal = Math.sin(phase + i * 0.45);
          const cosVal = Math.cos(phase * 1.2 + i * 0.3);
          height = Math.max(4, Math.abs(sinVal * cosVal) * (canvas.height - 12));
        }

        const x = i * (barWidth + 2);
        const y = canvas.height - height;

        // Gradient for equalizer bars
        const grad = ctx.createLinearGradient(0, y, 0, canvas.height);
        grad.addColorStop(0, '#00FFFF');
        grad.addColorStop(0.5, '#0088FF');
        grad.addColorStop(1, '#002277');

        ctx.fillStyle = grad;
        ctx.fillRect(x, y, barWidth, height);
      }

      phase += isPlaying ? 0.08 : 0.01;
      animFrameRef.current = requestAnimationFrame(draw);
    };

    animFrameRef.current = requestAnimationFrame(draw);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isPlaying]);

  // Track progress timer
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((p) => {
          if (p >= currentTrack.duration) {
            // Next track
            setCurrentTrackIdx((idx) => (idx + 1) % PLAYLIST.length);
            return 0;
          }
          return p + 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, currentTrack.duration]);

  const togglePlay = () => {
    sounds.playClick();
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    sounds.playClick();
    setCurrentTrackIdx((idx) => (idx + 1) % PLAYLIST.length);
    setProgress(0);
  };

  const handlePrev = () => {
    sounds.playClick();
    setCurrentTrackIdx((idx) => (idx - 1 + PLAYLIST.length) % PLAYLIST.length);
    setProgress(0);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${String(s).padStart(2, '0')}`;
  };

  return (
    <div
      style={{
        background: 'linear-gradient(to bottom, #193B68 0%, #0D2140 100%)',
        fontFamily: 'Tahoma, "Segoe UI", sans-serif',
      }}
      className="flex flex-col h-full select-none text-white text-[11px]"
    >
      {/* Top Header Banner */}
      <div className="flex items-center justify-between px-3 py-1.5 bg-gradient-to-r from-[#0C203E] via-[#1B4B85] to-[#0C203E] border-b border-[#2965AF]">
        <span className="font-bold text-xs text-blue-100 tracking-wide">
          Windows Media Player
        </span>
        <span className="text-[10px] text-blue-300">Em reprodução</span>
      </div>

      {/* Visualizer Display Screen */}
      <div className="flex-1 p-3 flex flex-col items-center justify-center min-h-[160px]">
        <div className="w-full h-full max-w-md rounded-md overflow-hidden border-2 border-[#1E4D8A] shadow-inner relative flex flex-col bg-[#061325]">
          {/* Canvas Spectrum Equalizer */}
          <canvas
            ref={canvasRef}
            width={340}
            height={130}
            className="w-full h-full flex-1"
          />

          {/* Track Info Overlay on bottom of screen */}
          <div className="bg-[#050E1A]/85 border-t border-[#163864] px-3 py-1.5 flex items-center justify-between">
            <div className="flex flex-col min-w-0 pr-2">
              <span className="font-bold text-xs text-cyan-300 truncate">
                {currentTrack.title}
              </span>
              <span className="text-[10px] text-blue-200">{currentTrack.artist}</span>
            </div>
            <span className="text-xs font-mono text-cyan-400 font-bold shrink-0">
              {formatTime(progress)} / {formatTime(currentTrack.duration)}
            </span>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="px-4 py-1">
        <div
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const ratio = (e.clientX - rect.left) / rect.width;
            setProgress(Math.floor(ratio * currentTrack.duration));
          }}
          className="w-full h-2 bg-[#0C1E36] rounded-full overflow-hidden border border-[#235899] cursor-pointer"
        >
          <div
            style={{ width: `${(progress / currentTrack.duration) * 100}%` }}
            className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-300"
          />
        </div>
      </div>

      {/* Bottom Classic Chrome Media Controls */}
      <div className="px-4 py-3 bg-gradient-to-t from-[#0A1A30] to-[#122C4E] border-t border-[#235899] flex items-center justify-between">
        {/* Playback Buttons */}
        <div className="flex items-center space-x-2">
          {/* Previous */}
          <button
            onClick={handlePrev}
            className="w-8 h-8 rounded-full bg-gradient-to-b from-[#2B6EC2] to-[#143B73] border border-[#4891EB] flex items-center justify-center hover:brightness-115 active:scale-95 cursor-pointer shadow-md"
          >
            <SkipBack size={14} className="text-white" />
          </button>

          {/* Play/Pause */}
          <button
            onClick={togglePlay}
            className="w-10 h-10 rounded-full bg-gradient-to-b from-[#388CFA] via-[#2069D6] to-[#0D449E] border-2 border-white shadow-[0_0_8px_rgba(59,130,246,0.6)] flex items-center justify-center hover:brightness-115 active:scale-95 cursor-pointer"
          >
            {isPlaying ? (
              <Pause size={18} className="text-white" />
            ) : (
              <Play size={18} className="text-white ml-0.5" />
            )}
          </button>

          {/* Next */}
          <button
            onClick={handleNext}
            className="w-8 h-8 rounded-full bg-gradient-to-b from-[#2B6EC2] to-[#143B73] border border-[#4891EB] flex items-center justify-center hover:brightness-115 active:scale-95 cursor-pointer shadow-md"
          >
            <SkipForward size={14} className="text-white" />
          </button>
        </div>

        {/* Volume Control */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="text-blue-300 hover:text-white cursor-pointer"
          >
            {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={isMuted ? 0 : volume}
            onChange={(e) => {
              setVolume(Number(e.target.value));
              if (isMuted) setIsMuted(false);
            }}
            className="w-20 accent-cyan-400 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};
