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
const ConrollsMContaiener = document.querySelector('.video-container .center')
const SkipForward = document.querySelector('.video-container .skip-forward')
const SkipBackward = document.querySelector('.video-container .skip-backward')
const SettingsContainer = document.querySelector('.video-container .settings .settings-option')
const MobilePlay = document.querySelector('.video-container .center .play-pause-btn')
const skipBackwardAnimation = document.querySelector('.video-container .skipBackward-animation')
const skipforwardAnimation  = document.querySelector('.video-container .skipforward-animation ')
const PlayAnimation  = document.querySelector('.video-container .play-animation')
const PauseAnimation  = document.querySelector('.video-container .pause-animation')
let buttons = document.querySelectorAll('button')
let inputs = document.querySelectorAll('input')
let settime 
const ConrollsMContaienerbtns = document.querySelectorAll('.video-container .center button')
const videoContainer = document.querySelector('.video-container')

playPausebtn.addEventListener('click', () => {
  playPause()
})

document.addEventListener('keydown', e => {
  switch (e.key.toLowerCase()) {
    case " ":
    case "k":
      playPause()
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
TimeLineContaienr.addEventListener('touchmove' , HandleTimeLine)
TimeLineContaienr.addEventListener('touchstart' , HandleTimeLine)
TimeLineContaienr.addEventListener('touchend' , toggleScrubbing)

TimeLineContaienr.addEventListener('touchstart' , () => {
  videoContainer.classList.toggle('scrubbing')
})
going.addEventListener('touchmove' , HandleTimeLine)
going.addEventListener('touchstart' , HandleTimeLine)
// going.addEventListener('touchend' , toggleScrubbing)

// going.addEventListener('touchstart' , () => {
//   videoContainer.classList.toggle('scrubbing')
// })
going.addEventListener('touchstart' , () => {
  going.style.opacity = '1'
})
going.addEventListener('touchend' , () => {
  going.style.opacity = '0'
})
TimeLineContaienr.addEventListener('touchstart' , () => {
  going.style.opacity = '1'
})
TimeLineContaienr.addEventListener('touchend' , () => {
  going.style.opacity = '0'
})
document.addEventListener('touchmove', e=> {
  if(isScrubbing) {
    HandleTimeLine(e)
  }
})

let isScrubbing = false
let wasPassed 
function toggleScrubbing(e) {
  var evt = (typeof e.originalEvent === 'undefined') ? e : e.originalEvent;
  var touch = evt.touches[0] || evt.changedTouches[0];
  x = touch.pageX;
  y = touch.pageY; 
  const rect = TimeLineContaienr.getBoundingClientRect()
  const percent = Math.min(Math.max(0,x - rect.x), rect.width) / rect.width
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
  clearTimeout(settime)
}
function HandleTimeLine(e) {
  var evt = (typeof e.originalEvent === 'undefined') ? e : e.originalEvent;
  var touch = evt.touches[0] || evt.changedTouches[0];
  x = touch.pageX;
  y = touch.pageY; 
  const rect = TimeLineContaienr.getBoundingClientRect()
  const percent = Math.min(Math.max(0,x - rect.x), rect.width) / rect.width
  const percentt = percent * video.duration
  let percentTwo = percent 
  TimeLineContaienr.style.setProperty("--preview-position", percent)
  if (ConrollsContaiener.clientWidth > 400){
    if(percent > 0.80) {
      percentTwo = 0.80
    } else if(percent < 0.20){
      percentTwo = 0.20
    }
  } else if (ConrollsContaiener.clientWidth < 600) {
    if(percent > 0.70) {
      percentTwo = 0.70
    } else if(percent < 0.30){
      percentTwo = 0.30
    }
  }
  TimeLineContaienr.style.setProperty("--preview-position-img", percentTwo)
  if (video.getAttribute('src') === '') {
    
  } else {
    going.textContent = previewtime(percentt)
    previewvideo.currentTime = percentt
  }
  if(isScrubbing) {
    e.preventDefault()
    TimeLineContaienr.style.setProperty("--progress-position", percent)
  }
  function previewtime(time) {
    const s = Math.floor(time % 60)
    const m = Math.floor(time / 60) % 60
    const h = Math.floor(time / 3600)
    if (h === 0) {
      return `${m}:${leadingZeroFormatter.format(s)}`
    }else if (h !== 0) {
      return `${h}:${leadingZeroFormatter.format(m)}:${leadingZeroFormatter.format(s)}`
    }
  }
  clearTimeout(settime)
}
let PlayAnimationValue = 0
let PasueAnimationValue = 0
function playPause() {
  if (video.paused == true) {
    settime = setTimeout(() => {
      HideUi()
      ConrollsMContaienerValue = 0
    }, 2000);
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
    clearTimeout(settime)
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
let mutedViedo = 0
function increaseVolume() {
  if(video.volume < 1) {
    video.volume = video.volume + 0.1
    mutedViedo = 0
  }
}
function decreaceVolume() {
  if(video.volume >= 0 && mutedViedo == 0) {
    video.volume = video.volume - 0.1
    if(video.volume < 0.01) {
      mutedViedo = 1
      video.muted = !video.muted
    }
  }
}
function toggleMute() {
  video.muted = !video.muted
  if(video.muted == false) {
    videoContainer.dataset.volumelevel = 'high'
  } else (
    videoContainer.dataset.volumelevel = 'muted'
  )
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
let ConrollsMContaienerValue = 1

videoContainer.addEventListener('click' , (e) => {
  if(ConrollsMContaienerValue == 0) {
    ShowUi()
    ConrollsMContaienerValue = 1
  } else {
    if (e.target.toString() == '[object HTMLVideoElement]') {
      HideUi()
      ConrollsMContaienerValue = 0
    }
  }
})
// video.addEventListener('dblclick' , skiptouch)


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
    setTimeout(() => {
      skipforwardAnimation.style.opacity = '1'
    }, 10);
    setTimeout(() => {
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
    setTimeout(() => {
      skipBackwardAnimation.style.opacity = '1'
    }, 10);
    setTimeout(() => {
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
  clearTimeout(settime)
}
function ClsoeSettings() {
  settingsValue = 0
  settingsBtn.style.transform = 'rotate(0deg)'
  SettingsContainer.style.opacity = '0'
  setTimeout(() => {
    SettingsContainer.style.display = 'none'
  }, 150);
  settime = setTimeout(() => {
    HideUi()
    ConrollsMContaienerValue = 0
  }, 2000);
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
  video.onwaiting = (event) => {
    videoContainer.classList.add('loading')
  };
  video.onplaying = (event) => {
    videoContainer.classList.remove('loading')
  };
  
  function ShowUi() {
    if(dbltouch >= 2) {
      
    } else {
      ConrollsContaiener.style.opacity = '1'
      ConrollsMContaiener.style.opacity = '1'
      ConrollsContaiener.style.pointerEvents = 'all';
      for (let i = 0; i < ConrollsMContaienerbtns.length; i++) {
        ConrollsMContaienerbtns[i].style.pointerEvents = 'all';
      }
    clearTimeout(settime)
    settime = setTimeout(() => {
      if(video.paused == true) {
        
      } else {
        HideUi()
        ConrollsMContaienerValue = 0
      }
    }, 2000);
    }
}
function HideUi() {
  ConrollsContaiener.style.opacity = '0'
  ConrollsMContaiener.style.opacity = '0'
  ConrollsContaiener.style.pointerEvents = 'none';
  for (let i = 0; i < ConrollsMContaienerbtns.length; i++) {
    ConrollsMContaienerbtns[i].style.pointerEvents = 'none';
  }
}
TimeLineContaienr.addEventListener('touchend', () => {
  settime = setTimeout(() => {
    HideUi()
    ConrollsMContaienerValue = 0
  }, 2000);
})
urluploadbtn.addEventListener('click' , () => {
  if(urlvalue.value.length == 0) {
  } else {
    blah.src = urlvalue.value
    blahh.src = urlvalue.value
    urlvalue.value = ""
  }
})

let timeskipinterval
let timeskipout
video.addEventListener('touchstart' ,skiptouch)
video.addEventListener('touchend' , skipend)
let skippedvalue = 0
let animation = 0
function skiptouch(e) {
  var evt = (typeof e.originalEvent === 'undefined') ? e : e.originalEvent;
  var touch = evt.touches[0] || evt.changedTouches[0];
  x = touch.pageX;
  y = touch.pageY; 
  if(videoContainer.clientWidth - touch.pageX < 100) {
    timeskipout = setTimeout(() => {
      e.preventDefault()
      timeskipinterval = setInterval(() => {
        video.currentTime = video.currentTime + 1
        skippedvalue  = skippedvalue + 1
        FAValue.innerHTML = skippedvalue
        animation = 1
      }, 100);
      skipforwardAnimation.style.opacity = '1'
    }, 300);
  } else if(touch.pageX < 100) {
    timeskipout = setTimeout(() => {
      e.preventDefault()
      timeskipinterval = setInterval(() => {
        video.currentTime = video.currentTime - 1
        skippedvalue  = skippedvalue - 1
        BAValue.innerHTML = skippedvalue
        animation = 1
      }, 100);
      skipBackwardAnimation.style.opacity = '1'
    }, 300);
  } else {
  }
}
function skipend(e) {
  clearTimeout(timeskipout)
  clearInterval(timeskipinterval)
  skippedvalue  = 0
  FAValue.innerHTML = SkipValue
  BAValue.innerHTML = SkipValue
  if(animation == 1) {
    skipforwardAnimation.style.opacity = '0'
    skipBackwardAnimation.style.opacity = '0'
  }
  animation = 0
}
let dbltouch = 0
let dbltouchtimeout
video.addEventListener('click', (e) => {
  dbltouch = dbltouch + 1
  if(dbltouch >= 2) {
    console.log(e.x);
    clearTimeout(dbltouchtimeout)
    if( e.x <= video.clientWidth / 2 + 80 && e.x >= video.clientWidth / 2 - 80 ) {
      playPause()
    } else if (e.x <= video.clientWidth / 4) {
      SkipBack()
    } else if (e.x >=video.clientWidth - video.clientWidth / 4) {
      SkipTo()
    }
  }
  console.log(video.clientWidth - video.clientWidth / 4);
  dbltouchtimeout = setTimeout(() => {
    dbltouch = 0
  }, 300);
  console.log(dbltouch);
})
