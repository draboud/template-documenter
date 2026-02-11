console.log("Template-Documenter-BRANCH: Master");
//.....................................................................................
//LAZY LOADING VIDS....................................................................
document.addEventListener("DOMContentLoaded", () => {
  const allLazyVids = document.querySelectorAll(
    ".vid, .vid-state, .vid-data, .vid-features, .vid-sequence",
  );
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  };
  const videoObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const video = entry.target;
      const sources = video.querySelectorAll("source");
      if (entry.isIntersecting) {
        // --- LOAD LOGIC ---
        sources.forEach((source) => {
          // Use data-src if available, otherwise keep current src
          const dataSrc = source.getAttribute("data-src") || source.src;
          if (dataSrc) {
            source.src = dataSrc;
            // Keep data-src attribute so we can find the URL again later
            source.setAttribute("data-src", dataSrc);
          }
        });
        video.load();
      } else {
        // --- UNLOAD LOGIC ---
        ResetVidWrapper(video.closest(".vid-wrapper"));
        video.pause();
        sources.forEach((source) => {
          // Move src back to data-src and empty the current src
          const currentSrc = source.src;
          if (currentSrc) {
            source.setAttribute("data-src", currentSrc);
            source.src = ""; // This stops the video from buffering
            source.removeAttribute("src"); // Fully clear attribute
          }
        });
        // Force the browser to dump the video data from memory
        video.load();
      }
    });
  }, observerOptions);
  allLazyVids.forEach((vid) => videoObserver.observe(vid));
});
//.....................................................................................
//RESET VIDWRAPPERS AFTER UNLOADING....................................................
const ResetVidWrapper = function (vidWrapper) {
  switch (vidWrapper.classList[1]) {
    case "single":
      vidWrapper.querySelector(".play-btn-wrapper").classList.remove("off");
      vidWrapper.querySelector(".pause-btn-wrapper").classList.add("off");
      break;
    case "two-state":
      vidWrapper.querySelector(".play-btn-wrapper").classList.remove("off");
      vidWrapper
        .querySelector(".play-btn-wrapper")
        .classList.remove("state-1", "state-2");
      vidWrapper.querySelector(".play-btn-wrapper").classList.add("state-1");
      break;
    case "data":
      vidWrapper.querySelector(".btn-wrapper").classList.add("active");
      vidWrapper
        .querySelector(".back-img-txt-btn-wrapper")
        .classList.remove("active");
      vidWrapper.querySelector(".btn-img-txt").textContent = "image";
      vidWrapper.querySelector(".dimmer").classList.remove("active");
      DeActivateAllData(vidWrapper);
      ResetDataScroll(vidWrapper);
      break;
    case "features":
      vidWrapper.querySelector(".btn-wrapper").classList.add("active");
      vidWrapper.querySelector(".pause-btn-wrapper").classList.add("off");
      vidWrapper.querySelector(".pause-btn-wrapper").style.pointerEvents =
        "none";
      DeActivateCurrentBtns(vidWrapper);
      break;
    case "sequence":
      vidWrapper.querySelector(".pause-btn-wrapper").classList.add("off");
      vidWrapper.querySelector(".pause-btn-wrapper").style.pointerEvents =
        "none";
      DeActivateCurrentBtns(vidWrapper);
      break;
  }
};
//.....................................................................................
//NAV DEFINITIONS......................................................................
const allChapterWrappers = document.querySelectorAll(".chapter-wrapper");
const allSubChapterWrappers = document.querySelectorAll(".sub-chapter-wrapper");
const allNavBtns = document.querySelectorAll(".nav-btn");
const allNavItemHeaders = document.querySelectorAll(".nav-item-header");
const allNavDropdowns = document.querySelectorAll(".nav-item-dropdown");
const allMainWrappers = document.querySelectorAll(".main-wrapper");
//.....................................................................................
//NAV EVENTS...........................................................................
allChapterWrappers.forEach(function (el) {
  el.addEventListener("click", function (e) {
    const clicked = e.target.closest(".chapter-wrapper");
    ActivateSubChapterWrapper(clicked);
  });
});
allNavBtns.forEach(function (el) {
  el.addEventListener("click", function () {
    el.closest(".nav-wrapper").classList.add("active");
    el.classList.add("active");
    el.closest(".nav-wrapper")
      .querySelector(".nav-menu")
      .classList.add("active");
  });
});
allNavItemHeaders.forEach(function (el) {
  el.addEventListener("click", function () {
    CloseAllNavDropdowns(el.closest(".nav-menu"));
    el.parentElement
      .querySelector(".nav-item-dropdown")
      .classList.add("active");
  });
});
allNavDropdowns.forEach(function (el) {
  el.addEventListener("click", function () {
    CloseNavTotally(el.closest(".page-wrapper").querySelector(".main-wrapper"));
  });
});
allMainWrappers.forEach(function (el) {
  el.addEventListener("click", function () {
    CloseNavTotally(el);
  });
});
//.....................................................................................
//NAV FUNCTIONS........................................................................
const ActivateSubChapterWrapper = function (clicked) {
  allSubChapterWrappers.forEach(function (el) {
    if (el.parentElement === clicked) {
      el.classList.toggle("active");
    } else {
      el.classList.remove("active");
    }
  });
};
const CloseNavTotally = function (mainWrapper) {
  CloseAllNavDropdowns(
    mainWrapper.closest(".page-wrapper").querySelector(".nav-menu"),
  );
  mainWrapper
    .closest(".page-wrapper")
    .querySelector(".nav-menu")
    .classList.remove("active");
  mainWrapper
    .closest(".page-wrapper")
    .querySelector(".nav-wrapper")
    .classList.remove("active");
  mainWrapper
    .closest(".page-wrapper")
    .querySelector(".nav-btn")
    .classList.remove("active");
};
const CloseAllNavDropdowns = function (navMenu) {
  navMenu.querySelectorAll(".nav-item-dropdown").forEach(function (el) {
    el.classList.remove("active");
  });
};
//.....................................................................................
//INFO DOTS DEFINITIONS................................................................
const allDots = [...document.querySelectorAll(".dot")];
const allDotDescriptionWrappers = [
  ...document.querySelectorAll(".dot-description-wrapper"),
];
//.....................................................................................
//INFO DOTS EVENTS.....................................................................
allDots.forEach(function (el) {
  el.addEventListener("mouseenter", function () {
    el.classList.remove("active");
    let localIndex = GetLocalIndex(el, el.closest(".dots-img-wrapper"), "dot");
    DeActivateAllRelatedDotDescriptionWrappers(
      el.parentElement.parentElement,
      localIndex,
    );
    ActivateRelatedDotDescriptionWrappers(
      el.closest(".dots-img-wrapper"),
      localIndex,
    );
  });
});
allDotDescriptionWrappers.forEach(function (el) {
  el.addEventListener("mouseleave", function () {
    let localIndex = GetLocalIndex(
      el,
      el.closest(".dots-img-wrapper"),
      "dot-description-wrapper",
    );
    el.classList.remove("active");
    [...el.closest(".dots-img-wrapper").querySelectorAll(".dot")][
      localIndex
    ].classList.add("active");
  });
});
allDotDescriptionWrappers.forEach(function (el) {
  el.addEventListener("click", function () {
    let localIndex = GetLocalIndex(
      el,
      el.closest(".dots-img-wrapper"),
      "dot-description-wrapper",
    );
    el.classList.remove("active");
    [...el.closest(".dots-img-wrapper").querySelectorAll(".dot")][
      localIndex
    ].classList.add("active");
  });
});
//.....................................................................................
//INFO DOTS FUNCTIONS..................................................................
const DeActivateAllRelatedDotDescriptionWrappers = function (
  localDotsDiv,
  localIndex,
) {
  localDotsDiv
    .querySelectorAll(".dot-description-wrapper")
    .forEach(function (el) {
      el.classList.remove("active");
    });
  if (localIndex || localIndex === 0) {
    localDotsDiv.querySelectorAll(".dot").forEach(function (el, index) {
      if (index !== localIndex) el.classList.add("active");
    });
  }
};
const ActivateRelatedDotDescriptionWrappers = function (
  localDotsDiv,
  localIndex,
) {
  [...localDotsDiv.querySelectorAll(".dot-description-wrapper")][
    localIndex
  ].classList.add("active");
};
const CloseAllDotWrappers = function () {
  document.querySelectorAll(".dot-description-wrapper").forEach(function (el) {
    el.classList.remove("active");
  });
};
//.....................................................................................
//SINGLE/TWO-STATE VIDS DEFINITIONS....................................................
const allVids = document.querySelectorAll(".vid");
//.....................................................................................
//SINGLE/TWO-STATE VIDS EVENTS.........................................................
allVids.forEach(function (el) {
  el.addEventListener("ended", function () {
    let btnType;
    if (el.closest(".vid-wrapper").querySelector(".play-btn-wrapper") != null) {
      btnType = el.closest(".vid-wrapper").querySelector(".play-btn-wrapper");
    } else {
      btnType = el.closest(".vid-wrapper").querySelector(".btn-wrapper");
    }
    DelegateActionVidEnd(btnType);
  });
});
//.....................................................................................
//DATA VIDS FUNCTIONS..................................................................
const DeActivateAllData = function (vidWrapper) {
  vidWrapper.querySelectorAll(".data-all-wrapper").forEach(function (el) {
    el.classList.remove("active");
  });
};
const ResetDataScroll = function (vidWrapper) {
  vidWrapper.querySelectorAll(".data-all-wrapper").forEach(function (el) {
    el.querySelector(".data-wrapper").scroll(0, 0);
  });
};
//.....................................................................................
//GLOBAL FUNCTIONS.....................................................................
const GetLocalIndex = function (el, parentEl, checkClass) {
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
const DeActivateCurrentBtns = function (vidWrapper) {
  vidWrapper.querySelectorAll(".btn").forEach(function (el) {
    el.classList.remove("current");
  });
};
const ActivateCurrentBtn = function (vidWrapper, localIndex) {
  DeActivateCurrentBtns(vidWrapper);
  [...vidWrapper.querySelectorAll(".btn")][localIndex].classList.add("current");
};
const InitPauseBtn = function (localPauseBtn) {
  localPauseBtn.style.pointerEvents = "auto";
  if (!localPauseBtn.classList.contains("off")) {
    localPauseBtn.classList.add("off");
  }
};
const PlayRange = function (startTime, endTime, video, videoCurrentTime) {
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
async function PlayVideo(video) {
  try {
    await video.play();
  } catch (err) {
    console.error("Playback failed or was interrupted:", err);
  }
  return true;
}
const PauseVid = function (btn) {
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
//.....................................................................................
//EVENT DELEGATION.....................................................................
const mainWrapper = document.querySelector(".main-wrapper");
mainWrapper.addEventListener("click", function (e) {
  const btn = e.target.closest(".btn");
  if (!btn) return;
  DelegateActionClick(btn);
});
mainWrapper.addEventListener("click", function (e) {
  const btn = e.target.closest(".play-btn-wrapper");
  if (!btn) return;
  DelegateActionClick(btn);
});
mainWrapper.addEventListener("click", function (e) {
  const btn = e.target.closest(".pause-btn-wrapper");
  if (!btn) return;
  PauseVid(btn);
});
mainWrapper.addEventListener("click", function (e) {
  const btn = e.target.closest(".btn-back");
  if (!btn) return;
  DataBack(btn);
});
mainWrapper.addEventListener("click", function (e) {
  const btn = e.target.closest(".btn-img-txt");
  if (!btn) return;
  DataTxtImg(btn);
});
//.....................................................................................
//SINGLE VID...........................................................................
const PlaySingleVid = function (btn) {
  btn.classList.add("off");
  const vidWrapper = btn.closest(".vid-wrapper");
  let vidBreakpoint;
  vidWrapper.querySelectorAll(".vid-code").forEach(function (el) {
    if (window.getComputedStyle(el).display !== "none")
      vidBreakpoint = el.querySelector(".vid");
  });
  vidBreakpoint.play();
};
const EndSingleVid = function (btn) {
  btn.classList.remove("off");
};
//.....................................................................................
//TWO-STATE VID........................................................................
const PlayTwoStateVid = function (btn) {
  const state1or2 = btn.classList[1];
  const vidWrapper = btn.closest(".vid-wrapper");
  let startTime;
  let endTime;
  let vidBreakpoint;
  btn.classList.add("off");
  if (state1or2 === "state-1") {
    startTime = btn.getAttribute("state-1-startTime");
    endTime = btn.getAttribute("state-1-endTime");
  } else {
    startTime = btn.getAttribute("state-2-startTime");
    endTime = btn.getAttribute("state-2-endTime");
  }
  vidWrapper.querySelectorAll(".vid-code").forEach(function (el) {
    if (window.getComputedStyle(el).display !== "none")
      vidBreakpoint = el.querySelector(".vid");
  });
  PlayRange(startTime, endTime, vidBreakpoint);
};
const EndTwoStateVid = function (btn) {
  btn.classList.remove("off");
  if (btn.classList.contains("state-1")) {
    btn.classList.remove("state-1");
    btn.classList.add("state-2");
  } else {
    btn.classList.remove("state-2");
    btn.classList.add("state-1");
  }
};
//.....................................................................................
//DATA VID.............................................................................
const PlayDataVid = function (btn) {
  const startTime = btn.getAttribute("startTime");
  const endTime = btn.getAttribute("endTime");
  const vidWrapper = btn.closest(".vid-wrapper");
  let vidBreakpoint;
  btn.closest(".btn-wrapper").classList.remove("active");
  btn.classList.add("clicked");
  vidWrapper.querySelectorAll(".vid-code").forEach(function (el) {
    if (window.getComputedStyle(el).display !== "none")
      vidBreakpoint = el.querySelector(".vid");
  });
  PlayRange(startTime, endTime, vidBreakpoint);
};
const DataBack = function (btn) {
  const vidWrapper = btn.closest(".vid-wrapper");
  const btnWrapper = vidWrapper.querySelector(".btn-wrapper");
  const backBtnWrapper = btn.closest(".back-img-txt-btn-wrapper");
  const imgTxtBtn = backBtnWrapper.querySelector(".btn-img-txt");
  const dimmer = vidWrapper.querySelector(".dimmer");
  const allVidDivData = vidWrapper.querySelectorAll(".vid-code");
  backBtnWrapper.classList.remove("active");
  imgTxtBtn.textContent = "image";
  dimmer.classList.remove("active");
  DeActivateAllData(vidWrapper);
  allVidDivData.forEach(function (el) {
    el.querySelector(".vid").currentTime = 0;
  });
  btnWrapper.classList.add("active");
  ResetDataScroll(vidWrapper);
};
const DataTxtImg = function (btn) {
  const vidWrapper = btn.closest(".vid-wrapper");
  const allDataAllWrappers = vidWrapper.querySelectorAll(".data-all-wrapper");
  const dimmer = vidWrapper.querySelector(".dimmer");
  let localIndex;
  if (btn.textContent === "image") {
    localIndex = allDataAllWrappers.forEach(function (el, index) {
      if (el.classList.contains("active")) {
        localIndex = index;
        el.classList.remove("active");
        el.classList.add("last-active");
      }
    });
    btn.textContent = "text";
    dimmer.classList.remove("active");
  } else {
    localIndex = allDataAllWrappers.forEach(function (el, index) {
      if (el.classList.contains("last-active")) {
        localIndex = index;
        el.classList.remove("last-active");
        el.classList.add("active");
      }
    });
    btn.textContent = "image";
    dimmer.classList.add("active");
  }
};
const EndDataVid = function (btnWrapper) {
  const vidWrapper = btnWrapper.closest(".vid-wrapper");
  const dimmer = vidWrapper.querySelector(".dimmer");
  const allBtns = btnWrapper.querySelectorAll(".btn");
  const backImgTxtBtnWrapper = btnWrapper
    .closest(".btn-all-wrapper")
    .querySelector(".back-img-txt-btn-wrapper");
  const allDataAllWrappers = btnWrapper
    .closest(".vid-wrapper")
    .querySelectorAll(".data-all-wrapper");
  let clickedIndex;
  allBtns.forEach(function (el, index) {
    if (el.classList.contains("clicked")) {
      el.classList.remove("clicked");
      clickedIndex = index;
    }
  });
  backImgTxtBtnWrapper.classList.add("active");
  [...allDataAllWrappers][clickedIndex].classList.add("active");
  dimmer.classList.add("active");
};
//.....................................................................................
//FEATURES VID.........................................................................
const PlayFeaturesVid = function (btn) {
  const allBtns = btn.closest(".btn-wrapper").querySelectorAll(".btn");
  const startTime = btn.getAttribute("startTime");
  const endTime = btn.getAttribute("endTime");
  const vidWrapper = btn.closest(".vid-wrapper");
  const pauseBtn = btn
    .closest(".vid-wrapper")
    .querySelector(".pause-btn-wrapper");
  InitPauseBtn(pauseBtn);
  let vidBreakpoint;
  btn.closest(".btn-wrapper").classList.remove("active");
  btn.classList.add("clicked");
  let localIndex;
  allBtns.forEach(function (el, index) {
    if (el.classList.contains("clicked")) {
      el.classList.remove("clicked");
      localIndex = index;
    }
  });
  ActivateCurrentBtn(btn.closest(".vid-wrapper"), localIndex);
  vidWrapper.querySelectorAll(".vid-code").forEach(function (el) {
    if (window.getComputedStyle(el).display !== "none")
      vidBreakpoint = el.querySelector(".vid");
  });
  PlayRange(startTime, endTime, vidBreakpoint);
};
const EndFeaturesVid = function (btnWrapper) {
  btnWrapper.classList.add("active");
  const pauseWrapper = btnWrapper
    .closest(".vid-wrapper")
    .querySelector(".pause-btn-wrapper");
  const localVidWrapper = btnWrapper.closest(".vid-wrapper");
  DeActivateCurrentBtns(localVidWrapper);
  pauseWrapper.style.pointerEvents = "none";
};
//.....................................................................................
//SEQUENCE VID.........................................................................
const PlaySequenceVid = function (btn) {
  const allBtns = btn.closest(".btn-wrapper").querySelectorAll(".btn");
  const startTime = btn.getAttribute("startTime");
  const endTime = btn.getAttribute("endTime");
  const vidWrapper = btn.closest(".vid-wrapper");
  const pauseBtn = btn
    .closest(".vid-wrapper")
    .querySelector(".pause-btn-wrapper");
  let vidBreakpoint;
  InitPauseBtn(pauseBtn);
  btn.classList.add("clicked");
  let localIndex;
  allBtns.forEach(function (el, index) {
    if (el.classList.contains("clicked")) {
      el.classList.remove("clicked");
      localIndex = index;
    }
  });
  ActivateCurrentBtn(btn.closest(".vid-wrapper"), localIndex);
  vidWrapper.querySelectorAll(".vid-code").forEach(function (el) {
    if (window.getComputedStyle(el).display !== "none")
      vidBreakpoint = el.querySelector(".vid");
  });
  PlayRange(startTime, endTime, vidBreakpoint);
};
const EndSequenceVid = function (btnWrapper) {
  const pauseWrapper = btnWrapper
    .closest(".vid-wrapper")
    .querySelector(".pause-btn-wrapper");
  pauseWrapper.style.pointerEvents = "none";
};
//.....................................................................................
//SORTING BY TYPE......................................................................
const vidTypePlayMap = new Map();
vidTypePlayMap.set("single", PlaySingleVid);
vidTypePlayMap.set("two-state", PlayTwoStateVid);
vidTypePlayMap.set("data", PlayDataVid);
vidTypePlayMap.set("features", PlayFeaturesVid);
vidTypePlayMap.set("sequence", PlaySequenceVid);

const vidTypeEndMap = new Map();
vidTypeEndMap.set("single", EndSingleVid);
vidTypeEndMap.set("two-state", EndTwoStateVid);
vidTypeEndMap.set("data", EndDataVid);
vidTypeEndMap.set("features", EndFeaturesVid);
vidTypeEndMap.set("sequence", EndSequenceVid);

const DelegateActionClick = function (btn) {
  const typeClass = [...btn.closest(".vid-wrapper").classList].find((el) =>
    vidTypePlayMap.has(el),
  );
  if (typeClass) {
    vidTypePlayMap.get(typeClass)(btn);
  }
};
const DelegateActionVidEnd = function (btnWrapper) {
  const typeClass = [...btnWrapper.closest(".vid-wrapper").classList].find(
    (el) => vidTypeEndMap.has(el),
  );
  if (typeClass) {
    vidTypeEndMap.get(typeClass)(btnWrapper);
  }
};
