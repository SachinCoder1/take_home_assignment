import React from "react";
import { aspectRatios, playbackSpeedOptions } from "../lib/data";
import Dropdown from "./ui/Select";
import Slider from "./ui/Slider";
import { Pause, Play, Volume2 } from "lucide-react";

const formatTime = (timeInSeconds) => {
  const hours = Math.floor(timeInSeconds / 3600);
  const minutes = Math.floor((timeInSeconds % 3600) / 60);
  const seconds = Math.floor(timeInSeconds % 60);

  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
};

const VideoControls = ({
  isPlaying,
  handlePlayPause,
  playbackRate,
  handleSpeedChange,
  volume,
  handleVolumeChange,
  currentTime,
  duration,
  handleSeekChange,
  aspectRatio,
  handleAspectRatioChange,
}) => {
  return (
    <div className="flex flex-col mt-2.5 gap-y-4">
      <div className="flex items-center justify-between w-full">
        {/* Play/Pause Button */}
        <button onClick={handlePlayPause} className="focus:outline-none">
          {isPlaying ? (
            <Pause className="text-white" />
          ) : (
            <Play className="text-white" fill="#ffffff" />
          )}
        </button>

        {/* Seek Control */}
        <div className="flex-grow mx-3">
          <Slider
            min="0"
            max={duration}
            step="0.01"
            value={currentTime}
            onChange={handleSeekChange}
          />
        </div>
      </div>

      <div className="flex items-center justify-between">
        {/* Current Time and Duration */}
        <span className="text-sm text-gray-400 font-[500]">
          <span className="text-white">{formatTime(currentTime)} </span>|{" "}
          {formatTime(duration)}
        </span>

        <div className="flex items-center ml-4 gap-x-2">
          <Volume2 fill="#FFFFFF" className="text-white" />
          <Slider
            className="!w-16"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
          />
        </div>
      </div>

      <div className="flex items-center gap-x-4">
        {/* Playback Speed Control */}
        <Dropdown
          label="Playback speed"
          value={playbackRate}
          options={playbackSpeedOptions}
          onChange={handleSpeedChange}
          customText="x"
        />

        {/* Cropper Aspect Ratio */}
        <Dropdown
          label="Cropper Aspect Ratio"
          value={aspectRatio}
          options={Object.keys(aspectRatios).map((key) => ({
            value: key,
            label: key,
          }))}
          onChange={handleAspectRatioChange}
        />

        {/* Volume Control */}
      </div>
    </div>
  );
};

export default VideoControls;
