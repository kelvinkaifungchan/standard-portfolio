import React, { useState, ReactNode } from "react";

interface TooltipProps {
  children: ReactNode;
  content: string;
}

const Tooltip: React.FC<TooltipProps> = ({ children, content }) => {
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const [isTooltipVisible, setTooltipVisible] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX: x, clientY: y } = e;
    const offset = 10;
    setTooltipPosition({ top: y + offset, left: x + offset });
  };

  const handleMouseEnter = () => {
    setTooltipVisible(true);
  };

  const handleMouseLeave = () => {
    setTooltipVisible(false);
  };

  return (
    <div
      className="relative inline-block"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}>
      {children}
      {isTooltipVisible && (
        <div
          className="fixed bg-black text-white px-4 py-2 rounded opacity-100 transition-opacity"
          style={{ top: tooltipPosition.top, left: tooltipPosition.left }}>
          {content}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
