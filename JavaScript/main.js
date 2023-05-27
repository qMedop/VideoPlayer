inputch.onchange = evt => {
  const [file] = inputch.files
  if (file) {
    blah.src = URL.createObjectURL(file)
    blahh.src = URL.createObjectURL(file)
    document.querySelector('.video-container .content').style.display = 'none'
  }
  console.log(file.name);
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
const video = document.querySelector('.video-container #blah')
const previewvideo = document.querySelector('.video-container #blahh')
const playPausebtn = document.querySelector('.video-container .play-pause-btn')
const FullScreenBtn = document.querySelector('.video-container .full-screen-btn')
const TheaterBtn = document.querySelector('.video-container .theater-btn')
const MiniPlayerBtn = document.querySelector('.video-container .mini-player-btn')
const volumeSlider = document.querySelector('.video-container .volume-slider')
const MuteBtn = document.querySelector('.video-container .mute-btn')
const TotalTime = document.querySelector('.video-container .total-time')
const CurrentTime = document.querySelector('.video-container .current-time')
const thubnail = document.querySelector('.video-container .thubnail')
const previewimg = document.querySelector('.video-container .timeline .preview-img')
const VideoContainer = document.querySelector('.video-container')
const TimeLineContaienr = document.querySelector('.video-container .timeline-container')
const ConrollsContaiener = document.querySelector('.video-container .controls-container')
const SkipForward = document.querySelector('.video-container .skip-forward')
const SkipBackward = document.querySelector('.video-container .skip-backward')
const SettingsContainer = document.querySelector('.video-container .settings .settings-option')
const skipBackwardAnimation = document.querySelector('.video-container .skipBackward-animation')
const skipforwardAnimation  = document.querySelector('.video-container .skipforward-animation ')
const PlayAnimation  = document.querySelector('.video-container .play-animation')
const PauseAnimation  = document.querySelector('.video-container .pause-animation')
let buttons = document.querySelectorAll('button')
let inputs = document.querySelectorAll('input')

for(let i =0 ; i < buttons.length ; i++) {
  buttons[i].onfocus = function () {
    buttons[i].blur()
  }
}
for(let i =0 ; i < inputs.length ; i++) {
  inputs[i].onfocus = function () {
    inputs[i].blur()
  }
}

const videoContainer = document.querySelector('.video-container')

playPausebtn.addEventListener('click', () => {
  playPause()
})

document.addEventListener('keydown', e => {
  switch (e.key.toLowerCase()) {
    case " ":
    case "k":
      playPause()
      ConrollsContaiener.style.opacity  = 1;
      clearTimeout(timeOut);
      HideView()
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
      case "arrowright": 
        SkipTo()
        break;
      case "arrowleft": 
        SkipBack()
        break;
        case "arrowup": 
        increaseVolume()
        break;
      case "arrowdown": 
        decreaceVolume()
        break;
  }
})
// TimeLine
TimeLineContaienr.addEventListener('mousemove' , HandleTimeLine)
TimeLineContaienr.addEventListener('mousedown' , toggleScrubbing)
TimeLineContaienr.addEventListener('click' , toggleScrubbing)
document.addEventListener('mouseup', e=> {
  if(isScrubbing) {
    toggleScrubbing(e)
  }
})
document.addEventListener('moousemove', e=> {
  if(isScrubbing) {
    HandleTimeLine(e)
  }
})
let isScrubbing = false
let wasPassed 
function toggleScrubbing(e) {
  const rect = TimeLineContaienr.getBoundingClientRect()
  const percent = Math.min(Math.max(0,e.x - rect.x), rect.width) / rect.width
  isScrubbing = (e.buttons & 1) === 1
  videoContainer.classList.toggle("scrubbing", isScrubbing)
  if(isScrubbing) {
    wasPassed = video.paused
    video.pause()
  } else {
    video.currentTime = percent * video.duration
    if(!wasPassed) {
      video.play()
    }
  }
}
function clcikk(e) {
  const rect = TimeLineContaienr.getBoundingClientRect()
  const percent = Math.min(Math.max(0,e.x - rect.x), rect.width) / rect.width
    video.currentTime = percent * video.duration

}
function HandleTimeLine(e) {
  const rect = TimeLineContaienr.getBoundingClientRect()
  const percent = Math.min(Math.max(0,e.x - rect.x), rect.width) / rect.width
  const percentt = percent * video.duration
  TimeLineContaienr.style.setProperty("--preview-position", percent)
  let percentTwo = percent
  if(percent > 0.92) {
    percentTwo = 0.92
  } else if(percent < 0.079){
    percentTwo = 0.079
  }
  TimeLineContaienr.style.setProperty("--preview-position-img", percentTwo)
  if (video.getAttribute('src') === '') {
    
  } else {
    previewvideo.currentTime = percentt
  }
  if(isScrubbing) {
    e.preventDefault()
    TimeLineContaienr.style.setProperty("--progress-position", percent)

  }

}
let PlayAnimationValue = 0
let PasueAnimationValue = 0
function playPause() {
  if (video.paused == true) {
    video.play()
    if(PasueAnimationValue == 0) {
      PasueAnimationValue = 1
      PauseAnimation.style.display = 'flex'
      setTimeout(() => {
        PauseAnimation.style.display = 'none'
          PasueAnimationValue = 0
      }, 700);
    }
  } else {
    video.pause()
    if(PlayAnimationValue == 0) {
      PlayAnimationValue = 1
      PlayAnimation.style.display = 'flex'
      setTimeout(() => {
          PlayAnimation.style.display = 'none'
          PlayAnimationValue = 0
      }, 700);
    }
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
videoContainer.addEventListener('dblclick', (e) => {
  if (e.target.toString() == "[object HTMLVideoElement]") {
    toggleFullScreen()
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
    if(video.videoWidth / video.videoHeight >= 0.4 && video.videoWidth / video.videoHeight <= 1) {
    } else {
      screen.orientation.lock('landscape');
    }
  } else {
    document.exitFullscreen()
    screen.orientation.unlock('landscape');
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
let mutedViedo = 0
let mutedViedoo = 0

function increaseVolume() {
  if(video.volume < 1 && mutedViedoo == 0) {
    video.volume = video.volume + 0.1
    mutedViedo = 0
  }  if(video.volume < 0.1) {
    video.volume = 0.1
    mutedViedoo = 0
  }
}
function decreaceVolume() {
  if(video.volume >= 0 && mutedViedo == 0) {
    video.volume = video.volume - 0.1
    if(video.volume < 0.00000001) {
      mutedViedo = 1
      VolumeLvl = "muted"
      
    }
  }
  videoContainer.dataset.volumelevel = VolumeLvl  
}
let VolumeLvl
video.addEventListener('volumechange', () => {
  volumeSlider.value = video.volume
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
function toggleMute() {
  video.muted = !video.muted
}

video.addEventListener('loadeddata', () => {
  TotalTime.textContent = FormatTime(video.duration)
})

video.addEventListener('timeupdate', () => {
  CurrentTime.textContent = FormatTime(video.currentTime)
  const percent = video.currentTime / video.duration
  TimeLineContaienr.style.setProperty("--progress-position", percent)
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
let timeOut
const  HideView = () => {
  if(video.paused) {
  } else {
    timeOut = setTimeout(() => {
  ConrollsContaiener.style.opacity  = 0
}, 2000);
  }
}
HideView()
videoContainer,addEventListener('mousemove', () => {
  ConrollsContaiener.style.opacity  = 1;
  clearTimeout(timeOut);
  HideView()
})
ConrollsContaiener,addEventListener('click', () => {
  ConrollsContaiener.style.opacity  = 1;
  clearTimeout(timeOut);
  HideView()
})

// SKip
let SkipValue = 5
SkipForward.addEventListener('click' , SkipTo)
SkipBackward.addEventListener('click' , SkipBack)

let animationvalueone = 0
function SkipTo() {
  video.currentTime = video.currentTime + SkipValue
  document.querySelector('.video-container .center .skip-forward').style.transform= "scale(0.96)";
  setTimeout(() => {
    document.querySelector('.video-container .center .skip-forward').style.transform= "scale(1)";
  }, 150);
  if(animationvalueone == 0) {
    animationvalueone = 1
    skipforwardAnimation.style.display = 'flex'
    setTimeout(() => {
      skipforwardAnimation.style.opacity = '1'
    }, 10);
    setTimeout(() => {
      skipforwardAnimation.style.display = 'none'
      skipforwardAnimation.style.opacity = '0'
      animationvalueone = 0
    }, 600);
  }
}
let animationvaluetwo = 0
function SkipBack() {
  video.currentTime =  video.currentTime - SkipValue
  document.querySelector('.video-container .center .skip-backward').style.transform= "scale(0.96)";
  setTimeout(() => {
    document.querySelector('.video-container .center .skip-backward').style.transform= "scale(1)";
  }, 150);
  if(animationvaluetwo == 0) {
    animationvaluetwo = 1
    skipBackwardAnimation.style.display = 'flex'
    setTimeout(() => {
      skipBackwardAnimation.style.opacity = '1'
    }, 10);
    setTimeout(() => {
      skipBackwardAnimation.style.display = 'none'
      skipBackwardAnimation.style.opacity = '0'
      animationvaluetwo = 0
    }, 600);
  }
}

//Settings 
let settingsValue = 0
settingsBtn.addEventListener('click', () => {
  if(settingsValue == 0) {
    OpenSettings()
  } else {
    ClsoeSettings()
  }
})
function OpenSettings() {
  setTimeout(() => {
    settingsValue = 1
  }, 10);
  settingsBtn.style.transform = 'rotate(58deg)'
  SettingsContainer.style.display = 'block'
  setTimeout(() => {
    SettingsContainer.style.opacity = '1'
  }, 10);
}
function ClsoeSettings() {
  settingsValue = 0
  settingsBtn.style.transform = 'rotate(0deg)'
  SettingsContainer.style.opacity = '0'
  setTimeout(() => {
    SettingsContainer.style.display = 'none'
  }, 150);
}
document.addEventListener('click', e => {
  if(settingsValue == 1) {
    if (e.target.getAttribute('active')) {
    } else {
      ClsoeSettings()
    }
  }

})
Skip.addEventListener('click', () => {
  if(SkipValue == 5) {
    SkipValue = 10
    SkipValueHtml.innerHTML = SkipValue
    BAValue.innerHTML = SkipValue
    FAValue.innerHTML = SkipValue
  } else {
    SkipValue = 5
    SkipValueHtml.innerHTML = SkipValue
    BAValue.innerHTML = SkipValue
    FAValue.innerHTML = SkipValue
  }
  Skip.style.transform= "scale(0.96)";
  setTimeout(() => {
    Skip.style.transform= "scale(1)";
  }, 150);
})

let loopStatue

Loop.addEventListener('click', () => {
  if(video.loop == false) {
    video.loop = true
    LoopValue.innerHTML = 'on'
  } else {
    video.loop = false
    LoopValue.innerHTML = 'off'
  }
  Loop.style.transform= "scale(0.96)";
  setTimeout(() => {
    Loop.style.transform= "scale(1)";
  }, 150);
})

decrease.addEventListener('click' , decreaseSpeed)
increase.addEventListener('click' , increaseSpeed)
function decreaseSpeed() {
  if(video.playbackRate > 0.25) {
    video.playbackRate = video.playbackRate - 0.25
    speedValue.innerHTML =  video.playbackRate
    decrease.style.transform= "scale(0.96)";
    setTimeout(() => {
      decrease.style.transform= "scale(1)";
    }, 150);
  }
}
function increaseSpeed() { 
  if(video.playbackRate < 3) {
    video.playbackRate = video.playbackRate + 0.25
    speedValue.innerHTML =  video.playbackRate
    increase.style.transform= "scale(0.9)";
    setTimeout(() => {
      increase.style.transform= "scale(1)";
    }, 150);  }
}

