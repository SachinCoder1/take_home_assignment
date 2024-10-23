// hooks/useCropper.js

import { useState } from "react";

const useCropper = (videoRef, cropperRef, setCropPosition,setIsCropperActive,captureSnapshot) => {
  const [isDragging, setIsDragging] = useState(false);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  // Handle mouse down on cropper to start dragging
  const handleMouseDown = (e) => {
    const cropperRect = cropperRef.current.getBoundingClientRect();
    const offsetX = e.clientX - cropperRect.left;
    const offsetY = e.clientY - cropperRect.top;
    setMouseOffset({ x: offsetX, y: offsetY });
    setIsDragging(true);
  };

  // Handle mouse movement to drag cropper
  const handleMouseMove = (e) => {
    if (isDragging) {
      const videoRect = videoRef.current.getBoundingClientRect();
      const newX = e.clientX - videoRect.left - mouseOffset.x;
      const newY = e.clientY - videoRect.top - mouseOffset.y;

      // Restrict movement within video bounds
      const maxX = videoRect.width - cropperRef.current.offsetWidth;
      const maxY = videoRect.height - cropperRef.current.offsetHeight;

      setCropPosition({
        x: Math.min(Math.max(0, newX), maxX),
        y: Math.min(Math.max(0, newY), maxY),
      });

      captureSnapshot();
    }
  };

  const handleStartCropper = () => {
    setIsCropperActive(true);
  };

  // Handle cropper removal
  const handleRemoveCropper = () => {
    setIsCropperActive(false);
  };


  // Stop dragging when mouse is released
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return {
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleStartCropper,
    handleRemoveCropper
  };
};

export default useCropper;
