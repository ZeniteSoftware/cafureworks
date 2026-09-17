import React, { useState } from 'react';
import { sounds } from '../../utils/sound';

export const XpCalculator: React.FC = () => {
  const [display, setDisplay] = useState<string>('0');
  const [prevValue, setPrevValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState<boolean>(false);
  const [memory, setMemory] = useState<number>(0);

  const inputDigit = (digit: string) => {
    sounds.playClick();
    if (waitingForOperand) {
      setDisplay(digit);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? digit : display + digit);
    }
  };

  const inputDot = () => {
    sounds.playClick();
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const clearAll = () => {
    sounds.playClick();
    setDisplay('0');
    setPrevValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const clearEntry = () => {
    sounds.playClick();
    setDisplay('0');
  };

  const performOperation = (nextOp: string) => {
    sounds.playClick();
    const inputValue = parseFloat(display);

    if (prevValue === null) {
      setPrevValue(inputValue);
    } else if (operation) {
      const current = prevValue || 0;
      let result = current;

      switch (operation) {
        case '+': result = current + inputValue; break;
        case '-': result = current - inputValue; break;
        case '*': result = current * inputValue; break;
        case '/': result = inputValue !== 0 ? current / inputValue : 0; break;
        default: break;
      }

      setPrevValue(result);
      setDisplay(String(result));
    }

    setWaitingForOperand(true);
    setOperation(nextOp === '=' ? null : nextOp);
  };

  return (
    <div className="flex flex-col items-center justify-center p-3 bg-[#ECE9D8] select-none text-[11px] font-sans">
      {/* Outer Casing */}
      <div className="w-[230px] p-2 bg-[#ECE9D8] border border-[#7F9DB9] rounded-xs shadow-md">
        
        {/* LCD Digital Display */}
        <div className="mb-2 bg-white border-2 border-[#7F9DB9] border-r-white border-b-white px-2 py-1 flex items-center justify-end shadow-inner">
          <span className="font-mono text-xl font-bold text-gray-900 tracking-wider truncate">
            {display}
          </span>
        </div>

        {/* Memory Indicator */}
        <div className="flex items-center justify-between mb-2 px-1 text-[10px] text-gray-600">
          <span className="w-5 h-4 border border-gray-400 flex items-center justify-center bg-gray-100 font-bold text-blue-900">
            {memory !== 0 ? 'M' : ''}
          </span>
          <div className="flex space-x-1">
            <button
              onClick={() => { setDisplay(display.length > 1 ? display.slice(0, -1) : '0'); sounds.playClick(); }}
              className="px-2 py-0.5 rounded-xs bg-[#ECE9D8] border border-[#7F9DB9] text-red-700 hover:brightness-105 active:brightness-95 cursor-pointer"
            >
              Backspace
            </button>
            <button
              onClick={clearEntry}
              className="px-2 py-0.5 rounded-xs bg-[#ECE9D8] border border-[#7F9DB9] text-red-700 hover:brightness-105 active:brightness-95 cursor-pointer"
            >
              CE
            </button>
            <button
              onClick={clearAll}
              className="px-2 py-0.5 rounded-xs bg-[#ECE9D8] border border-[#7F9DB9] text-red-700 hover:brightness-105 active:brightness-95 cursor-pointer"
            >
              C
            </button>
          </div>
        </div>

        {/* Buttons Grid */}
        <div className="grid grid-cols-5 gap-1 text-xs">
          {/* Row 1 */}
          <button onClick={() => { setMemory(0); sounds.playClick(); }} className="py-1 rounded-xs bg-[#ECE9D8] border border-[#7F9DB9] text-red-700 font-bold active:bg-gray-300">MC</button>
          <button onClick={() => inputDigit('7')} className="py-1 rounded-xs bg-white border border-[#7F9DB9] text-blue-900 font-bold active:bg-blue-100">7</button>
          <button onClick={() => inputDigit('8')} className="py-1 rounded-xs bg-white border border-[#7F9DB9] text-blue-900 font-bold active:bg-blue-100">8</button>
          <button onClick={() => inputDigit('9')} className="py-1 rounded-xs bg-white border border-[#7F9DB9] text-blue-900 font-bold active:bg-blue-100">9</button>
          <button onClick={() => performOperation('/')} className="py-1 rounded-xs bg-[#ECE9D8] border border-[#7F9DB9] text-red-700 font-bold active:bg-gray-300">/</button>

          {/* Row 2 */}
          <button onClick={() => { setDisplay(String(memory)); setWaitingForOperand(true); sounds.playClick(); }} className="py-1 rounded-xs bg-[#ECE9D8] border border-[#7F9DB9] text-red-700 font-bold active:bg-gray-300">MR</button>
          <button onClick={() => inputDigit('4')} className="py-1 rounded-xs bg-white border border-[#7F9DB9] text-blue-900 font-bold active:bg-blue-100">4</button>
          <button onClick={() => inputDigit('5')} className="py-1 rounded-xs bg-white border border-[#7F9DB9] text-blue-900 font-bold active:bg-blue-100">5</button>
          <button onClick={() => inputDigit('6')} className="py-1 rounded-xs bg-white border border-[#7F9DB9] text-blue-900 font-bold active:bg-blue-100">6</button>
          <button onClick={() => performOperation('*')} className="py-1 rounded-xs bg-[#ECE9D8] border border-[#7F9DB9] text-red-700 font-bold active:bg-gray-300">*</button>

          {/* Row 3 */}
          <button onClick={() => { setMemory(parseFloat(display)); sounds.playClick(); }} className="py-1 rounded-xs bg-[#ECE9D8] border border-[#7F9DB9] text-red-700 font-bold active:bg-gray-300">MS</button>
          <button onClick={() => inputDigit('1')} className="py-1 rounded-xs bg-white border border-[#7F9DB9] text-blue-900 font-bold active:bg-blue-100">1</button>
          <button onClick={() => inputDigit('2')} className="py-1 rounded-xs bg-white border border-[#7F9DB9] text-blue-900 font-bold active:bg-blue-100">2</button>
          <button onClick={() => inputDigit('3')} className="py-1 rounded-xs bg-white border border-[#7F9DB9] text-blue-900 font-bold active:bg-blue-100">3</button>
          <button onClick={() => performOperation('-')} className="py-1 rounded-xs bg-[#ECE9D8] border border-[#7F9DB9] text-red-700 font-bold active:bg-gray-300">-</button>

          {/* Row 4 */}
          <button onClick={() => { setMemory(memory + parseFloat(display)); sounds.playClick(); }} className="py-1 rounded-xs bg-[#ECE9D8] border border-[#7F9DB9] text-red-700 font-bold active:bg-gray-300">M+</button>
          <button onClick={() => inputDigit('0')} className="py-1 rounded-xs bg-white border border-[#7F9DB9] text-blue-900 font-bold active:bg-blue-100">0</button>
          <button onClick={() => { setDisplay(String(-parseFloat(display))); sounds.playClick(); }} className="py-1 rounded-xs bg-white border border-[#7F9DB9] text-blue-900 font-bold active:bg-blue-100">+/-</button>
          <button onClick={inputDot} className="py-1 rounded-xs bg-white border border-[#7F9DB9] text-blue-900 font-bold active:bg-blue-100">.</button>
          <button onClick={() => performOperation('+')} className="py-1 rounded-xs bg-[#ECE9D8] border border-[#7F9DB9] text-red-700 font-bold active:bg-gray-300">+</button>
        </div>

        {/* Equals Row */}
        <button
          onClick={() => performOperation('=')}
          className="w-full mt-1.5 py-1 rounded-xs bg-gradient-to-b from-white to-[#ECE9D8] border border-[#7F9DB9] text-blue-900 font-bold text-sm shadow-xs hover:brightness-105 active:brightness-95 cursor-pointer"
        >
          =
        </button>
      </div>
    </div>
  );
};
