import React, { useEffect } from "react";

const DynamicPreview = React.forwardRef(
  ({ videoRef, cropperRef, cropPosition, cropSize, isCropperActive }, ref) => {
    const updatePreview = () => {
      const canvas = ref.current;
      const ctx = canvas.getContext("2d");

      const video = videoRef.current;
      const cropper = cropperRef.current;

      const { x, y } = cropPosition;
      const { width: cropWidth, height: cropHeight } = cropSize;

      // Get the dimensions of the video element and the actual video size
      const videoRect = video.getBoundingClientRect();
      const videoWidth = video.videoWidth;
      const videoHeight = video.videoHeight;

      // Calculate the scale factor between the displayed video and the actual video dimensions
      const scaleX = videoWidth / videoRect.width;
      const scaleY = videoHeight / videoRect.height;

      // Map the cropper dimensions and position to the actual video dimensions
      const actualX = x * scaleX;
      const actualY = y * scaleY;
      const actualWidth = cropWidth * scaleX;
      const actualHeight = cropHeight * scaleY;

      // Set the canvas resolution to a higher quality
      const dpr = window.devicePixelRatio || 1; // Use the device pixel ratio for sharper rendering

      // Set canvas size based on the cropper dimensions (maintaining the cropper's aspect ratio)
      canvas.width = cropWidth * dpr;
      canvas.height = cropHeight * dpr;

      // Ensure the CSS dimensions remain constant (this is the visible size of the canvas)
      canvas.style.width = `${cropWidth}px`;
      canvas.style.height = `${cropHeight}px`;

      // Scale the context based on the device pixel ratio
      ctx.scale(dpr, dpr);

      // Clear the canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw the cropped area on the canvas
      ctx.drawImage(
        video,
        actualX,
        actualY,
        actualWidth,
        actualHeight, // Source rectangle (cropped area from the video)
        0,
        0,
        cropWidth, // Destination width (same as cropper)
        cropHeight // Destination height (same as cropper)
      );
    };

    // previous: (we are not using this as the fps is slower with this)
    // useEffect(() => {
    //     if (!isCropperActive) {
    //         return;
    //     };
    //     const interval = setInterval(() => {
    //         if (!videoRef.current.paused && !videoRef.current.ended) {
    //             updatePreview();
    //         }
    //     }, 100); // Update preview every 100ms

    //     return () => clearInterval(interval);
    // }, [cropPosition, cropSize, isCropperActive]);

    // using window.requestAnimationFrame which is given by browser.
    useEffect(() => {
      let animationFrameId;

      const renderFrame = () => {
        if (
          isCropperActive &&
          !videoRef.current.paused &&
          !videoRef.current.ended
        ) {
          updatePreview();
        }
        animationFrameId = requestAnimationFrame(renderFrame); // Keep rendering at the browser's FPS rate
      };

      if (isCropperActive) {
        animationFrameId = requestAnimationFrame(renderFrame);
      }

      return () => cancelAnimationFrame(animationFrameId); // Clean up on unmount
    }, [cropPosition, cropSize, isCropperActive]);

    return (
      <div className="ml-5 text-center">
        <h4 className="pb-2 font-bold text-gray-400">Preview</h4>
        {isCropperActive ? (
          <canvas className="mx-auto rounded-lg" ref={ref}></canvas>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-gray-400 gap-y-4">
            <img src="/svg/play_box.svg" alt="play box" />
            <p className="text-base font-bold text-white">
              Preview not available
            </p>
            <p className="text-xs text-gray-400">
              Please click on "Start Cropper" <br />
              and then play video
            </p>
          </div>
        )}
      </div>
    );
  }
);

export default DynamicPreview;
