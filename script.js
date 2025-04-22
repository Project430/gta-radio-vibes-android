
/*
GTA V Radio Selector Script
- Handles clicks on stations
- Plays a random track from the corresponding station folder
- Stops audio on OFF
- Stations folder and mp3 list are predefined here to work offline
*/

// Mapping each station to a folder and audio tracks
const stations = {
  station1: {
    folder: 'radios/los_santos',
    tracks: ['track1.mp3', 'track2.mp3', 'track3.mp3']
  },
  station2: {
    folder: 'radios/rock_radio',
    tracks: ['track1.mp3', 'track2.mp3', 'track3.mp3', 'track4.mp3']
  },
  station3: {
    folder: 'radios/classic_rock',
    tracks: ['track1.mp3', 'track2.mp3']
  },
  station4: {
    folder: 'radios/pop_hits',
    tracks: ['track1.mp3', 'track2.mp3', 'track3.mp3']
  },
  station5: {
    folder: 'radios/jazz_vibes',
    tracks: ['track1.mp3', 'track2.mp3']
  },
  station6: {
    folder: 'radios/electro_beats',
    tracks: ['track1.mp3', 'track2.mp3', 'track3.mp3', 'track4.mp3']
  },
  station7: {
    folder: 'radios/reggae',
    tracks: ['track1.mp3']
  },
  station8: {
    folder: 'radios/hip_hop',
    tracks: ['track1.mp3', 'track2.mp3', 'track3.mp3']
  }
};

const audio = document.getElementById('audio-player');
let currentStation = null;

function playRandomTrack(stationKey) {
  const station = stations[stationKey];
  if (!station) return;

  const { folder, tracks } = station;
  if (tracks.length === 0) return;

  // Choose a random track
  const randomIndex = Math.floor(Math.random() * tracks.length);
  const trackPath = `${folder}/${tracks[randomIndex]}`;

  audio.src = trackPath;
  audio.play();
  currentStation = stationKey;
  console.log(`Playing: ${trackPath}`);
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
    if(stationKey !== currentStation) {
      playRandomTrack(stationKey);
      updateActive(button);
    }
  });
});

document.querySelector('.radio-off').addEventListener('click', () => {
  stopAudio();
  updateActive(null);
});

// Visual feedback for the selected station
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

