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

  // Number colors
  const getNumberColor = (num: number) => {
    switch (num) {
      case 1: return '#0000FF';
      case 2: return '#008000';
      case 3: return '#FF0000';
      case 4: return '#000080';
      case 5: return '#800000';
      case 6: return '#008080';
      case 7: return '#000000';
      case 8: return '#808080';
      default: return '#000000';
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-3 bg-[#C0C0C0] select-none font-sans">
      {/* Outer Border Bevel */}
      <div className="border-4 border-[#FFFFFF] border-r-[#808080] border-b-[#808080] p-2 bg-[#C0C0C0]">
        
        {/* Top Control Bar with 7-Segment Counters & Face */}
        <div className="flex items-center justify-between px-2 py-1.5 mb-2 bg-[#C0C0C0] border-2 border-[#808080] border-r-[#FFFFFF] border-b-[#FFFFFF]">
          {/* Mine Counter */}
          <div className="bg-black text-red-600 font-mono text-xl font-bold px-1 py-0.5 rounded-2xs tracking-widest leading-none border border-gray-600 shadow-inner">
            {String(remainingMines).padStart(3, '0')}
          </div>

          {/* Smiley Face Button */}
          <button
            onClick={initGame}
            className="w-7 h-7 bg-[#C0C0C0] border-2 border-[#FFFFFF] border-r-[#808080] border-b-[#808080] active:border-[#808080] active:border-r-[#FFFFFF] active:border-b-[#FFFFFF] flex items-center justify-center text-lg cursor-pointer rounded-2xs shadow-xs"
          >
            {gameWon ? '😎' : gameOver ? '😵' : isMousePressing ? '😮' : '🙂'}
          </button>

          {/* Time Counter */}
          <div className="bg-black text-red-600 font-mono text-xl font-bold px-1 py-0.5 rounded-2xs tracking-widest leading-none border border-gray-600 shadow-inner">
            {String(timer).padStart(3, '0')}
          </div>
        </div>

        {/* 9x9 Minefield Grid */}
        <div
          onMouseDown={() => setIsMousePressing(true)}
          onMouseUp={() => setIsMousePressing(false)}
          className="border-3 border-[#808080] border-r-[#FFFFFF] border-b-[#FFFFFF] grid grid-cols-9 bg-[#7B7B7B]"
        >
          {grid.map((row, r) =>
            row.map((cell, c) => {
              if (cell.isRevealed) {
                return (
                  <div
                    key={`${r}-${c}`}
                    className="w-6 h-6 border border-[#7B7B7B] bg-[#C0C0C0] flex items-center justify-center text-xs font-bold font-mono"
                    style={{ color: getNumberColor(cell.neighborMines) }}
                  >
                    {cell.isMine ? '💣' : cell.neighborMines > 0 ? cell.neighborMines : ''}
                  </div>
                );
              }

              return (
                <button
                  key={`${r}-${c}`}
                  onClick={() => revealCell(r, c)}
                  onContextMenu={(e) => handleContextMenu(e, r, c)}
                  className="w-6 h-6 border-2 border-[#FFFFFF] border-r-[#7B7B7B] border-b-[#7B7B7B] active:border-1 active:border-[#7B7B7B] bg-[#C0C0C0] flex items-center justify-center text-xs cursor-pointer"
                >
                  {cell.isFlagged ? '🚩' : ''}
                </button>
              );
            })
          )}
        </div>

      </div>
    </div>
  );
};
