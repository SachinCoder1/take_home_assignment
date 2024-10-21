import React from "react";

const VideoPlayer = React.forwardRef(({ src }, ref) => {
  return (
    <video
      className="block rounded-lg"
      ref={ref}
      width="100%"
      src={src}
      controls={false}
    />
  );
});

export default VideoPlayer;
