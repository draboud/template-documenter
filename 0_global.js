//..................................................................................
//GLOBAL FUNCTIONS..................................................................
export const GetLocalIndex = function (el, parentEl, checkClass) {
  let localIndex;
  el.classList.add("selected");
  parentEl.querySelectorAll(`.${checkClass}`).forEach(function (el2, index) {
    if (el2.classList.contains("selected")) {
      el2.classList.remove("selected");
      localIndex = index;
    }
  });
  return localIndex;
};
export const DeActivateCurrentBtns = function (vidWrapper) {
  vidWrapper.querySelectorAll(".btn").forEach(function (el) {
    el.classList.remove("current");
  });
};
export const ActivateCurrentBtn = function (vidWrapper, localIndex) {
  DeActivateCurrentBtns(vidWrapper);
  [...vidWrapper.querySelectorAll(".btn")][localIndex].classList.add("current");
};
export const InitPauseBtn = function (localPauseBtn) {
  localPauseBtn.style.pointerEvents = "auto";
  if (!localPauseBtn.classList.contains("off")) {
    localPauseBtn.classList.add("off");
  }
};
export const PlayRange = function (
  startTime,
  endTime,
  video,
  videoCurrentTime,
) {
  // KILL any previous range-check logic to prevent "double-playing"
  if (video._currentCheckTime) {
    video.removeEventListener("timeupdate", video._currentCheckTime);
  }
  const checkTime = function () {
    if (video.currentTime >= endTime) {
      video.pause();
      video.removeEventListener("timeupdate", checkTime);
      video._currentCheckTime = null; // Clear the reference

      if (video.parentElement.classList.contains("jumping")) return;
      video.dispatchEvent(new Event("ended"));
    }
  };
  // Store the reference so the NEXT call to PlayRange can find and remove it
  video._currentCheckTime = checkTime;
  video.addEventListener("timeupdate", checkTime);
  // Set the start time
  video.currentTime = videoCurrentTime || startTime;
  // Use { once: true } instead of manual nulling for cleaner code
  video.addEventListener(
    "seeked",
    () => {
      video.parentElement.classList.remove("jumping");
      PlayVideo(video);
    },
    { once: true },
  );
};
export async function PlayVideo(video) {
  try {
    await video.play();
  } catch (err) {
    console.error("Playback failed or was interrupted:", err);
  }
  return true;
}
export const PauseVid = function (btn) {
  const allBtns = btn.closest(".vid-wrapper").querySelectorAll(".btn");
  const vidWrapper = btn.closest(".vid-wrapper");
  let vidBreakpoint;
  let startTime;
  let endTime;
  vidWrapper.querySelectorAll(".vid-code").forEach(function (el) {
    if (window.getComputedStyle(el).display !== "none")
      vidBreakpoint = el.querySelector(".vid");
  });
  allBtns.forEach(function (el) {
    if (el.classList.contains("current")) {
      startTime = el.getAttribute("startTime");
      endTime = el.getAttribute("endTime");
    }
  });
  btn.classList.toggle("off");
  if (btn.classList.contains("off")) {
    PlayRange(startTime, endTime, vidBreakpoint, vidBreakpoint.currentTime);
  } else {
    vidBreakpoint.pause();
  }
};
