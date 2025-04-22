
// Import the audio files mapping
import { audioFiles } from './src/audioFiles.js';

const audio = document.getElementById('audio-player');
let currentStation = null;

function playRandomTrack(stationKey) {
  const tracks = audioFiles[stationKey];
  if (!tracks || tracks.length === 0) {
    console.warn(`No audio tracks found for station: ${stationKey}`);
    return;
  }

  // Choose a random track
  const randomIndex = Math.floor(Math.random() * tracks.length);
  const trackPath = tracks[randomIndex];

  // Set source and then play, adding an event listener to catch any errors
  audio.src = trackPath;
  audio.load();
  audio.play().then(() => {
    console.log(`Playing: ${trackPath}`);
  }).catch(error => {
    console.error('Error playing audio:', error);
  });
  currentStation = stationKey;
}

function stopAudio() {
  audio.pause();
  audio.currentTime = 0;
  currentStation = null;
  console.log('Audio stopped');
}

document.querySelectorAll('.radio-station').forEach(button => {
  button.addEventListener('click', () => {
    const stationKey = button.dataset.station;
    if (stationKey !== currentStation) {
      playRandomTrack(stationKey);
      updateActive(button);
    }
  });
});

document.querySelector('.radio-off').addEventListener('click', () => {
  stopAudio();
  updateActive(null);
});

function updateActive(activeButton) {
  document.querySelectorAll('.radio-station').forEach(btn => {
    if (btn === activeButton) {
      btn.classList.add('active');
      btn.style.filter = "drop-shadow(0 0 20px #f97316)";
    } else {
      btn.classList.remove('active');
      btn.style.filter = "drop-shadow(0 0 6px #8b5cf6cc)";
    }
  });
  document.querySelector('.radio-off').classList.remove('active');
}

