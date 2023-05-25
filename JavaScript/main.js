inputch.onchange = evt => {
  const [file] = inputch.files
  if (file) {
    blah.src = URL.createObjectURL(file)
  }
  console.log(file);
}
const rangeInputs = document.querySelectorAll('input[type="range"]')
function handleInputChange(e) {
  let target = e.target
  if (e.target.type !== 'range') {
    target = document.getElementById('range')
  }
  const min = target.min
  const max = target.max
  const val = target.value

  target.style.backgroundSize = (val - min) * 100 / (max - min) + '% 100%'
}

rangeInputs.forEach(input => {
  input.addEventListener('input', handleInputChange)
})

const video = document.querySelector('.video-container video')
const playPausebtn = document.querySelector('.video-container .play-pause-btn')
const FullScreenBtn = document.querySelector('.video-container .full-screen-btn')
const TheaterBtn = document.querySelector('.video-container .theater-btn')
const MiniPlayerBtn = document.querySelector('.video-container .mini-player-btn')
const volumeSlider = document.querySelector('.video-container .volume-slider')
const MuteBtn = document.querySelector('.video-container .mute-btn')
const TotalTime = document.querySelector('.video-container .total-time')
const CurrentTime = document.querySelector('.video-container .current-time')


const videoContainer = document.querySelector('.video-container')

playPausebtn.addEventListener('click', () => {
  playPause()
})

document.addEventListener('keydown', e => {
  switch (e.key.toLowerCase()) {
    case " ":
    case "k":
      playPause()
      break;
    case "f":
      toggleFullScreen()
      break;
    case "t":
      toggleTheterMode()
      break;
    case "i":
      toggleMiniPlayerMode()
      break;
      case "m":
        toggleMute()
        break;
  }
})

function playPause() {
  if (video.paused == true) {
    video.play()
  } else {
    video.pause()
  }
}
video.addEventListener('pause', () => {
  videoContainer.classList.add('paused')
})
video.addEventListener('play', () => {
  videoContainer.classList.remove('paused')
})
videoContainer.addEventListener('click', (e) => {
  if (e.target.toString() == "[object HTMLVideoElement]") {
    playPause()
  }
})
playPausebtn.addEventListener('focus', () => {
  setTimeout(() => {
    playPausebtn.blur()
  }, 1500);
})

TheaterBtn.addEventListener('click', () => {
  toggleTheterMode()
})

function toggleTheterMode() {
  videoContainer.classList.toggle('theater')
}

FullScreenBtn.addEventListener('click', () => {
  toggleFullScreen()
})

function toggleFullScreen() {
  if (document.fullscreenElement == null) {
    videoContainer.requestFullscreen()
  } else {
    document.exitFullscreen()
  }
}

document.addEventListener('fullscreenchange', () => {
  videoContainer.classList.toggle('full-screen', document.fullscreenElement)
})
MiniPlayerBtn.addEventListener('click', () => {
  toggleMiniPlayerMode()
})
function toggleMiniPlayerMode() {
  if (videoContainer.classList.contains("mini-player")) {
    document.exitPictureInPicture()
  } else {
    video.requestPictureInPicture()
  }
}
video.addEventListener('enterpictureinpicture', () => {
  videoContainer.classList.add('mini-player')
})
video.addEventListener('leavepictureinpicture', () => {
  videoContainer.classList.remove('mini-player')
})

MuteBtn.addEventListener('click', toggleMute)
volumeSlider.addEventListener('input', e => {
  video.volume = e.target.value
  video.muted = e.target.value === 0
})
function toggleMute() {
  video.muted = !video.muted
}
video.addEventListener('volumechange', () => {
  volumeSlider.value = video.volume
  let VolumeLvl
  if (video.muted || video.volume === 0) {
    volumeSlider.value = 0
    VolumeLvl = "muted"
  } else if (video.volume <= .5) {
    VolumeLvl = "low"
  } else {
    VolumeLvl = "high"
  }
  videoContainer.dataset.volumelevel = VolumeLvl
})

video.addEventListener('loadeddata', () => {
  TotalTime.textContent = FormatTime(video.duration)
})
video.addEventListener('timeupdate', () => {
  CurrentTime.textContent = FormatTime(video.currentTime)
})
const leadingZeroFormatter = new Intl.NumberFormat(undefined, {
  minimumIntegerDigits: 2,
})
function FormatTime(time) {
  const s = Math.floor(time % 60)
  const m = Math.floor(time / 60) % 60
  const h = Math.floor(time / 3600)
  if (h === 0) {
    return `${m}:${leadingZeroFormatter.format(s)}`
  }else if (h !== 0) {
    return `${h}:${leadingZeroFormatter.format(m)}:${leadingZeroFormatter.format(s)}`
  }
}