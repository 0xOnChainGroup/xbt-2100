"use client";
import React, { useRef, useState, useEffect, MutableRefObject } from "react";
import Hls from "hls.js";

interface MediaPlayerProps {
  togglePlayPause: (sound: string) => void;
  audioRef: MutableRefObject<HTMLAudioElement | null>;
}

const MediaPlayer: React.FC<MediaPlayerProps> = ({
  togglePlayPause,
  audioRef,
}) => {
  const audioSrc = "/audio.m3u8";
  const [progress, setProgress] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const audio = audioRef.current;
      setCurrentTime(audio.currentTime);
      setDuration(audio.duration);
      setProgress((audio.currentTime / audio.duration) * 100);
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(audioSrc);
        hls.attachMedia(audio);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          setDuration(audio.duration);
        });
      } else if (audio.canPlayType("application/vnd.apple.mpegurl")) {
        audio.src = audioSrc;
      } else {
        console.error("HLS not supported on this platform.");
        return;
      }
      audio.volume = 0.3;
      audio.addEventListener("timeupdate", handleTimeUpdate);
      return () => audio.removeEventListener("timeupdate", handleTimeUpdate);
    }
  }, [audioSrc]);

  return (
    <div className="media-player">
      <audio ref={audioRef} />
      <div className="controls"></div>
    </div>
  );
};

export default MediaPlayer;
