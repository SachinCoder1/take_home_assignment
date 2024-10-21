import React from 'react';

const Slider = ({ min, max, step, value, onChange, className="" }) => {
  return (
    <div className="relative flex items-center w-full">
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={onChange}
        className={`slider-thumb w-full h-1.5 bg-gray-600 rounded-lg cursor-pointer ${className}`}
      />
    </div>
  );
};

export default Slider;
