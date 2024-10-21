// hooks/useSnapshot.js

import { useState, useEffect } from "react";
import { saveAs } from "file-saver";

const useSnapshot = (videoRef, cropPosition, cropSize, playbackRate, volume) => {
  const [snapshots, setSnapshots] = useState([]);
  const [cropperMoved, setCropperMoved] = useState(false);
  const [videoPlayed, setVideoPlayed] = useState(false);

  const captureSnapshot = () => {
    const timeStamp = videoRef.current.currentTime;
    const coordinates = [cropPosition.x, cropPosition.y, cropSize.width, cropSize.height];

    const newSnapshot = {
      timeStamp,
      coordinates,
      volume: videoRef.current.volume,
      playbackRate: videoRef.current.playbackRate,
    };

    setSnapshots((prev) => [...prev, newSnapshot]);
    setCropperMoved(false);
    setVideoPlayed(false);
  };

  // Download snapshots as JSON
  const handleGeneratePreview = () => {
    const jsonString = JSON.stringify(snapshots, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    saveAs(blob, "snapshots.json");
  };

  // Automatically capture snapshot every second
  useEffect(() => {
    const interval = setInterval(() => {
      if (videoPlayed && cropperMoved) {
        captureSnapshot();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [videoPlayed, cropperMoved]);

  return {
    captureSnapshot,
    setCropperMoved,
    setVideoPlayed,
    handleGeneratePreview,
  };
};

export default useSnapshot;
