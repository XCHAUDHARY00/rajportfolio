import { useState, useEffect } from 'react';

export default function LiveClock() {
  const [timeStr, setTimeStr] = useState('');
  const [dateStr, setDateStr] = useState('');

  useEffect(() => {
    const update = () => {
      const now = new Date();
      // Format: 6:50pm
      let hours = now.getHours();
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const ampm = hours >= 12 ? 'pm' : 'am';
      hours = hours % 12;
      hours = hours ? hours : 12;
      setTimeStr(`${hours}:${minutes}${ampm}`);

      // Format: 3 November, 2026
      const day = now.getDate();
      const month = now.toLocaleString('en-US', { month: 'short' });
      const year = now.getFullYear();
      setDateStr(`${day} ${month}, ${year}`);
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1.5 rounded-full text-xs font-sans font-medium transition-colors border bg-white/40 dark:bg-white/5 border-black/10 dark:border-white/10 text-[#403B35] dark:text-[#C5BFB5] backdrop-blur-sm select-none">
      <span className="hidden sm:inline opacity-75">Local time</span>
      <span className="font-semibold text-[#1C1A18] dark:text-[#FAF7F2] font-mono tracking-tight text-[11px] sm:text-xs">
        {timeStr}
      </span>
      <span className="hidden md:inline opacity-40">•</span>
      <span className="hidden md:inline opacity-85">{dateStr}</span>
    </div>
  );
}
