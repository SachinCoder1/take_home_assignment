// hooks/useControls.js

import { useState } from "react";

const useControls = (videoRef) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoPlayed, setVideoPlayed] = useState(false);

  const handlePlayPause = () => {
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
      setVideoPlayed(true); // Mark video as played
    }
    setIsPlaying(!isPlaying);
  };

  return {
    isPlaying,
    videoPlayed,
    handlePlayPause,
  };
};

export default useControls;
