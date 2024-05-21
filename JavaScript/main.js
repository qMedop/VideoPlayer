inputch.onchange = (evt) => {
  const [file] = inputch.files;
  if (file) {
    blah.src = URL.createObjectURL(file);
    blahh.src = URL.createObjectURL(file);
    setTimeout(() => {
      video.play();
      setTimeout(() => {
        HideUi();
      }, 2000);
    }, 300);
  }
  console.log(file.name);
  fileName.innerHTML = file.name;
  setTimeout(() => {
    previewimgSize();
  }, 200);
  video.playbackRate = speedValue.innerHTML;
};
urluploadbtn.addEventListener("click", () => {
  if (urlvalue.value.length == 0) {
  } else {
    blah.src = urlvalue.value;
    blahh.src = urlvalue.value;
    urlvalue.value = "";
    video.play();
  }
});
const mainContainer = document.querySelector('.main-container')
const rangeInputs = document.querySelectorAll('input[type="range"]');
function handleInputChange(e) {
  let target = e.target;
  if (e.target.type !== "range") {
    target = document.getElementById("range");
  }
  const min = target.min;
  const max = target.max;
  const val = target.value;
  target.style.backgroundSize = ((val - min) * 100) / (max - min) + "% 100%";
}
rangeInputs.forEach((input) => {
  input.addEventListener("input", handleInputChange);
});
let AllButtons = document.querySelectorAll("button");
for (let i = 0; i < AllButtons.length; i++) {
  AllButtons[i].addEventListener("click", (e) => {
    setTimeout(() => {
      AllButtons[i].blur();
    }, 200);
  });
}
const video = document.querySelector(".video-container #blah");
const previewvideo = document.querySelector(".video-container #blahh");
const playPausebtn = document.querySelector(".video-container .play-pause-btn");
const FullScreenBtn = document.querySelector(
  ".video-container .full-screen-btn"
);
const TheaterBtn = document.querySelector(".video-container .theater-btn");
const MiniPlayerBtn = document.querySelector(
  ".video-container .mini-player-btn"
);
const volumeSlider = document.querySelector(".video-container .volume-slider");
const MuteBtn = document.querySelector(".video-container .mute-btn");
const TotalTime = document.querySelector(".video-container .total-time");
const CurrentTime = document.querySelector(".video-container .current-time");
const thubnail = document.querySelector(".video-container .thubnail");
const previewimg = document.querySelector(
  ".video-container .timeline .preview-img"
);
const VideoContainer = document.querySelector(".video-container");
const TimeLineContaienr = document.querySelector(
  ".video-container .timeline-container"
);
const ConrollsContaiener = document.querySelector(
  ".video-container .controls-container"
);
const SkipForward = document.querySelector(".video-container .skip-forward");
const SkipBackward = document.querySelector(".video-container .skip-backward");
const SettingsContainer = document.querySelector(
  ".video-container  .settings-option"
);
const skipBackwardAnimation = document.querySelector(
  ".video-container .skipBackward-animation"
);
const skipforwardAnimation = document.querySelector(
  ".video-container .skipforward-animation "
);
const previewimgContainer = document.querySelector(
  ".video-container .preview-img-container"
);
const VolumeRate = document.querySelector(".video-container .Volume-rate");
let SkipBackwardBtn = document.querySelector(
  ".video-container .center .skip-backward"
);
let SkipForwardBtn = document.querySelector(
  ".video-container .center .skip-forward"
);
let buttons = document.querySelectorAll(".video-container button");
let inputs = document.querySelectorAll("input");
let tabtimeOut;
const videoContainer = document.querySelector(".video-container");
let canvas1 = document.querySelector(
  ".main-container .visual-effect #canvas1"
);
let canvas2 = document.querySelector(
  ".main-container .visual-effect #canvas2"
);
let track = document.createElement("track");
track.kind = "captions";
track.label = "English";
track.srclang = "en";
track.src = "assets/assets/React English.srt";
track.mode = "showing";
video.appendChild(track);
playPausebtn.addEventListener("click", () => {
  playPause();
});
document.addEventListener("keydown", (e) => {
  switch (e.key.toLowerCase()) {
    case " ":
    case "k":
      ClsoeSettings();
      e.preventDefault();
      playPause();
      if (video.paused) {
        clearTimeout(timeOut);
        ViewUi();
      } else {
        setTimeout(() => {
          HideUi();
        }, 2000);
      }
      break;
    case "f":
      ClsoeSettings();
      e.preventDefault();
      toggleFullScreen();
      if (video.paused) {
        clearTimeout(timeOut);
        ViewUi();
      } else {
        setTimeout(() => {
          HideUi();
        }, 2000);
      }
      break;
    case "t":
      ClsoeSettings();
      e.preventDefault();
      toggleTheterMode();
      if (video.paused) {
        clearTimeout(timeOut);
        ViewUi();
      } else {
        setTimeout(() => {
          HideUi();
        }, 2000);
      }
      break;
    case "i":
      if (video.paused) {
        clearTimeout(timeOut);
        ViewUi();
      } else {
        setTimeout(() => {
          HideUi();
        }, 2000);
      }
      ClsoeSettings();
      e.preventDefault();
      toggleMiniPlayerMode();
      break;
    case "m":
      ClsoeSettings();
      e.preventDefault();
      toggleMute();
      ShowVolumeText();
      break;
    case "arrowright":
      ClsoeSettings();
      if (video.paused) {
      } else {
        clearTimeout(timeOut);
        clearTimeout(tabtimeOut);
        ViewUi();
        timeOut = setTimeout(() => {
          HideUi();
        }, 2000);
      }
      if (document.activeElement === volumeSlider) {
      } else {
        e.preventDefault();
        SkipTo();
      }
      break;
    case "arrowleft":
      ClsoeSettings();
      if (video.paused) {
      } else {
        clearTimeout(timeOut);
        clearTimeout(tabtimeOut);
        ViewUi();
        timeOut = setTimeout(() => {
          HideUi();
        }, 2000);
      }
      if (document.activeElement === volumeSlider) {
      } else {
        e.preventDefault();
        SkipBack();
      }
      break;
    case "arrowup":
      ClsoeSettings();
      e.preventDefault();
      increaseVolume();
      break;
    case "arrowdown":
      ClsoeSettings();
      e.preventDefault();
      decreaceVolume();
      break;
    case ",":
      ClsoeSettings();
      e.preventDefault();
      decreaseSpeed();
      ShowSpeedText();
      break;
    case ".":
      ClsoeSettings();
      e.preventDefault();
      increaseSpeed();
      ShowSpeedText();
      break;
    case "tab":
      ClsoeSettings();
      ViewUi();
      if (video.paused) {
      } else {
        clearTimeout(tabtimeOut);
        tabtimeOut = setTimeout(() => {
          HideUi();
          for (let i = 0; i < AllButtons.length; i++) {
            AllButtons[i].blur();
          }
          volumeSlider.blur();
        }, 2000);
      }
      break;
    // case "f12":
    //   e.preventDefault()
    //   break;
  }
});
const leadingZeroFormatter = new Intl.NumberFormat(undefined, {
  minimumIntegerDigits: 2,
});
// TimeLine
if (
  navigator.userAgent.match(/Android/i) ||
  navigator.userAgent.match(/iPhone/i)
) {
} else {
  TimeLineContaienr.addEventListener("mousemove", HandleTimeLine);
  TimeLineContaienr.addEventListener("mousedown", toggleScrubbing);
  document.addEventListener("mousemove", (e) => {
    if (isScrubbing) {
      HandleTimeLine(e);
    }
  });
  TimeLineContaienr.addEventListener("click", toggleScrubbing);
  document.addEventListener("mouseup", (e) => {
    if (isScrubbing) {
      toggleScrubbing(e);
    }
  });
  document.addEventListener("mouseup", (e) => {
    if (isScrubbing) {
      HandleTimeLine(e);
    }
  });
  document.addEventListener("moousemove", (e) => {
    if (isScrubbing) {
      HandleTimeLine(e);
    }
  });
}
let isScrubbing = false;
let wasPassed;
function toggleScrubbing(e) {
  const rect = TimeLineContaienr.getBoundingClientRect();
  const percent = Math.min(Math.max(0, e.x - rect.x), rect.width) / rect.width;
  isScrubbing = (e.buttons & 1) === 1;
  videoContainer.classList.toggle("scrubbing", isScrubbing);
  if (isScrubbing) {
    wasPassed = video.paused;
    video.pause();
  } else {
    video.currentTime = percent * video.duration;
    if (!wasPassed) {
      video.play();
    }
  }
}
function clcikk(e) {
  const rect = TimeLineContaienr.getBoundingClientRect();
  const percent = Math.min(Math.max(0, e.x - rect.x), rect.width) / rect.width;
  video.currentTime = percent * video.duration;
}
function HandleTimeLine(e) {
  const rect = TimeLineContaienr.getBoundingClientRect();
  const percent = Math.min(Math.max(0, e.x - rect.x), rect.width) / rect.width;
  const percentt = percent * video.duration;
  let percentMax =
    (rect.width - previewimgContainer.clientWidth / 2) / rect.width;
  let percentLow =
    1 - (rect.width - previewimgContainer.clientWidth / 2) / rect.width;
  TimeLineContaienr.style.setProperty("--preview-position", percent);
  let percentTwo = percent;
  if (percent > percentMax - 0.01) {
    percentTwo = percentMax - 0.01;
  } else if (percent < percentLow + 0.01) {
    percentTwo = percentLow + 0.01;
  }
  TimeLineContaienr.style.setProperty("--preview-position-img", percentTwo);
  if (video.getAttribute("src") === "") {
  } else {
    if (video.currentTime >= 1) {
      previewvideo.currentTime = percentt;
    }
    going.textContent = previewtime(percentt);
  }
  if (isScrubbing) {
    e.preventDefault();
    TimeLineContaienr.style.setProperty("--progress-position", percent);
  }
  function previewtime(time) {
    const s = Math.floor(time % 60);
    const m = Math.floor(time / 60) % 60;
    const h = Math.floor(time / 3600);
    if (h === 0) {
      return `${m}:${leadingZeroFormatter.format(s)}`;
    } else if (h !== 0) {
      return `${h}:${leadingZeroFormatter.format(
        m
      )}:${leadingZeroFormatter.format(s)}`;
    }
  }
}

//PlayPause

const PlaySvgHTML = `      <svg class="play-icon" viewBox="0 0 384 512">
<path style="fill: #f1f1f1"
  d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z" />
</svg>`;
const PauseSvgHTML = `      <svg style="margin-left: 0;" class="pause-icon" viewBox="0 0 320 512">
<path style="fill: #f1f1f1"
  d="M48 64C21.5 64 0 85.5 0 112V400c0 26.5 21.5 48 48 48H80c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H48zm192 0c-26.5 0-48 21.5-48 48V400c0 26.5 21.5 48 48 48h32c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H240z" />
</svg>`;
let PlayAnimationValue = 0;
let PasueAnimationValue = 0;
let PlayDiv = document.createElement("div");
let PauseDiv = document.createElement("div");
let playpausetimeout;
function PlayAnimation() {
  if (PasueAnimationValue == 1) {
    clearTimeout(playpausetimeout);
    PauseDiv.remove();
  }
  PlayAnimationValue = 1;
  PlayDiv.classList.add("PlayPause");
  PlayDiv.innerHTML = PlaySvgHTML;
  videoContainer.appendChild(PlayDiv);
  playpausetimeout = setTimeout(() => {
    PlayDiv.remove();
    PlayAnimationValue = 0;
  }, 40000);
}
function PauseAnimation() {
  if (PlayAnimationValue == 1) {
    clearTimeout(playpausetimeout);
    PlayDiv.remove();
  }
  PasueAnimationValue = 1;
  PauseDiv.classList.add("PlayPause");
  PauseDiv.innerHTML = PauseSvgHTML;
  videoContainer.appendChild(PauseDiv);
  playpausetimeout = setTimeout(() => {
    PauseDiv.remove();
    PasueAnimationValue = 0;
  }, 400);
}
function playPause() {
  if (video.paused == true) {
    video.play();
    timeOut = setTimeout(() => {
      HideUi();
    }, 2000);
    PlayAnimation();
  } else {
    video.pause();
    clearTimeout(mobiletimeout);
    PauseAnimation();
  }
}
  video.addEventListener("pause", () => {
    videoContainer.classList.add("paused");
  });
  video.addEventListener("play", () => {
    videoContainer.classList.remove("paused");
  });
videoContainer.addEventListener("click", (e) => {
  if (e.target.toString() == "[object HTMLVideoElement]") {
    if (
      navigator.userAgent.match(/Android/i) ||
      navigator.userAgent.match(/iPhone/i)
    ) {
    } else {
      playPause();
    }
  }
});

//fullscreen

videoContainer.addEventListener("dblclick", (e) => {
  if (e.target.toString() == "[object HTMLVideoElement]") {
    if (
      navigator.userAgent.match(/Android/i) ||
      navigator.userAgent.match(/iPhone/i)
    ) {
    } else {
      toggleFullScreen();
    }
  }
});
playPausebtn.addEventListener("focus", () => {
  setTimeout(() => {
    playPausebtn.blur();
  }, 1500);
});
TheaterBtn.addEventListener("click", () => {
  if (document.fullscreenElement == null) {
    toggleTheterMode();
    if (video.paused) {
      clearTimeout(timeOut);
      ViewUi();
    } else {
      setTimeout(() => {
        HideUi();
      }, 2000);
    }
  } else {
    document.body.classList.toggle("full-screen");
    toggleTheterMode();
    document.exitFullscreen();
  }
});
function toggleTheterMode() {
  videoContainer.classList.toggle("theater");
  if (video.paused) {
    clearTimeout(timeOut);
    ViewUi();
  } else {
    setTimeout(() => {
      HideUi();
    }, 2000);
  }
}
FullScreenBtn.addEventListener("click", () => {
  toggleFullScreen();
});
function toggleFullScreen() {
  if (
    navigator.userAgent.match(/Android/i) ||
    navigator.userAgent.match(/iPhone/i)
  ) {
    if (document.fullscreenElement == null) {
      setTimeout(() => {
        previewimgSize();
      }, 50);
      mainContainer.requestFullscreen();
      if (
        video.videoWidth / video.videoHeight >= 0.4 &&
        video.videoWidth / video.videoHeight <= 1
      ) {
      } else {
        screen.orientation.lock("landscape");
      }
    } else {
      setTimeout(() => {
        previewimgSize();
      }, 50);
      document.exitFullscreen();
      screen.orientation.unlock("landscape");
    }
  } else if (document.fullscreenElement == null) {
    setTimeout(() => {
      previewimgSize();
    }, 50);
    tr.requestFullscreen();
  } else {
    setTimeout(() => {
      previewimgSize();
    }, 50);
    document.exitFullscreen();
  }
}
document.addEventListener("fullscreenchange", () => {
  document.body.classList.toggle("full-screen", document.fullscreenElement);
});

//miniplayer

MiniPlayerBtn.addEventListener("click", () => {
  toggleMiniPlayerMode();
});
function toggleMiniPlayerMode() {
  if (videoContainer.classList.contains("mini-player")) {
    document.exitPictureInPicture();
  } else {
    video.requestPictureInPicture();
  }
}
video.addEventListener("enterpictureinpicture", () => {
  videoContainer.classList.add("mini-player");
});
video.addEventListener("leavepictureinpicture", () => {
  videoContainer.classList.remove("mini-player");
});
MuteBtn.addEventListener("click", toggleMute);
volumeSlider.addEventListener("input", (e) => {
  video.volume = e.target.value;
  video.muted = e.target.value === 0;
});

//Volume

const volumeHTML = `<div class="volume-svg">
<svg width="64px" height="64px" viewBox="-14.4 -14.4 76.80 76.80" fill="none"
xmlns="http://www.w3.org/2000/svg">
<g id="SVGRepo_bgCarrier" stroke-width="0"></g>
<g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
<g id="SVGRepo_iconCarrier">
  <rect width="48" height="48" fill="white" fill-opacity="0.01"></rect>
  <path class="path-one"
    d="M24 6V42C17 42 11.7985 32.8391 11.7985 32.8391H6C4.89543 32.8391 4 31.9437 4 30.8391V17.0108C4 15.9062 4.89543 15.0108 6 15.0108H11.7985C11.7985 15.0108 17 6 24 6Z"
    fill="#2F88F" stroke="#f1f1f1" stroke-width="4" stroke-linejoin="round"></path>
  <path class="path-two"
    d="M32 15L32 15C32.6232 15.5565 33.1881 16.1797 33.6841 16.8588C35.1387 18.8504 36 21.3223 36 24C36 26.6545 35.1535 29.1067 33.7218 31.0893C33.2168 31.7885 32.6391 32.4293 32 33"
    stroke="#f1f1f1" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path>
  <path class="path-three"
    d="M34.2358 41.1857C40.0835 37.6953 43.9999 31.305 43.9999 24C43.9999 16.8085 40.2042 10.5035 34.507 6.97906"
    stroke="#f1f1f1" stroke-width="4" stroke-linecap="round"></path>
  <g xmlns="http://www.w3.org/2000/svg" mask="url(#mask0)" class="g-mute">
    <path d="M40.7351 20.2858L32.2498 28.7711" stroke="#f1f1f1" stroke-width="4" stroke-linecap="round"
      stroke-linejoin="round" />
    <path d="M32.2498 20.2858L40.735 28.7711" stroke="#f1f1f1" stroke-width="4" stroke-linecap="round"
      stroke-linejoin="round" />
  </g>
</g>
</svg>
</div>
<div id="VolumeText">100%</div>`;
let mutedViedo = 0;
let mutedViedoo = 0;
let VolumeTextI;
let Volumetimeout;
let volumestatue = 0;
let VolumeDiv;
function ShowVolumeText() {
  if (volumestatue == 0) {
    volumestatue = 1;
    VolumeDiv = document.createElement("div");
    VolumeDiv.classList.add("Volume-rate");
    VolumeDiv.innerHTML = volumeHTML;
    videoContainer.appendChild(VolumeDiv);
    VolumeText.innerHTML = Math.floor(video.volume * 100) + "%";
    Volumetimeout = setTimeout(() => {
      VolumeDiv.remove();
    }, 1000);
  } else {
    clearTimeout(Volumetimeout);
    VolumeDiv.remove();
    volumestatue = 1;
    VolumeDiv = document.createElement("div");
    VolumeDiv.classList.add("Volume-rate");
    VolumeDiv.innerHTML = volumeHTML;
    videoContainer.appendChild(VolumeDiv);
    VolumeText.innerHTML = Math.floor(video.volume * 100) + "%";
    Volumetimeout = setTimeout(() => {
      VolumeDiv.remove();
    }, 1000);
  }
}
function increaseVolume() {
  if (video.volume < 1) {
    if (video.volume >= 0.85) {
      video.volume = 1;
    } else {
      video.volume = video.volume + 0.1;
    }
  }
  ShowVolumeText();
}
function decreaceVolume() {
  if (video.volume >= 0) {
    if (video.volume <= 0.15) {
      video.volume = 0;
    } else {
      video.volume = video.volume - 0.1;
    }
  }
  ShowVolumeText();
}
let VolumeLvl;
video.addEventListener("volumechange", () => {
  volumeSlider.value = video.volume;
  if (video.muted || video.volume === 0) {
    volumeSlider.value = 0;
    VolumeLvl = "muted";
  } else if (video.volume <= 0.5) {
    VolumeLvl = "low";
  } else {
    VolumeLvl = "high";
  }
  videoContainer.dataset.volumelevel = VolumeLvl;
});
volumeSlider.onmouseleave = () => {
  volumeSlider.blur();
};
let VolumeMuteValue;
function toggleMute() {
  if (video.volume == 0) {
    video.volume = VolumeMuteValue;
  } else {
    VolumeMuteValue = video.volume;
    video.volume = 0;
  }
}

//Time

video.addEventListener("loadeddata", () => {
  TotalTime.textContent = FormatTime(video.duration);
});
video.addEventListener("timeupdate", () => {
  CurrentTime.textContent = FormatTime(video.currentTime);
  const percent = video.currentTime / video.duration;
  if (ismovingtimeline == 1) {
  } else {
    TimeLineContaienr.style.setProperty("--progress-position", percent);
    if (
      navigator.userAgent.match(/Android/i) ||
      navigator.userAgent.match(/iPhone/i)
    ) {
      TimeLineContaienr.style.setProperty("--preview-position", percent);
    }
  }
});

//HideView Ui

let check = 0;
let timeOut;
let mobilecheck = 0;
function HideUi() {
  if (video.paused) {
  } else if (check == 1) {
  } else if (check == 0) {
    ConrollsContaiener.style.opacity = 0;
    ConrollsContaiener.style.pointerEvents = "none";
    videoContainer.style.cursor = "none";
    mobilecheck = 0;
  }
}
function ViewUi() {
  ConrollsContaiener.style.opacity = 1;
  ConrollsContaiener.style.pointerEvents = "all";
  videoContainer.style.cursor = "default";
  mobilecheck = 1;
}

videoContainer.addEventListener("mouseenter", () => {
  if (
    navigator.userAgent.match(/Android/i) ||
    navigator.userAgent.match(/iPhone/i)
  ) {
  } else {
    if (video.paused) {
    } else {
      ViewUi();
    }
  }
});
videoContainer.addEventListener("mouseleave", () => {
  if (
    navigator.userAgent.match(/Android/i) ||
    navigator.userAgent.match(/iPhone/i)
  ) {
  } else {
    if (video.paused) {
    } else if (settingsValue == 0 && check == 0) {
      HideUi();
    } else {
      clearTimeout(timeOut);
    }
  }
});
videoContainer.addEventListener("mousemove", () => {
  if (
    navigator.userAgent.match(/Android/i) ||
    navigator.userAgent.match(/iPhone/i)
  ) {
  } else {
    if (video.paused) {
    } else if (settingsValue == 0 && check == 0) {
      clearTimeout(timeOut);
      timeOut = setTimeout(() => {
        HideUi();
      }, 2000);
    } else {
      clearTimeout(timeOut);
    }
  }
});
videoContainer.addEventListener("mousemove", () => {
  if (
    navigator.userAgent.match(/Android/i) ||
    navigator.userAgent.match(/iPhone/i)
  ) {
  } else {
    ViewUi();
  }
});
video.addEventListener("click", () => {
  if (
    navigator.userAgent.match(/Android/i) ||
    navigator.userAgent.match(/iPhone/i)
  ) {
  } else {
    if (video.paused) {
      clearTimeout(timeOut);
      ViewUi();
    } else if (settingsValue == 0 && check == 0) {
      setTimeout(() => {
        HideUi();
      }, 2000);
    } else {
      clearTimeout(timeOut);
    }
  }
});
if (
  navigator.userAgent.match(/Android/i) ||
  navigator.userAgent.match(/iPhone/i)
) {
  for (let i = 0; i < AllButtons.length; i++) {
    AllButtons[i].addEventListener("click", () => {
      clearTimeout(mobiletimeout);
      if (video.paused) {
      } else {
        mobiletimeout = setTimeout(() => {
          mHideUi();
        }, 2000);
      }
    });
  }
} else {
  for (let i = 0; i < AllButtons.length; i++) {
    AllButtons[i].addEventListener("mouseenter", () => {
      check = 1;
    });
    AllButtons[i].addEventListener("mouseleave", () => {
      check = 0;
    });
  }
}
TimeLineContaienr.addEventListener("mouseenter", () => {
  if (
    navigator.userAgent.match(/Android/i) ||
    navigator.userAgent.match(/iPhone/i)
  ) {
  } else {
    check = 1;
  }
});
TimeLineContaienr.addEventListener("mouseleave", () => {
  if (
    navigator.userAgent.match(/Android/i) ||
    navigator.userAgent.match(/iPhone/i)
  ) {
  } else {
    check = 0;
  }
});

//viewhide mobile
function mViewUi() {
  ConrollsContaiener.style.opacity = 1;
  ConrollsContaiener.style.pointerEvents = "all";
  videoContainer.style.cursor = "default";
  mobilecheck = 1;
}
function mHideUi() {
  ConrollsContaiener.style.opacity = 0;
  ConrollsContaiener.style.pointerEvents = "none";
  videoContainer.style.cursor = "none";
  mobilecheck = 0;
}

let mobiletimeout;
if (
  navigator.userAgent.match(/Android/i) ||
  navigator.userAgent.match(/iPhone/i)
) {
  videoContainer.addEventListener("click", (e) => {
    setTimeout(() => {
      if (dbtouch == 0) {
        if (mobilecheck == 0) {
          clearTimeout(mobiletimeout);
          mViewUi();
          if (video.paused) {
          } else {
            mobiletimeout = setTimeout(() => {
              mHideUi();
            }, 2000);
          }
        } else {
          if (e.target.toString() == "[object HTMLVideoElement]") {
            clearTimeout(mobiletimeout);
            mHideUi();
          }
        }
      }
    }, 200);
  });
}

// mobile timeline

if (
  navigator.userAgent.match(/Android/i) ||
  navigator.userAgent.match(/iPhone/i)
) {
  TimeLineContaienr.addEventListener("touchmove", mHandleTimeLine);
  TimeLineContaienr.addEventListener("touchstart", mHandleTimeLine);
  TimeLineContaienr.addEventListener("touchend", mtoggleScrubbing);

  TimeLineContaienr.addEventListener("touchstart", () => {
    videoContainer.classList.toggle("scrubbing");
  });
  going.addEventListener("touchmove", mHandleTimeLine);
  going.addEventListener("touchstart", mHandleTimeLine);
  going.addEventListener("touchstart", () => {
    document.body.style.overflow = "hidden";
  });
  going.addEventListener("touchend", () => {
    document.body.style.overflow = "auto";
    mobiletimeout = setTimeout(() => {
      HideUi();
    }, 2000);
  });
  TimeLineContaienr.addEventListener("touchstart", () => {
    document.body.style.overflow = "hidden";
  });
  TimeLineContaienr.addEventListener("touchend", () => {
    document.body.style.overflow = "auto";
    mobiletimeout = setTimeout(() => {
      HideUi();
    }, 2000);
  });
  document.addEventListener("touchmove", (e) => {
    if (isScrubbing) {
      mHandleTimeLine(e);
    }
  });
}

let misScrubbing = false;
let mwasPassed;
let ismovingtimeline = 0;
function mtoggleScrubbing(e) {
  ismovingtimeline = 0;
  var evt = typeof e.originalEvent === "undefined" ? e : e.originalEvent;
  var touch = evt.touches[0] || evt.changedTouches[0];
  x = touch.pageX;
  y = touch.pageY;
  const rect = TimeLineContaienr.getBoundingClientRect();
  const percent = Math.min(Math.max(0, x - rect.x), rect.width) / rect.width;
  misScrubbing = (e.buttons & 1) === 1;
  videoContainer.classList.toggle("scrubbing", misScrubbing);
  if (misScrubbing) {
    mwasPassed = video.paused;
    video.pause();
  } else {
    video.currentTime = percent * video.duration;
    if (!mwasPassed) {
      video.play();
    }
  }
  clearTimeout(mobiletimeout);
}
function mHandleTimeLine(e) {
  ismovingtimeline = 1;
  var evt = typeof e.originalEvent === "undefined" ? e : e.originalEvent;
  var touch = evt.touches[0] || evt.changedTouches[0];
  x = touch.pageX;
  y = touch.pageY;
  const rect = TimeLineContaienr.getBoundingClientRect();
  const percent = Math.min(Math.max(0, x - rect.x), rect.width) / rect.width;
  const percentt = percent * video.duration;
  let percentMax =
    (rect.width - previewimgContainer.clientWidth / 2) / rect.width;
  let percentLow =
    1 - (rect.width - previewimgContainer.clientWidth / 2) / rect.width;
  let percentTwo = percent;
  TimeLineContaienr.style.setProperty("--progress-position", percent);
  if (percent > percentMax - 0.01) {
    percentTwo = percentMax - 0.01;
  } else if (percent < percentLow + 0.01) {
    percentTwo = percentLow + 0.01;
  }
  TimeLineContaienr.style.setProperty("--preview-position-img", percentTwo);
  if (video.getAttribute("src") === "") {
  } else {
    going.textContent = previewtime(percentt);
    previewvideo.currentTime = percentt;
  }
  if (misScrubbing) {
    TimeLineContaienr.style.setProperty("--preview-position", percent);
    e.preventDefault();
  }
  function previewtime(time) {
    const s = Math.floor(time % 60);
    const m = Math.floor(time / 60) % 60;
    const h = Math.floor(time / 3600);
    if (h === 0) {
      return `${m}:${leadingZeroFormatter.format(s)}`;
    } else if (h !== 0) {
      return `${h}:${leadingZeroFormatter.format(
        m
      )}:${leadingZeroFormatter.format(s)}`;
    }
  }
  clearTimeout(mobiletimeout);
}

//mobile interact

let dbtouch = 0;
let dbtouchtimeout;
let holdtouch = 0;
let holdtouch2 = 0;
let holdtouchtimeout;
let holdtoucinterval;
let holdplayrate;
let waspausedhold;
let holddivl = document.createElement("div");
holddivl.classList.add("holdskipl");
let holddivr = document.createElement("div");
holddivr.classList.add("holdskipr");
if (
  navigator.userAgent.match(/Android/i) ||
  navigator.userAgent.match(/iPhone/i)
) {
  video.addEventListener("dblclick", (e) => {
    clearTimeout(dbtouchtimeout);
    dbtouch = 1;
    if (
      e.x <=
        video.clientWidth - video.clientWidth / 2 + video.clientWidth / 4 &&
      e.x >= video.clientWidth - video.clientWidth / 2 - video.clientWidth / 4
    ) {
      playPause();
      dbltouch = 0;
    } else if (e.x <= video.clientWidth / 4) {
      SkipBack();
    } else if (e.x >= video.clientWidth - video.clientWidth / 4) {
      SkipTo();
    }
    dbtouchtimeout = setTimeout(() => {
      dbtouch = 0;
    }, 600);
  });
  videoContainer.addEventListener("touchstart", (e) => {
    waspausedhold = 0;
    if (e.target.toString() == "[object HTMLVideoElement]") {
      var evt = typeof e.originalEvent === "undefined" ? e : e.originalEvent;
      var touch = evt.touches[0] || evt.changedTouches[0];
      x = touch.pageX;
      y = touch.pageY;
      if (ismovingall == 0) {
        if (x >= video.clientWidth - video.clientWidth / 4) {
          let timeskipped = video.currentTime;
          holdtouchtimeout = setTimeout(() => {
            ismovingall = 1;
            if (video.paused) {
              waspausedhold = 1;
              video.muted = true;
              video.play();
            }
            holdtouch = 1;
            videoContainer.appendChild(holddivl);
            holdtoucinterval = setInterval(() => {
              holddivl.innerHTML =
                "+" +
                Math.floor(timeskipped - video.currentTime)
                  .toString()
                  .slice(1) +
                "s";
            }, 100);
            setTimeout(() => {
              holddivl.style.opacity = "1";
            }, 10);
            holdplayrate = video.playbackRate;
            video.playbackRate = video.playbackRate + 3;
            document.body.style.overflow = "hidden";
          }, 500);
        }
      }
    }
  });
  videoContainer.addEventListener("touchend", (e) => {
    clearInterval(holdtoucinterval);
    clearTimeout(holdtouchtimeout);
    holdtouch2 = 0;
    ismovingall = 0;
    ismovingh = 0;
    if (holdtouch == 1) {
      if (waspausedhold == 1) {
        waspausedhold = 0;
        video.pause();
        video.muted = false;
      }
      holddivl.style.opacity = "0";
      holdtouch = 0;
      video.playbackRate = holdplayrate;
      document.body.style.overflow = "auto";
      setTimeout(() => {
        holddivl.innerHTML = 0;
        holddivl.remove();
      }, 500);
    }
  });
  videoContainer.addEventListener("touchstart", (e) => {
    if (e.target.toString() == "[object HTMLVideoElement]") {
      var evt = typeof e.originalEvent === "undefined" ? e : e.originalEvent;
      var touch = evt.touches[0] || evt.changedTouches[0];
      x = touch.pageX;
      y = touch.pageY;
      const rect = videoContainer.getBoundingClientRect();
      const percent =
        Math.min(Math.max(0, y - rect.y), rect.height) / rect.height;
      currentpercent = percent;
      currentx = x;
      currenty = y;
      currentvideotime = video.currentTime;
      currentvideoVolume = video.volume;
      if (ismovingall == 0) {
        if (x <= video.clientWidth / 4) {
          let timeskipped = video.currentTime;
          holdtouchtimeout = setTimeout(() => {
            ismovingall = 1;
            holdtouch2 = 1;
            document.body.style.overflow = "hidden";
            holdtoucinterval = setInterval(() => {
              video.currentTime = video.currentTime - 1;
              holddivr.innerHTML =
                "-" + Math.floor(timeskipped - video.currentTime) + "s";
            }, 300);
            videoContainer.appendChild(holddivr);
            setTimeout(() => {
              holddivr.style.opacity = "1";
            }, 10);
          }, 500);
        }
      }
    }
  });
  let currentx;
  let currenty;
  let currentpercent;
  let ismoving = 0;
  let ismovingall = 0;
  let ismovingh = 0;
  let currentvideotime;
  let currentvideoVolume;
  let ismovingsound = 0;
  let ouchmovecheck = 0;
  let popuptimeHTML = `  <div id="pcureenttime">00:00</div>
  /
  <div id="ptotalTime">00:00</div>`;
  let popuptime = document.createElement("div");
  popuptime.classList.add("pduration-container");
  popuptime.innerHTML = popuptimeHTML;

  videoContainer.addEventListener("touchmove", (e) => {
    if (e.target.toString() == "[object HTMLVideoElement]") {
      if (holdtouch == 1 || holdtouch2 == 1) {
      } else {
        var evt = typeof e.originalEvent === "undefined" ? e : e.originalEvent;
        var touch = evt.touches[0] || evt.changedTouches[0];
        x = touch.pageX;
        y = touch.pageY;
        if (ismovingh == 0) {
          if (ismovingall == 0) {
            if (x >= currentx + 35 || x <= currentx - 35) {
              ismoving = 1;
            }
            if (ismoving == 1) {
              document.body.style.overflow = "hidden";
              videoContainer.appendChild(popuptime);
              ptotalTime.textContent = FormatTime(video.duration);
              pcureenttime.textContent = FormatTime(video.currentTime);
              video.pause();
              mViewUi();
              ouchmovecheck = 1;
              clearInterval(mobiletimeout);
              if (video.duration < 60) {
                video.currentTime =
                  currentvideotime + Math.floor(x - currentx) / 20;
              } else {
                video.currentTime =
                  currentvideotime + Math.floor(x - currentx) / 4;
              }
              CurrentTime.textContent = FormatTime(video.currentTime);
              const percent = video.currentTime / video.duration;
              TimeLineContaienr.style.setProperty(
                "--progress-position",
                percent
              );
            }
          }
        }
      }
    }
  });
  videoContainer.addEventListener("touchstart", (e) => {
    var evt = typeof e.originalEvent === "undefined" ? e : e.originalEvent;
    var touch = evt.touches[0] || evt.changedTouches[0];
    x = touch.pageX;
    y = touch.pageY;
    const rect = videoContainer.getBoundingClientRect();
    const percent = Math.min(Math.max(0, y - currenty), currenty) / currenty;
  });
  videoContainer.addEventListener("touchmove", (e) => {
    if (e.target.toString() == "[object HTMLVideoElement]") {
      var evt = typeof e.originalEvent === "undefined" ? e : e.originalEvent;
      var touch = evt.touches[0] || evt.changedTouches[0];
      x = touch.pageX;
      y = touch.pageY;
      const rect = videoContainer.getBoundingClientRect();
      const percent =
        Math.min(Math.max(0, y - rect.y), rect.height) / rect.height;
      if (ismoving == 0 && ismovingall == 0) {
        if (x <= video.clientWidth / 4) {
          if (y >= currenty + 25 || y <= currenty - 25) {
            ismovingh = 1;
          }
          if (ismovingh == 1) {
            document.body.style.overflow = "hidden";
            ShowVolumeText();
            if (
              currentvideoVolume + (currentpercent - percent) <= 1 &&
              currentvideoVolume + (currentpercent - percent) >= 0
            ) {
              video.volume = currentvideoVolume + (currentpercent - percent);
            } else {
              if (video.volume > 0.98) {
                video.volume = 1;
              }
              if (video.volume < 0.01) {
                video.volume = 0;
              }
            }
          }
        }
      }
    }
  });
  videoContainer.addEventListener("touchend", (e) => {
    if (ouchmovecheck == 1) {
      ouchmovecheck = 0;
      ismoving = 0;
      popuptime.remove();
      video.play();
      mobiletimeout = setTimeout(() => {
        mHideUi();
      }, 2000);
    }
    holddivr.style.opacity = "0";
    setTimeout(() => {
      holddivr.remove();
      document.body.style.overflow = "auto";
    }, 500);
  });
  videoContainer.addEventListener("touchmove", (e) => {
    clearTimeout(holdtouchtimeout);
  });
}

// SKip

let SkipValue = 5;

//skipTo

let SkipForwaedContent = `<div class="svgs">
<svg class="s" viewBox="0 0 256 512">
  <path
    d="M246.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-9.2-9.2-22.9-11.9-34.9-6.9s-19.8 16.6-19.8 29.6l0 256c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l128-128z" />
</svg>
<svg class="b" viewBox="0 0 256 512">
  <path
    d="M246.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-9.2-9.2-22.9-11.9-34.9-6.9s-19.8 16.6-19.8 29.6l0 256c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l128-128z" />
</svg>
<svg class="c" viewBox="0 0 256 512">
  <path
    d="M246.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-9.2-9.2-22.9-11.9-34.9-6.9s-19.8 16.6-19.8 29.6l0 256c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l128-128z" />
</svg>
</div>`;
SkipForward.addEventListener("click", SkipTo);

let animationvalueone = 0;
let skip;
let skipt;

function SkipTo() {
  video.currentTime = video.currentTime + SkipValue;
  let div = document.createElement("div");
  div.classList.add("divSkip");
  div.classList.toggle("skipforward-animation");
  videoContainer.appendChild(div);
  div.innerHTML = SkipForwaedContent;
  setTimeout(() => {
    div.remove();
  }, 900);

  scaleInOut(SkipForwardBtn);
}
function SkipToStyleR() {
  skipforwardAnimation.style.display = "flex";
}
function SkipToStyleH() {
  skipforwardAnimation.style.display = "none";
}

//Skip Back

SkipBackward.addEventListener("click", SkipBack);

let animationvaluetwo = 0;
let skipp;

function SkipBack() {
  video.currentTime = video.currentTime - SkipValue;
  let div = document.createElement("div");
  div.classList.add("divSkip");
  div.classList.toggle("skipBackward-animation");
  videoContainer.appendChild(div);
  div.innerHTML = SkipForwaedContent;
  setTimeout(() => {
    div.remove();
  }, 900);

  scaleInOut(SkipBackwardBtn);
}
function SkipBackStyleR() {
  skipBackwardAnimation.style.display = "flex";
}
function SkipBackStyleH() {
  skipBackwardAnimation.style.display = "none";
}

//Settings

let settingsValue = 0;
settingsBtn.addEventListener("click", () => {
  if (settingsValue == 0) {
    OpenSettings();
    clearTimeout(tabtimeOut);
    clearTimeout(timeOut);
    clearTimeout(mobiletimeout);
    ViewUi();
  } else {
    ClsoeSettings();
    timeOut = setTimeout(() => {
      mHideUi();
    }, 2000);
  }
});
function OpenSettings() {
  previewimgContainer.style.display = "none";
  going.style.opacity = "0";
  setTimeout(() => {
    settingsValue = 1;
  }, 10);
  settingsBtnSvg.style.transform = "rotate(58deg)";
  SettingsContainer.style.display = "flex";
  setTimeout(() => {
    SettingsContainer.style.opacity = "1";
  }, 10);
}
function ClsoeSettings() {
  settingsValue = 0;
  settingsBtnSvg.style.transform = "rotate(1deg)";
  SettingsContainer.style.opacity = "0";
  setTimeout(() => {
    SettingsContainer.style.display = "none";
  }, 150);
  previewimgContainer.style.display = "flex";
  going.style.opacity = "1";
}
document.addEventListener("click", (e) => {
  if (settingsValue == 1) {
    if (e.target.getAttribute("active")) {
    } else {
      ClsoeSettings();
    }
  }
});

//Switch Skip Value

Skip.addEventListener("click", () => {
  if (SkipValue == 5) {
    SkipValue = 10;
    SkipValueHtml.innerHTML = SkipValue;
    Value5[0].style.display = "none";
    Value10[0].style.display = "block";
    Value5[1].style.display = "none";
    Value10[1].style.display = "block";
  } else {
    SkipValue = 5;
    SkipValueHtml.innerHTML = SkipValue;
    Value5[0].style.display = "block";
    Value10[0].style.display = "none";
    Value5[1].style.display = "block";
    Value10[1].style.display = "none";
  }
  scaleInOut(Skip);
});

//Loop

let loopStatue;
Loop.addEventListener("click", () => {
  if (video.loop == false) {
    video.loop = true;
    LoopValue.innerHTML = "on";
  } else {
    video.loop = false;
    LoopValue.innerHTML = "off";
  }
  scaleInOut(Loop);
});

//Speed
const speedHTML = `<div class="speed-svg">
<svg width="64px" height="64px" viewBox="0 0 48 48" fill="#000000"
stroke="#000000" stroke-width="3.216">
<g   id="SVGRepo_iconCarrier">
  <defs >
    <style>
      .a {
        fill: none;
        stroke: #f1f1f1;
        stroke-linecap: round;
        stroke-linejoin: round;
      }
    </style>
  </defs>
  <path class="a" d="M34.6282,24.0793a14.7043,14.7043,0,0,0-22.673,1.7255"></path>
  <path  class="a" d="M43.5,20.5846a23.8078,23.8078,0,0,0-39,0"></path>
  <path  class="a" d="M43.5,20.5845,22.0169,29.0483a5.5583,5.5583,0,1,0,6.2116,8.7785l.0153.0206Z">
  </path>
</g>
</svg>
</div>
<div id="SpeedText">1</div>`;
let speedStatue = 0;
let speeddiv;
let speedtimeout;
function ShowSpeedText() {
  if (speedStatue == 0) {
    speedStatue = 1;
    speeddiv = document.createElement("div");
    speeddiv.classList.add("Speed-rate");
    speeddiv.innerHTML = speedHTML;
    videoContainer.appendChild(speeddiv);
    SpeedText.innerHTML = video.playbackRate;
    speedtimeout = setTimeout(() => {
      speeddiv.remove();
    }, 1000);
  } else {
    clearTimeout(speedtimeout);
    speeddiv.remove();
    speedStatue = 1;
    speeddiv = document.createElement("div");
    speeddiv.classList.add("Speed-rate");
    speeddiv.innerHTML = speedHTML;
    videoContainer.appendChild(speeddiv);
    SpeedText.innerHTML = video.playbackRate;
    speedtimeout = setTimeout(() => {
      speeddiv.remove();
    }, 1000);
  }
}
//increseSpeed

increase.addEventListener("click", increaseSpeed);

function increaseSpeed() {
  if (video.playbackRate < 3) {
    video.playbackRate = video.playbackRate + 0.25;
    speedValue.innerHTML = video.playbackRate;
    scaleInOut(increase);
  }
}

//decreseSpeed

decrease.addEventListener("click", decreaseSpeed);
function decreaseSpeed() {
  if (video.playbackRate > 0.25) {
    video.playbackRate = video.playbackRate - 0.25;
    speedValue.innerHTML = video.playbackRate;
    scaleInOut(decrease);
  }
}

//scale Animation

function scaleInOut(element) {
  element.style.transform = "scale(0.96)";
  setTimeout(() => {
    element.style.transform = "scale(1)";
  }, 150);
}

//loading

video.onwaiting = (event) => {
  videoContainer.classList.add("loading");
};
video.onplaying = (event) => {
  videoContainer.classList.remove("loading");
};

//resize

window.onresize = previewimgSize;
previewimgSize();
function previewimgSize() {
  previewimgContainer.style.aspectRatio = video.videoWidth / video.videoHeight;
  previewimgContainer.style.height =
    videoContainer.clientHeight / 5 + 20 + "px";
}

window.addEventListener("load", mobile());

function mobile() {
  if (
    navigator.userAgent.match(/Android/i) ||
    navigator.userAgent.match(/iPhone/i)
  ) {
    MiniPlayerBtn.remove();
    TheaterBtn.remove();
    volumeSlider.remove();
  }
}

//////////////////////
document.addEventListener("contextmenu", (e) => {
  e.preventDefault();
});
document.onkeydown = (e) => {
  if (e.key == 123) {
    e.preventDefault();
  }
  if (e.ctrlKey && e.shiftKey && e.key == "I") {
    e.preventDefault();
  }
  if (e.ctrlKey && e.shiftKey && e.key == "C") {
    e.preventDefault();
  }
  if (e.ctrlKey && e.shiftKey && e.key == "J") {
    e.preventDefault();
  }
  if (e.ctrlKey && e.key == "U") {
    e.preventDefault();
  }
};
function FormatTime(time) {
  const leadingZeroFormatter = new Intl.NumberFormat(undefined, {
    minimumIntegerDigits: 2,
  });
  const s = Math.floor(time % 60);
  const m = Math.floor(time / 60) % 60;
  const h = Math.floor(time / 3600);
  if (h === 0) {
    return `${m}:${leadingZeroFormatter.format(s)}`;
  } else if (h !== 0) {
    return `${h}:${leadingZeroFormatter.format(
      m
    )}:${leadingZeroFormatter.format(s)}`;
  }
}
function applyVisualEffects(video, canvas1, canvas2, updateSpeed) {
  const ctx1 = canvas1.getContext("2d", { willReadFrequently: true });
  const ctx2 = canvas2.getContext("2d", { willReadFrequently: true });
  let captureInterval;
  let transitionInterval;
  let imageData1;
  let imageData2;
  function resizeCanvas() {
    canvas1.width = video.videoWidth;
    canvas1.height = video.videoHeight;
    canvas2.width = video.videoWidth;
    canvas2.height = video.videoHeight;
  }
  video.addEventListener("play", function () {
    captureFrame();
    captureInterval = setInterval(captureFrame, updateSpeed); // Capture frame every 3 seconds
  });
  video.addEventListener("pause", function () {
    clearInterval(captureInterval); // Stop capturing frames when video is paused
    cancelAnimationFrame(animationId); // Stop the animation when the video is paused
  });
  function captureFrame() {
    if (video.paused || video.ended) return;
    // Capture the current frame from the video onto the second canvas
    ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
    ctx2.drawImage(video, 0, 0, canvas2.width, canvas2.height);
    startTransition();
  }
  let animationId; // Variable to store the animation ID
  function startTransition() {
    const frames = 60; // Number of frames for the transition
    const transitionDuration = updateSpeed; // Transition duration in milliseconds (adjust as needed)
    const startTime = performance.now();
    const imageData1 = ctx1.getImageData(
      0,
      0,
      canvas1.width,
      canvas1.height
    );
    const imageData2 = ctx2.getImageData(
      0,
      0,
      canvas2.width,
      canvas2.height
    );
    const blendedData = ctx1.createImageData(
      canvas1.width,
      canvas1.height
    ); // Create a new ImageData object for the blended result
    function animate() {
      const currentTime = performance.now();
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(1, elapsedTime / transitionDuration);
      // Perform color blending for each pixel
      for (let i = 0; i < blendedData.data.length; i += 4) {
        // Linear interpolation between pixel colors from canvas1 and canvas2
        for (let j = i; j < i + 4; j++) {
          blendedData.data[j] =
            (1 - progress) * imageData1.data[j] +
            progress * imageData2.data[j];
        }
      }
      // Clear canvas1 before drawing the blended frame
      ctx1.clearRect(0, 0, canvas1.width, canvas1.height);
      // Put the blended image data onto canvas1
      ctx1.putImageData(blendedData, 0, 0);
      if (progress < 1 && !video.paused) {
        // Continue animation if progress is not complete and video is not paused
        requestAnimationFrame(animate);
      }
    }
    animate();
  }
}
applyVisualEffects(video,canvas1,canvas2,2000)
