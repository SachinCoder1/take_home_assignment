import React, { useRef, useState, useEffect } from "react";
import VideoControls from "./VideoControls";
import Cropper from "./Cropper";
import VideoPlayer from "./VideoPlayer";
import { aspectRatios } from "../lib/data";
import CropperActions from "./CropperAction";
import DynamicPreview from "./DynamicPreview";
import Button from "./ui/Button";
import useSnapshot from "../lib/hooks/useSnapshot";
import useCropper from "../lib/hooks/useCropper";
import useControls from "../lib/hooks/useControls";

const Main = ({ videoSrc }) => {
  const videoRef = useRef(null); // Video reference
  const cropperRef = useRef(null); // Cropper reference
  const canvasRef = useRef(null); // Canvas reference for preview
  const [cropPosition, setCropPosition] = useState({ x: 50, y: 0 }); // Initial cropper position
  const [playbackRate, setPlaybackRate] = useState(1); // Track playback speed
  const [volume, setVolume] = useState(1); // Track volume level
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [aspectRatio, setAspectRatio] = useState("9:18"); // default aspect ratio
  const [isCropperActive, setIsCropperActive] = useState(false);

  const [cropSize, setCropSize] = useState({ width: 150, height: 100 }); // Cropper size

  const { captureSnapshot, handleGeneratePreview } = useSnapshot(
    videoRef,
    cropPosition,
    cropSize,
    playbackRate,
    volume
  );

  const {
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleRemoveCropper,
    handleStartCropper,
  } = useCropper(videoRef, cropperRef, setCropPosition, setIsCropperActive, captureSnapshot);

  const { handlePlayPause, isPlaying } = useControls(
    videoRef,
    setCurrentTime,
    captureSnapshot
  );

  // Handle playback speed change
  const handleSpeedChange = (value) => {
    const newSpeed = parseFloat(value);
    videoRef.current.playbackRate = newSpeed;
    setPlaybackRate(newSpeed);
    captureSnapshot(); // Capture snapshot when speed changes
  };

  // Handle volume change
  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    videoRef.current.volume = newVolume;
    setVolume(newVolume);
    captureSnapshot();
  };

  // Handle video time update for the seek bar
  const handleTimeUpdate = () => {
    setCurrentTime(videoRef.current.currentTime);
  };

  // Handle seek bar change
  const handleSeekChange = (e) => {
    const newTime = parseFloat(e.target.value);
    videoRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };


  useEffect(() => {
    const video = videoRef.current;
  
    if (video) {
      const videoRect = video.getBoundingClientRect();
      const videoHeight = videoRect.height; // Cropper height should be 100% of the video height
      const aspectRatioValue = aspectRatios[aspectRatio];
  
      // Calculate the cropper width based on the selected aspect ratio
      const cropWidth = videoHeight * aspectRatioValue;
  
      // Update the cropper size
      setCropSize({
        width: Math.min(cropWidth, videoRect.width), // Ensure the width doesn't exceed video width
        height: videoHeight,
      });
  
      // Adjust cropper position to ensure it doesn't go outside video bounds
      setCropPosition((prevPosition) => {
        const maxX = videoRect.width - Math.min(cropWidth, videoRect.width);
        const newX = Math.min(prevPosition.x, maxX); // Ensure the cropper stays within bounds
        return { ...prevPosition, x: newX };
      });
  
      captureSnapshot(); // Capture snapshot when aspect ratio changes
    }
  }, [aspectRatio]);
  
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const setVideoDuration = () => {
        setDuration(video.duration);
      };
      video.addEventListener("loadedmetadata", setVideoDuration);
      video.addEventListener("timeupdate", handleTimeUpdate);

      return () => {
        video.removeEventListener("loadedmetadata", setVideoDuration);
        video.removeEventListener("timeupdate", handleTimeUpdate);
      };
    }
  }, []);

  const handleAspectRatioChange = (value) => {
    setAspectRatio(value);
  };

  return (
    <div className="flex flex-col justify-between h-full">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div>
          <div
            className="relative md:w-[500px] w-full"
            onMouseMove={handleMouseMove} // Handle dragging movement
            onMouseUp={handleMouseUp} // Stop dragging
          >
            <VideoPlayer ref={videoRef} src={videoSrc} />
            {isCropperActive && (
              <Cropper
                cropPosition={cropPosition}
                cropSize={cropSize}
                handleMouseDown={handleMouseDown}
                ref={cropperRef}
              />
            )}
          </div>
          <div>
            <VideoControls
              isPlaying={isPlaying}
              handlePlayPause={handlePlayPause}
              playbackRate={playbackRate}
              handleSpeedChange={handleSpeedChange}
              volume={volume}
              handleVolumeChange={handleVolumeChange}
              currentTime={currentTime}
              duration={duration}
              handleSeekChange={handleSeekChange}
              aspectRatio={aspectRatio}
              handleAspectRatioChange={handleAspectRatioChange}
            />
          </div>
        </div>

        <DynamicPreview
          ref={canvasRef}
          videoRef={videoRef}
          cropperRef={cropperRef}
          cropPosition={cropPosition}
          cropSize={cropSize}
          isCropperActive={isCropperActive}
        />
      </div>
      <div className="border-t border-[#494C55]">
        <div className="justify-between mt-4 md:flex ">
          <CropperActions
            handleStartCropper={handleStartCropper}
            handleRemoveCropper={handleRemoveCropper}
            isCropperActive={isCropperActive}
            generatePreview={handleGeneratePreview}
          />
          <Button type="secondary">Cancel</Button>
        </div>
      </div>
    </div>
  );
};

export default Main;
