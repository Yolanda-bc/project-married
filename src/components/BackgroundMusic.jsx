import { useRef, useState } from "react";

import "../styles/core/_backgroundMusic.scss";

function BackgroundMusic() {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  const handlePlay = () => {
    audioRef.current.play();
    setPlaying(true);
  };

  const handlePause = () => {
    audioRef.current.pause();
    setPlaying(false);
  };

  return (
    <div className="play">
      <audio ref={audioRef} loop>
        <source src="../music/melody.mp3" type="audio/mpeg" />
        Tu navegador no soporta el elemento audio.
      </audio>
      {!playing ? (
        <button className="music" onClick={handlePlay}>
          ▶ Reproducir música
        </button>
      ) : (
        <button className="music" onClick={handlePause}>
          ⏸ Pausar música
        </button>
      )}
    </div>
  );
}

export default BackgroundMusic;
