import React from "react";

const Cropper = React.forwardRef(
  ({ cropPosition, cropSize, handleMouseDown }, ref) => {
    return (
      <div
        className="absolute top-0 h-full border-white cursor-move pointer-events-auto border-x-2"
        ref={ref}
        style={{
          left: `${cropPosition.x}px`,
          width: `${cropSize.width}px`, // Updated to use dynamic width
          backgroundColor: "rgba(255, 255, 255, 0.2)", // Transparent white background
        }}
        onMouseDown={handleMouseDown}
      >
        {/* Vertical grid lines */}
        <div className="absolute top-0 bottom-0 left-1/3 w-[1px] bg-white" />
        <div className="absolute top-0 bottom-0 left-2/3 w-[1px] bg-white" />
        <div className="absolute left-0 right-0 top-1/3 h-[1px] bg-white" />
        <div className="absolute left-0 right-0 top-2/3 h-[1px] bg-white" />
      </div>
    );
  }
);

export default Cropper;
