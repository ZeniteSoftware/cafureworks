import React, { useState, useEffect } from 'react';
import { useDesktop } from '../../context/DesktopContext';
import { sounds } from '../../utils/sound';

export const XpDateTimeDialog: React.FC = () => {
  const { closeWindow } = useDesktop();

  const [currentDate, setCurrentDate] = useState(new Date());
  const [activeTab, setActiveTab] = useState<'datetime' | 'timezone'>('datetime');

  // Live ticking clock
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();
  const seconds = currentDate.getSeconds();

  // Analog clock hand angles
  const secondAngle = seconds * 6; // 360 / 60
  const minuteAngle = minutes * 6 + seconds * 0.1;
  const hourAngle = (hours % 12) * 30 + minutes * 0.5;

  const monthNames = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const currentDay = currentDate.getDate();

  // Days in month calculation
  const firstDayOfWeek = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const calendarDays = [];
  for (let i = 0; i < firstDayOfWeek; i++) {
    calendarDays.push(null);
  }
  for (let d = 1; d <= daysInMonth; d++) {
    calendarDays.push(d);
  }

  return (
    <div
      style={{ fontFamily: 'Tahoma, "Segoe UI", sans-serif' }}
      className="flex flex-col h-full bg-[#ECE9D8] text-[11px] text-gray-800 p-3 select-none"
    >
      {/* Tabs */}
      <div className="flex items-center space-x-1 border-b border-[#919B9C] mb-3">
        <button
          onClick={() => setActiveTab('datetime')}
          className={`px-3 py-1 text-[11px] rounded-t-sm border-t border-l border-r cursor-pointer transition-colors ${
            activeTab === 'datetime'
              ? 'bg-[#ECE9D8] border-[#919B9C] font-semibold -mb-[1px] pb-1.5 bg-gradient-to-t from-[#ECE9D8] to-white'
              : 'bg-[#D8D2BD] border-transparent text-gray-700 hover:bg-[#E5E0CE]'
          }`}
        >
          Data e hora
        </button>
        <button
          onClick={() => setActiveTab('timezone')}
          className={`px-3 py-1 text-[11px] rounded-t-sm border-t border-l border-r cursor-pointer transition-colors ${
            activeTab === 'timezone'
              ? 'bg-[#ECE9D8] border-[#919B9C] font-semibold -mb-[1px] pb-1.5 bg-gradient-to-t from-[#ECE9D8] to-white'
              : 'bg-[#D8D2BD] border-transparent text-gray-700 hover:bg-[#E5E0CE]'
          }`}
        >
          Fuso horário
        </button>
      </div>

      {activeTab === 'datetime' && (
        <div className="flex-1 grid grid-cols-2 gap-3">
          {/* Left: Calendar */}
          <div className="p-2 border border-[#919B9C] rounded-xs bg-white/50 flex flex-col space-y-2">
            <div className="flex items-center justify-between text-[11px] font-bold text-gray-800 px-1">
              <span>{monthNames[currentMonth]}</span>
              <span>{currentYear}</span>
            </div>

            {/* Days of week */}
            <div className="grid grid-cols-7 gap-1 text-center font-bold text-[10px] text-gray-600 border-b border-gray-300 pb-1">
              <span>D</span>
              <span>S</span>
              <span>T</span>
              <span>Q</span>
              <span>Q</span>
              <span>S</span>
              <span>S</span>
            </div>

            {/* Days grid */}
            <div className="grid grid-cols-7 gap-1 text-center text-[10.5px]">
              {calendarDays.map((day, idx) => {
                if (!day) return <span key={`empty-${idx}`} />;
                const isToday = day === currentDay;
                return (
                  <span
                    key={`day-${day}`}
                    className={`py-0.5 rounded-2xs cursor-default ${
                      isToday
                        ? 'bg-[#316AC5] text-white font-bold shadow-xs'
                        : 'text-gray-800 hover:bg-blue-100'
                    }`}
                  >
                    {day}
                  </span>
                );
              })}
            </div>
          </div>

          {/* Right: Analog Clock + Digital Time */}
          <div className="p-2 border border-[#919B9C] rounded-xs bg-white/50 flex flex-col items-center justify-between">
            {/* Analog Clock Face */}
            <div className="relative w-36 h-36 rounded-full border-4 border-[#7A8A9E] bg-gradient-to-tr from-white via-[#F5F8FC] to-[#E3ECF8] shadow-md flex items-center justify-center">
              {/* Clock Tick Marks */}
              {[...Array(12)].map((_, i) => {
                const angle = i * 30;
                return (
                  <div
                    key={i}
                    style={{ transform: `rotate(${angle}deg)` }}
                    className="absolute inset-0 flex justify-center py-1 pointer-events-none"
                  >
                    <div className={`w-[2px] ${i % 3 === 0 ? 'h-3 bg-gray-800' : 'h-1.5 bg-gray-400'}`} />
                  </div>
                );
              })}

              {/* Hour Hand */}
              <div
                style={{
                  transform: `rotate(${hourAngle}deg)`,
                  transformOrigin: 'bottom center',
                }}
                className="absolute w-[3.5px] h-10 bg-gray-900 rounded-t-sm bottom-1/2 left-[calc(50%-1.75px)] shadow-xs transition-transform"
              />

              {/* Minute Hand */}
              <div
                style={{
                  transform: `rotate(${minuteAngle}deg)`,
                  transformOrigin: 'bottom center',
                }}
                className="absolute w-[2px] h-14 bg-gray-800 rounded-t-sm bottom-1/2 left-[calc(50%-1px)] shadow-xs transition-transform"
              />

              {/* Second Hand */}
              <div
                style={{
                  transform: `rotate(${secondAngle}deg)`,
                  transformOrigin: 'bottom center',
                }}
                className="absolute w-[1px] h-15 bg-red-600 bottom-1/2 left-[calc(50%-0.5px)] transition-transform"
              />

              {/* Center Pin */}
              <div className="relative z-10 w-2.5 h-2.5 rounded-full bg-red-700 border border-white shadow-xs" />
            </div>

            {/* Digital Time display box */}
            <div className="mt-2 px-4 py-1 bg-white border border-[#7F9DB9] rounded-xs font-mono font-bold text-[13px] text-gray-900 shadow-inner">
              {String(hours).padStart(2, '0')}:
              {String(minutes).padStart(2, '0')}:
              {String(seconds).padStart(2, '0')}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'timezone' && (
        <div className="flex-1 p-3 border border-[#919B9C] rounded-xs bg-white space-y-3">
          <div className="space-y-1">
            <span className="font-bold text-gray-800">Fuso Horário Atual:</span>
            <div className="p-2 bg-[#F5F8FC] border border-[#7F9DB9] rounded-xs font-semibold text-blue-900">
              (GMT-03:00) Horário de Brasília
            </div>
          </div>
          <p className="text-gray-600 text-[10.5px] leading-relaxed">
            O relógio do sistema está sincronizado com a rede de borda da Cloudflare e com o horário local da sua máquina.
          </p>
        </div>
      )}

      {/* Footer Buttons */}
      <div className="flex justify-end space-x-2 pt-3 border-t border-[#D4CEB8] mt-2">
        <button
          onClick={() => {
            sounds.playClick();
            closeWindow('app-datetime');
          }}
          className="px-4 py-1 bg-gradient-to-b from-[#F2F0E4] to-[#E3DFD0] hover:from-[#E3DFD0] hover:to-[#D5D0C0] border border-[#7A7565] rounded-xs font-semibold text-gray-900 cursor-pointer shadow-xs min-w-[70px]"
        >
          OK
        </button>
        <button
          onClick={() => {
            sounds.playClick();
            closeWindow('app-datetime');
          }}
          className="px-4 py-1 bg-gradient-to-b from-[#F2F0E4] to-[#E3DFD0] hover:from-[#E3DFD0] hover:to-[#D5D0C0] border border-[#7A7565] rounded-xs text-gray-800 cursor-pointer shadow-xs min-w-[70px]"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
};
