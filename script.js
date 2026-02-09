console.log("Template-Documenter-BRANCH: Main...Test-1");
//.......................................................................................
//LAZY LOADING VIDS......................................................................
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
//.......................................................................................
//RESET VIDWRAPPERS AFTER UNLOADING......................................................
const ResetVidWrapper = function (vidWrapper) {
  switch (vidWrapper.classList[1]) {
    case "single":
      vidWrapper.querySelector(".play-btn-wrapper").classList.remove("off");
      break;
    case "two-state":
      vidWrapper.querySelector(".play-btn-wrapper").classList.remove("off");
      vidWrapper
        .querySelector(".play-btn-wrapper")
        .classList.remove("state-1", "state-2");
      vidWrapper.querySelector(".play-btn-wrapper").classList.add("state-1");
      break;
    case "data":
      vidWrapper.querySelector(".data-btn-wrapper").classList.add("active");
      vidWrapper
        .querySelector(".back-img-text-btn-wrapper")
        .classList.remove("active");
      vidWrapper.querySelector(".btn.img-text").textContent = "image";
      vidWrapper.querySelector(".dimmer").classList.remove("active");
      DeActivateAllData(vidWrapper);
      ResetDataScroll(vidWrapper);
      break;
    case "features":
      vidWrapper.querySelector(".features-btn-wrapper").classList.add("active");
      break;
    case "sequence":
      vidWrapper.querySelector(".pause-btn-wrapper").classList.add("off");
      vidWrapper.querySelector(".pause-btn-wrapper").style.pointerEvents =
        "none";
      DeActivateAllSequenceBtns(vidWrapper);
      break;
  }
};
//.......................................................................................
//NAV DEFINITIONS........................................................................
const allChapterWrappers = document.querySelectorAll(".chapter-wrapper");
const allSubChapterWrappers = document.querySelectorAll(".sub-chapter-wrapper");
const allNavBtns = document.querySelectorAll(".nav-btn");
const allNavItemHeaders = document.querySelectorAll(".nav-item-header");
const allNavDropdowns = document.querySelectorAll(".nav-item-dropdown");
const allMainWrappers = document.querySelectorAll(".main-wrapper");
//.......................................................................................
//NAV EVENTS.............................................................................
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
//.......................................................................................
//NAV FUNCTIONS..........................................................................
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
//.......................................................................................
//INFO DOTS DEFINITIONS..................................................................
const allDots = [...document.querySelectorAll(".dot")];
const allDotImgWrappers = document.querySelectorAll(".dots-img-wrapper");
const allDotDescriptionWrappers = [
  ...document.querySelectorAll(".dot-description-wrapper"),
];
//.......................................................................................
//INFO DOTS EVENTS.......................................................................
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
//.......................................................................................
//INFO DOTS FUNCTIONS....................................................................
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
//.......................................................................................
//SINGLE/TWO-STATE VIDS DEFINITIONS......................................................
const allPlayBtns = document.querySelectorAll(".play-btn-wrapper");
const allVids = document.querySelectorAll(".vid");
const allStateVids = document.querySelectorAll(".vid-state");
//.......................................................................................
//SINGLE/TWO-STATE VIDS EVENTS...........................................................
allPlayBtns.forEach(function (el) {
  el.addEventListener("click", function () {
    el.classList.add("off");
    if (el.classList.contains("state-1") || el.classList.contains("state-2")) {
      PlayStateVid(el);
      return;
    }
    el.parentElement.querySelectorAll(".vid").forEach(function (el) {
      el.play();
    });
  });
});
allVids.forEach(function (el) {
  el.addEventListener("ended", function () {
    el.closest(".vid-wrapper")
      .querySelector(".play-btn-wrapper")
      .classList.remove("off");
    if (
      el.parentElement.classList.contains("state-1") ||
      el.parentElement.classList.contains("state-2")
    )
      return;
    el.currentTime = 0;
  });
});
allStateVids.forEach(function (el) {
  el.addEventListener("ended", function () {
    el.closest(".vid-wrapper")
      .querySelector(".play-btn-wrapper")
      .classList.remove("off");
  });
});
//.......................................................................................
//TWO-STATE VIDS FUNCTIONS...............................................................
const PlayStateVid = function (playBtn) {
  let stateFlag = playBtn.classList[1];
  let startTime;
  let endTime;
  let currentVid;
  playBtn
    .closest(".vid-wrapper")
    .querySelectorAll(".vid-div-state")
    .forEach(function (el) {
      if (window.getComputedStyle(el).display !== "none") {
        currentVid = el.querySelector(".vid-state");
      }
    });
  if (stateFlag === "state-1") {
    startTime = playBtn.getAttribute("state-1-startTime");
    endTime = playBtn.getAttribute("state-1-endTime");
  } else {
    startTime = playBtn.getAttribute("state-2-startTime");
    endTime = playBtn.getAttribute("state-2-endTime");
  }
  PlayRange(startTime, endTime, currentVid);
  stateFlag === "state-1" ? (stateFlag = "state-2") : (stateFlag = "state-1");
  playBtn.classList.remove("state-1", "state-2");
  playBtn.classList.add(stateFlag);
};
//.......................................................................................
//DATA VIDS DEFINITIONS.................................................................
const allDataBtns = document.querySelectorAll(".btn.data");
const allDataBackBtns = [...document.querySelectorAll(".btn.back")];
const allDataImgTextBtns = document.querySelectorAll(".btn.img-text");
const allDataVids = [...document.querySelectorAll(".vid-data")];
//.......................................................................................
//DATA VIDS EVENTS......................................................................
allDataBtns.forEach(function (el) {
  el.addEventListener("click", function () {
    el.closest(".data-btn-wrapper").classList.remove("active");
    el.classList.add("clicked");
    let startTime = el.getAttribute("startTime");
    let endTime = el.getAttribute("endTime");
    let currentVid;
    el.closest(".vid-wrapper")
      .querySelectorAll(".vid-div-data")
      .forEach(function (el2) {
        if (window.getComputedStyle(el2).display !== "none")
          currentVid = el2.querySelector(".vid-data");
      });
    PlayRange(startTime, endTime, currentVid);
  });
});
allDataVids.forEach(function (el) {
  el.addEventListener("ended", function () {
    let localIndex;
    el.closest(".vid-wrapper")
      .querySelectorAll(".btn.data")
      .forEach(function (el2, index) {
        if (el2.classList.contains("clicked")) {
          el2.classList.remove("clicked");
          localIndex = index;
        }
      });
    el.closest(".vid-wrapper")
      .querySelector(".back-img-text-btn-wrapper")
      .classList.add("active");
    el.closest(".vid-wrapper").querySelector(".dimmer").classList.add("active");
    ActivateData(el.closest(".vid-wrapper"), localIndex);
  });
});

allDataBackBtns.forEach(function (el) {
  el.addEventListener("click", function () {
    el.parentElement.classList.remove("active");
    el.parentElement.querySelector(".btn.img-text").textContent = "image";
    el.closest(".vid-wrapper")
      .querySelector(".dimmer")
      .classList.remove("active");
    DeActivateAllData(el.closest(".vid-wrapper"));
    el.closest(".vid-wrapper")
      .querySelectorAll(".vid-div-data")
      .forEach(function (el2) {
        el2.querySelector(".vid-data").currentTime = 0;
      });
    el.closest(".btn-wrapper")
      .querySelector(".data-btn-wrapper")
      .classList.add("active");
    ResetDataScroll(el.closest(".vid-wrapper"));
  });
});
allDataImgTextBtns.forEach(function (el) {
  el.addEventListener("click", function () {
    if (el.textContent === "image") {
      let localIndex = GetLocalIndex(
        [
          ...el.closest(".vid-wrapper").querySelectorAll(".data-all-wrapper"),
        ].find((el2) => el2.classList.contains("active")),
        el.closest(".vid-wrapper").querySelector(".all-data-wrapper"),
        "data-all-wrapper",
      );
      ((el.textContent = "text"),
        el
          .closest(".vid-wrapper")
          .querySelector(".dimmer")
          .classList.remove("active"));
      [...el.closest(".vid-wrapper").querySelectorAll(".data-all-wrapper")][
        localIndex
      ].classList.remove("active");

      [...el.closest(".vid-wrapper").querySelectorAll(".data-all-wrapper")][
        localIndex
      ].classList.add("last-active");
    } else {
      let localIndex = GetLocalIndex(
        [
          ...el.closest(".vid-wrapper").querySelectorAll(".data-all-wrapper"),
        ].find((el2) => el2.classList.contains("last-active")),
        el.closest(".vid-wrapper").querySelector(".all-data-wrapper"),
        "data-all-wrapper",
      );
      el.closest(".vid-wrapper")
        .querySelector(".dimmer")
        .classList.remove("active");
      [...el.closest(".vid-wrapper").querySelectorAll(".data-all-wrapper")][
        localIndex
      ].classList.remove("active");
      el.textContent = "image";
      el.closest(".vid-wrapper")
        .querySelector(".dimmer")
        .classList.add("active");
      [...el.closest(".vid-wrapper").querySelectorAll(".data-all-wrapper")][
        localIndex
      ].classList.add("active");

      [...el.closest(".vid-wrapper").querySelectorAll(".data-all-wrapper")][
        localIndex
      ].classList.remove("last-active");
    }
  });
});
//.......................................................................................
//DATA VIDS FUNCTIONS....................................................................
const ActivateDataVid = function (vidWrapper, localIndex) {
  vidWrapper.querySelectorAll(".vid-div-data").forEach(function (el) {
    el.classList.remove("active");
  });
  vidWrapper.querySelectorAll(".vid-div-data.mp").forEach(function (el) {
    el.classList.remove("active");
  });
  let activeCompVidDiv =
    vidWrapper.querySelectorAll(".vid-div-data")[localIndex];
  let activeCompVidDivMP =
    vidWrapper.querySelectorAll(".vid-div-data.mp")[localIndex];
  activeCompVidDiv.classList.add("current");
  activeCompVidDivMP.classList.add("current");
};
const ActivateData = function (vidWrapper, localIndex) {
  DeActivateAllData(vidWrapper);
  vidWrapper
    .querySelectorAll(".data-all-wrapper")
    [localIndex].classList.add("active");
};
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
//.......................................................................................
//FEATURES VIDS DEFINITIONS.................................................................
const allFeaturesBtns = document.querySelectorAll(".btn.features");
const allFeaturesVids = [...document.querySelectorAll(".vid-features")];
//.......................................................................................
//FEATURES VIDS EVENTS......................................................................
allFeaturesBtns.forEach(function (el) {
  el.addEventListener("click", function () {
    el.closest(".features-btn-wrapper").classList.remove("active");
    let startTime = el.getAttribute("startTime");
    let endTime = el.getAttribute("endTime");
    let currentVid;
    el.closest(".vid-wrapper")
      .querySelectorAll(".vid-div-features")
      .forEach(function (el2) {
        if (window.getComputedStyle(el2).display !== "none")
          currentVid = el2.querySelector(".vid-features");
      });
    PlayRange(startTime, endTime, currentVid);
  });
});
allFeaturesVids.forEach(function (el) {
  el.addEventListener("ended", function () {
    el.closest(".vid-wrapper")
      .querySelector(".features-btn-wrapper")
      .classList.add("active");
  });
});
//.......................................................................................
//FEATURES VIDS FUNCTIONS....................................................................
//.......................................................................................
//SEQUENCE VIDS DEFINITIONS.................................................................
const allSequenceBtns = document.querySelectorAll(".btn.sequence");
const allSequenceVidDivs = [...document.querySelectorAll(".vid-div-sequence")];
const allSequenceVids = [...document.querySelectorAll(".vid-sequence")];
const allPauseBtnWrappers = document.querySelectorAll(".pause-btn-wrapper");
//.......................................................................................
//SEQUENCE VIDS EVENTS......................................................................
allSequenceBtns.forEach(function (el) {
  el.addEventListener("click", function (e) {
    const clicked = e.target.closest(".btn.sequence");
    if (!clicked) return;
    ResetAllVids(el.closest(".vid-wrapper"));
    let localIndex = GetLocalIndex(
      el,
      el.closest(".btn-wrapper.sequence"),
      "btn.sequence",
    );
    let localPauseWrapper = el
      .closest(".vid-wrapper")
      .querySelector(".pause-btn-wrapper");
    if (!localPauseWrapper.classList.contains("off"))
      localPauseWrapper.classList.add("off");
    localPauseWrapper.style.pointerEvents = "auto";
    ActivateSequenceBtns(el.closest(".vid-wrapper"), localIndex);
    let startTime = el.getAttribute("startTime");
    let endTime = el.getAttribute("endTime");
    let currentVid;
    el.closest(".vid-wrapper")
      .querySelectorAll(".vid-div-sequence")
      .forEach(function (el2) {
        if (window.getComputedStyle(el2).display !== "none")
          currentVid = el2.querySelector(".vid-sequence");
      });
    currentVid.parentElement.classList.add("jumping");
    PlayRange(startTime, endTime, currentVid);
  });
});
allSequenceVids.forEach(function (el) {
  el.addEventListener("ended", function () {
    el
      .closest(".vid-wrapper")
      .querySelector(".pause-btn-wrapper").style.pointerEvents = "none";
  });
});
allPauseBtnWrappers.forEach(function (el) {
  el.addEventListener("click", function (e) {
    const clicked = e.target.closest(".pause-btn-wrapper");
    if (!clicked) return;
    let startTime;
    let endTime;
    let currentVid;
    el.closest(".vid-wrapper")
      .querySelectorAll(".btn.sequence")
      .forEach(function (el) {
        if (el.classList.contains("current")) {
          startTime = el.getAttribute("startTime");
          endTime = el.getAttribute("endTime");
          currentVid;
          el.closest(".vid-wrapper")
            .querySelectorAll(".vid-div-sequence")
            .forEach(function (el2) {
              if (window.getComputedStyle(el2).display !== "none")
                currentVid = el2.querySelector(".vid-sequence");
            });
        }
      });
    el.classList.toggle("off");
    if (el.classList.contains("off")) {
      PlayRange(startTime, endTime, currentVid, currentVid.currentTime);
    } else {
      currentVid.pause();
    }
  });
});
//.......................................................................................
//SEQUENCE VIDS FUNCTIONS................................................................
const ResetAllVids = function (vidWrapper) {
  vidWrapper.querySelectorAll(".vid-sequence").forEach(function (el) {
    el.pause();
    el.currentTime = 0;
  });
};
const DeActivateAllSequenceBtns = function (vidWrapper) {
  vidWrapper.querySelectorAll(".btn.sequence").forEach(function (el) {
    el.classList.remove("current");
  });
};
const ActivateSequenceBtns = function (vidWrapper, localIndex) {
  DeActivateAllSequenceBtns(vidWrapper);
  [...vidWrapper.querySelectorAll(".btn.sequence")][localIndex].classList.add(
    "current",
  );
};
const ActivateSequence = function (vidWrapper, localIndex) {
  DeActivateAllSequence(vidWrapper);
  [...vidWrapper.querySelectorAll(".vid-div-sequence")][
    localIndex
  ].classList.add("active");
  [...vidWrapper.querySelectorAll(".vid-div-sequence-mp")][
    localIndex
  ].classList.add("active");
};
const DeActivateAllSequence = function (vidWrapper) {
  vidWrapper.querySelectorAll(".vid-div-sequence").forEach(function (el) {
    el.classList.remove("active");
    el.querySelector(".vid-sequence").currentTime = 0;
  });
  vidWrapper.querySelectorAll(".vid-div-sequence-mp").forEach(function (el) {
    el.classList.remove("active");
    el.querySelector(".vid-sequence-mp").currentTime = 0;
  });
};
const PlaySequence = function (vidWrapper) {
  let currentSequence = [
    ...vidWrapper.querySelectorAll(".vid-div-sequence"),
  ].find((el) => el.classList.contains("active"));
  currentSequence.querySelector(".vid-sequence").play();
  let currentSequenceMP = [
    ...vidWrapper.querySelectorAll(".vid-div-sequence-mp"),
  ].find((el) => el.classList.contains("active"));
  currentSequenceMP.querySelector(".vid-sequence-mp").play();
};
//.......................................................................................
//GLOBAL FUNCTIONS.......................................................................
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
}
