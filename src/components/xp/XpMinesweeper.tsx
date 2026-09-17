import React, { useState, useEffect, useCallback } from 'react';
import { sounds } from '../../utils/sound';

interface Cell {
  row: number;
  col: number;
  isMine: boolean;
  isRevealed: boolean;
  isFlagged: boolean;
  neighborMines: number;
}

const ROWS = 9;
const COLS = 9;
const TOTAL_MINES = 10;

export const XpMinesweeper: React.FC = () => {
  const [grid, setGrid] = useState<Cell[][]>([]);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [gameWon, setGameWon] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [isMousePressing, setIsMousePressing] = useState<boolean>(false);

  // Initialize new game grid
  const initGame = useCallback(() => {
    // 1. Create empty grid
    const newGrid: Cell[][] = [];
    for (let r = 0; r < ROWS; r++) {
      const row: Cell[] = [];
      for (let c = 0; c < COLS; c++) {
        row.push({
          row: r,
          col: c,
          isMine: false,
          isRevealed: false,
          isFlagged: false,
          neighborMines: 0,
        });
      }
      newGrid.push(row);
    }

    // 2. Place random mines
    let minesPlaced = 0;
    while (minesPlaced < TOTAL_MINES) {
      const r = Math.floor(Math.random() * ROWS);
      const c = Math.floor(Math.random() * COLS);
      if (!newGrid[r][c].isMine) {
        newGrid[r][c].isMine = true;
        minesPlaced++;
      }
    }

    // 3. Compute neighbor mine counts
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        if (!newGrid[r][c].isMine) {
          let count = 0;
          for (let dr = -1; dr <= 1; dr++) {
            for (let dc = -1; dc <= 1; dc++) {
              const nr = r + dr;
              const nc = c + dc;
              if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS && newGrid[nr][nc].isMine) {
                count++;
              }
            }
          }
          newGrid[r][c].neighborMines = count;
        }
      }
    }

    setGrid(newGrid);
    setGameOver(false);
    setGameWon(false);
    setTimer(0);
    setIsTimerRunning(false);
  }, []);

  useEffect(() => {
    initGame();
  }, [initGame]);

  // Timer interval
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    if (isTimerRunning && !gameOver && !gameWon) {
      interval = setInterval(() => {
        setTimer((t) => Math.min(999, t + 1));
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, gameOver, gameWon]);

  // Reveal cell and flood fill on 0
  const revealCell = (r: number, c: number) => {
    if (gameOver || gameWon) return;

    if (!isTimerRunning) {
      setIsTimerRunning(true);
    }

    const currentCell = grid[r][c];
    if (currentCell.isRevealed || currentCell.isFlagged) return;

    sounds.playClick();

    // Hit a mine!
    if (currentCell.isMine) {
      sounds.playError();
      setGameOver(true);
      setIsTimerRunning(false);

      // Reveal all mines
      setGrid((prev) =>
        prev.map((row) =>
          row.map((cell) =>
            cell.isMine ? { ...cell, isRevealed: true } : cell
          )
        )
      );
      return;
    }

    // Flood fill
    const newGrid = grid.map((row) => row.map((cell) => ({ ...cell })));
    const queue: [number, number][] = [[r, c]];
    newGrid[r][c].isRevealed = true;

    while (queue.length > 0) {
      const [currR, currC] = queue.shift()!;
      if (newGrid[currR][currC].neighborMines === 0) {
        for (let dr = -1; dr <= 1; dr++) {
          for (let dc = -1; dc <= 1; dc++) {
            const nr = currR + dr;
            const nc = currC + dc;
            if (
              nr >= 0 &&
              nr < ROWS &&
              nc >= 0 &&
              nc < COLS &&
              !newGrid[nr][nc].isRevealed &&
              !newGrid[nr][nc].isFlagged &&
              !newGrid[nr][nc].isMine
            ) {
              newGrid[nr][nc].isRevealed = true;
              if (newGrid[nr][nc].neighborMines === 0) {
                queue.push([nr, nc]);
              }
            }
          }
        }
      }
    }

    // Check win condition
    let unrevealedSafeCells = 0;
    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < COLS; col++) {
        if (!newGrid[row][col].isMine && !newGrid[row][col].isRevealed) {
          unrevealedSafeCells++;
        }
      }
    }

    setGrid(newGrid);

    if (unrevealedSafeCells === 0) {
      sounds.playTada();
      setGameWon(true);
      setIsTimerRunning(false);
    }
  };

  // Toggle flag with right click
  const handleContextMenu = (e: React.MouseEvent, r: number, c: number) => {
    e.preventDefault();
    if (gameOver || gameWon) return;

    if (!isTimerRunning) {
      setIsTimerRunning(true);
    }

    if (grid[r][c].isRevealed) return;

    sounds.playClick();
    setGrid((prev) =>
      prev.map((row, rowIdx) =>
        row.map((cell, colIdx) => {
          if (rowIdx === r && colIdx === c) {
            return { ...cell, isFlagged: !cell.isFlagged };
          }
          return cell;
        })
      )
    );
  };

  // Remaining flag count
  const flaggedCount = grid.reduce(
    (acc, row) => acc + row.filter((c) => c.isFlagged).length,
    0
  );
  const remainingMines = Math.max(-99, TOTAL_MINES - flaggedCount);

  // Helper to render 3-digit 7-segment display
  const renderDigitalDisplay = (value: number) => {
    const clamped = Math.max(-99, Math.min(999, value));
    let str = '';
    if (clamped < 0) {
      str = '-' + String(Math.abs(clamped)).padStart(2, '0');
    } else {
      str = String(clamped).padStart(3, '0');
    }
    return (
      <div className="flex bg-black p-[1px] border border-[#808080] border-b-[#FFFFFF] border-r-[#FFFFFF]">
        {str.split('').map((ch, idx) => {
          const src = ch === '-' ? '/minesweeper/digit_minus.png' : `/minesweeper/digit_${ch}.png`;
          return (
            <img
              key={idx}
              src={src}
              alt={ch}
              className="w-[13px] h-[23px] select-none pointer-events-none"
              style={{ imageRendering: 'pixelated' }}
              draggable={false}
            />
          );
        })}
      </div>
    );
  };

  const getFaceSrc = () => {
    if (gameWon) return '/minesweeper/face_win.png';
    if (gameOver) return '/minesweeper/face_dead.png';
    if (isMousePressing) return '/minesweeper/face_shocked.png';
    return '/minesweeper/face_smile.png';
  };

  const getCellSrc = (cell: Cell) => {
    if (cell.isRevealed) {
      if (cell.isMine) {
        return '/minesweeper/cell_mine_exploded.png';
      }
      return `/minesweeper/cell_${cell.neighborMines}.png`;
    }
    if (cell.isFlagged) {
      if (gameOver && !cell.isMine) {
        return '/minesweeper/cell_mine_wrong.png';
      }
      return '/minesweeper/cell_flag.png';
    }
    if (gameOver && cell.isMine) {
      return '/minesweeper/cell_mine.png';
    }
    return '/minesweeper/cell_unrevealed.png';
  };

  return (
    <div className="flex flex-col items-center justify-center p-3 bg-[#C0C0C0] select-none font-sans">
      {/* Outer Border Bevel */}
      <div className="border-3 border-[#FFFFFF] border-r-[#808080] border-b-[#808080] p-1.5 bg-[#C0C0C0]">
        
        {/* Top Control Bar with 7-Segment Counters & Face */}
        <div className="flex items-center justify-between px-2 py-1 mb-1.5 bg-[#C0C0C0] border-2 border-[#808080] border-r-[#FFFFFF] border-b-[#FFFFFF]">
          {/* Mine Counter */}
          {renderDigitalDisplay(remainingMines)}

          {/* Smiley Face Button */}
          <button
            onClick={initGame}
            title="Reiniciar Jogo"
            className="w-[26px] h-[26px] bg-[#C0C0C0] border-2 border-[#FFFFFF] border-r-[#808080] border-b-[#808080] active:border-[#808080] active:border-r-[#FFFFFF] active:border-b-[#FFFFFF] flex items-center justify-center cursor-pointer p-0 shadow-xs"
          >
            <img
              src={getFaceSrc()}
              alt="face"
              className="w-[24px] h-[24px] select-none pointer-events-none"
              style={{ imageRendering: 'pixelated' }}
              draggable={false}
            />
          </button>

          {/* Time Counter */}
          {renderDigitalDisplay(timer)}
        </div>

        {/* 9x9 Minefield Grid */}
        <div
          onMouseDown={() => setIsMousePressing(true)}
          onMouseUp={() => setIsMousePressing(false)}
          className="border-3 border-[#808080] border-r-[#FFFFFF] border-b-[#FFFFFF] grid grid-cols-9 bg-[#C0C0C0]"
          style={{ imageRendering: 'pixelated' }}
        >
          {grid.map((row, r) =>
            row.map((cell, c) => (
              <div
                key={`${r}-${c}`}
                onClick={() => revealCell(r, c)}
                onContextMenu={(e) => handleContextMenu(e, r, c)}
                className="w-[20px] h-[20px] cursor-pointer flex items-center justify-center"
              >
                <img
                  src={getCellSrc(cell)}
                  alt="tile"
                  className="w-[20px] h-[20px] select-none pointer-events-none"
                  style={{ imageRendering: 'pixelated' }}
                  draggable={false}
                />
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};
