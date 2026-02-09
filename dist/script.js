(() => {
  // script.js
  console.log("Template-Documenter-BRANCH: Main...Test-1");
  document.addEventListener("DOMContentLoaded", () => {
    const allLazyVids = document.querySelectorAll(
      ".vid, .vid-state, .vid-data, .vid-features, .vid-sequence"
    );
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1
    };
    const videoObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const video = entry.target;
        const sources = video.querySelectorAll("source");
        if (entry.isIntersecting) {
          sources.forEach((source) => {
            const dataSrc = source.getAttribute("data-src") || source.src;
            if (dataSrc) {
              source.src = dataSrc;
              source.setAttribute("data-src", dataSrc);
            }
          });
          video.load();
        } else {
          video.pause();
          sources.forEach((source) => {
            const currentSrc = source.src;
            if (currentSrc) {
              source.setAttribute("data-src", currentSrc);
              source.src = "";
              source.removeAttribute("src");
            }
          });
          video.load();
        }
      });
    }, observerOptions);
    allLazyVids.forEach((vid) => videoObserver.observe(vid));
  });
  var allChapterWrappers = document.querySelectorAll(".chapter-wrapper");
  var allSubChapterWrappers = document.querySelectorAll(".sub-chapter-wrapper");
  var allNavBtns = document.querySelectorAll(".nav-btn");
  var allNavItemHeaders = document.querySelectorAll(".nav-item-header");
  var allNavDropdowns = document.querySelectorAll(".nav-item-dropdown");
  var allMainWrappers = document.querySelectorAll(".main-wrapper");
  allChapterWrappers.forEach(function(el) {
    el.addEventListener("click", function(e) {
      const clicked = e.target.closest(".chapter-wrapper");
      ActivateSubChapterWrapper(clicked);
    });
  });
  allNavBtns.forEach(function(el) {
    el.addEventListener("click", function() {
      el.closest(".nav-wrapper").classList.add("active");
      el.classList.add("active");
      el.closest(".nav-wrapper").querySelector(".nav-menu").classList.add("active");
    });
  });
  allNavItemHeaders.forEach(function(el) {
    el.addEventListener("click", function() {
      CloseAllNavDropdowns(el.closest(".nav-menu"));
      el.parentElement.querySelector(".nav-item-dropdown").classList.add("active");
    });
  });
  allNavDropdowns.forEach(function(el) {
    el.addEventListener("click", function() {
      CloseNavTotally(el.closest(".page-wrapper").querySelector(".main-wrapper"));
    });
  });
  allMainWrappers.forEach(function(el) {
    el.addEventListener("click", function() {
      CloseNavTotally(el);
    });
  });
  var ActivateSubChapterWrapper = function(clicked) {
    allSubChapterWrappers.forEach(function(el) {
      if (el.parentElement === clicked) {
        el.classList.toggle("active");
      } else {
        el.classList.remove("active");
      }
    });
  };
  var CloseNavTotally = function(mainWrapper) {
    CloseAllNavDropdowns(
      mainWrapper.closest(".page-wrapper").querySelector(".nav-menu")
    );
    mainWrapper.closest(".page-wrapper").querySelector(".nav-menu").classList.remove("active");
    mainWrapper.closest(".page-wrapper").querySelector(".nav-wrapper").classList.remove("active");
    mainWrapper.closest(".page-wrapper").querySelector(".nav-btn").classList.remove("active");
  };
  var CloseAllNavDropdowns = function(navMenu) {
    navMenu.querySelectorAll(".nav-item-dropdown").forEach(function(el) {
      el.classList.remove("active");
    });
  };
  var allDots = [...document.querySelectorAll(".dot")];
  var allDotImgWrappers = document.querySelectorAll(".dots-img-wrapper");
  var allDotDescriptionWrappers = [
    ...document.querySelectorAll(".dot-description-wrapper")
  ];
  allDots.forEach(function(el) {
    el.addEventListener("mouseenter", function() {
      el.classList.remove("active");
      let localIndex = GetLocalIndex(el, el.closest(".dots-img-wrapper"), "dot");
      DeActivateAllRelatedDotDescriptionWrappers(
        el.parentElement.parentElement,
        localIndex
      );
      ActivateRelatedDotDescriptionWrappers(
        el.closest(".dots-img-wrapper"),
        localIndex
      );
    });
  });
  allDotDescriptionWrappers.forEach(function(el) {
    el.addEventListener("mouseleave", function() {
      let localIndex = GetLocalIndex(
        el,
        el.closest(".dots-img-wrapper"),
        "dot-description-wrapper"
      );
      el.classList.remove("active");
      [...el.closest(".dots-img-wrapper").querySelectorAll(".dot")][localIndex].classList.add("active");
    });
  });
  allDotDescriptionWrappers.forEach(function(el) {
    el.addEventListener("click", function() {
      let localIndex = GetLocalIndex(
        el,
        el.closest(".dots-img-wrapper"),
        "dot-description-wrapper"
      );
      el.classList.remove("active");
      [...el.closest(".dots-img-wrapper").querySelectorAll(".dot")][localIndex].classList.add("active");
    });
  });
  var DeActivateAllRelatedDotDescriptionWrappers = function(localDotsDiv, localIndex) {
    localDotsDiv.querySelectorAll(".dot-description-wrapper").forEach(function(el) {
      el.classList.remove("active");
    });
    if (localIndex || localIndex === 0) {
      localDotsDiv.querySelectorAll(".dot").forEach(function(el, index) {
        if (index !== localIndex) el.classList.add("active");
      });
    }
  };
  var ActivateRelatedDotDescriptionWrappers = function(localDotsDiv, localIndex) {
    [...localDotsDiv.querySelectorAll(".dot-description-wrapper")][localIndex].classList.add("active");
  };
  var allPlayBtns = document.querySelectorAll(".play-btn-wrapper");
  var allVids = document.querySelectorAll(".vid");
  var allStateVids = document.querySelectorAll(".vid-state");
  allPlayBtns.forEach(function(el) {
    el.addEventListener("click", function() {
      el.classList.add("off");
      if (el.classList.contains("state-1") || el.classList.contains("state-2")) {
        PlayStateVid(el);
        return;
      }
      el.parentElement.querySelectorAll(".vid").forEach(function(el2) {
        el2.play();
      });
    });
  });
  allVids.forEach(function(el) {
    el.addEventListener("ended", function() {
      el.closest(".vid-wrapper").querySelector(".play-btn-wrapper").classList.remove("off");
      if (el.parentElement.classList.contains("state-1") || el.parentElement.classList.contains("state-2"))
        return;
      el.currentTime = 0;
    });
  });
  allStateVids.forEach(function(el) {
    el.addEventListener("ended", function() {
      el.closest(".vid-wrapper").querySelector(".play-btn-wrapper").classList.remove("off");
    });
  });
  var PlayStateVid = function(playBtn) {
    let stateFlag = playBtn.classList[1];
    let startTime;
    let endTime;
    let currentVid;
    playBtn.closest(".vid-wrapper").querySelectorAll(".vid-div-state").forEach(function(el) {
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
    stateFlag === "state-1" ? stateFlag = "state-2" : stateFlag = "state-1";
    playBtn.classList.remove("state-1", "state-2");
    playBtn.classList.add(stateFlag);
  };
  var allDataBtns = document.querySelectorAll(".btn.data");
  var allDataBackBtns = [...document.querySelectorAll(".btn.back")];
  var allDataImgTextBtns = document.querySelectorAll(".btn.img-text");
  var allDataVids = [...document.querySelectorAll(".vid-data")];
  allDataBtns.forEach(function(el) {
    el.addEventListener("click", function() {
      el.closest(".data-btn-wrapper").classList.remove("active");
      el.classList.add("clicked");
      let startTime = el.getAttribute("startTime");
      let endTime = el.getAttribute("endTime");
      let currentVid;
      el.closest(".vid-wrapper").querySelectorAll(".vid-div-data").forEach(function(el2) {
        if (window.getComputedStyle(el2).display !== "none")
          currentVid = el2.querySelector(".vid-data");
      });
      PlayRange(startTime, endTime, currentVid);
    });
  });
  allDataVids.forEach(function(el) {
    el.addEventListener("ended", function() {
      let localIndex;
      el.closest(".vid-wrapper").querySelectorAll(".btn.data").forEach(function(el2, index) {
        if (el2.classList.contains("clicked")) {
          el2.classList.remove("clicked");
          localIndex = index;
        }
      });
      el.closest(".vid-wrapper").querySelector(".back-img-text-btn-wrapper").classList.add("active");
      el.closest(".vid-wrapper").querySelector(".dimmer").classList.add("active");
      ActivateData(el.closest(".vid-wrapper"), localIndex);
    });
  });
  allDataBackBtns.forEach(function(el) {
    el.addEventListener("click", function() {
      el.parentElement.classList.remove("active");
      el.parentElement.querySelector(".btn.img-text").textContent = "image";
      el.closest(".vid-wrapper").querySelector(".dimmer").classList.remove("active");
      DeActivateAllData(el.closest(".vid-wrapper"));
      el.closest(".vid-wrapper").querySelectorAll(".vid-div-data").forEach(function(el2) {
        el2.querySelector(".vid-data").currentTime = 0;
      });
      el.closest(".btn-wrapper").querySelector(".data-btn-wrapper").classList.add("active");
      el.closest(".vid-wrapper").querySelectorAll(".data-all-wrapper").forEach(function(el2) {
        el2.querySelector(".data-wrapper").scroll(0, 0);
      });
    });
  });
  allDataImgTextBtns.forEach(function(el) {
    el.addEventListener("click", function() {
      if (el.textContent === "image") {
        let localIndex = GetLocalIndex(
          [
            ...el.closest(".vid-wrapper").querySelectorAll(".data-all-wrapper")
          ].find((el2) => el2.classList.contains("active")),
          el.closest(".vid-wrapper").querySelector(".all-data-wrapper"),
          "data-all-wrapper"
        );
        el.textContent = "text", el.closest(".vid-wrapper").querySelector(".dimmer").classList.remove("active");
        [...el.closest(".vid-wrapper").querySelectorAll(".data-all-wrapper")][localIndex].classList.remove("active");
        [...el.closest(".vid-wrapper").querySelectorAll(".data-all-wrapper")][localIndex].classList.add("last-active");
      } else {
        let localIndex = GetLocalIndex(
          [
            ...el.closest(".vid-wrapper").querySelectorAll(".data-all-wrapper")
          ].find((el2) => el2.classList.contains("last-active")),
          el.closest(".vid-wrapper").querySelector(".all-data-wrapper"),
          "data-all-wrapper"
        );
        el.closest(".vid-wrapper").querySelector(".dimmer").classList.remove("active");
        [...el.closest(".vid-wrapper").querySelectorAll(".data-all-wrapper")][localIndex].classList.remove("active");
        el.textContent = "image";
        el.closest(".vid-wrapper").querySelector(".dimmer").classList.add("active");
        [...el.closest(".vid-wrapper").querySelectorAll(".data-all-wrapper")][localIndex].classList.add("active");
        [...el.closest(".vid-wrapper").querySelectorAll(".data-all-wrapper")][localIndex].classList.remove("last-active");
      }
    });
  });
  var ActivateData = function(vidWrapper, localIndex) {
    DeActivateAllData(vidWrapper);
    vidWrapper.querySelectorAll(".data-all-wrapper")[localIndex].classList.add("active");
  };
  var DeActivateAllData = function(vidWrapper) {
    vidWrapper.querySelectorAll(".data-all-wrapper").forEach(function(el) {
      el.classList.remove("active");
    });
  };
  var allFeaturesBtns = document.querySelectorAll(".btn.features");
  var allFeaturesVids = [...document.querySelectorAll(".vid-features")];
  allFeaturesBtns.forEach(function(el) {
    el.addEventListener("click", function() {
      el.closest(".features-btn-wrapper").classList.remove("active");
      let startTime = el.getAttribute("startTime");
      let endTime = el.getAttribute("endTime");
      let currentVid;
      el.closest(".vid-wrapper").querySelectorAll(".vid-div-features").forEach(function(el2) {
        if (window.getComputedStyle(el2).display !== "none")
          currentVid = el2.querySelector(".vid-features");
      });
      PlayRange(startTime, endTime, currentVid);
    });
  });
  allFeaturesVids.forEach(function(el) {
    el.addEventListener("ended", function() {
      el.closest(".vid-wrapper").querySelector(".features-btn-wrapper").classList.add("active");
    });
  });
  var allSequenceBtns = document.querySelectorAll(".btn.sequence");
  var allSequenceVidDivs = [...document.querySelectorAll(".vid-div-sequence")];
  var allSequenceVids = [...document.querySelectorAll(".vid-sequence")];
  var allPauseBtnWrappers = document.querySelectorAll(".pause-btn-wrapper");
  allSequenceBtns.forEach(function(el) {
    el.addEventListener("click", function(e) {
      const clicked = e.target.closest(".btn.sequence");
      if (!clicked) return;
      ResetAllVids(el.closest(".vid-wrapper"));
      let localIndex = GetLocalIndex(
        el,
        el.closest(".btn-wrapper.sequence"),
        "btn.sequence"
      );
      let localPauseWrapper = el.closest(".vid-wrapper").querySelector(".pause-btn-wrapper");
      if (!localPauseWrapper.classList.contains("off"))
        localPauseWrapper.classList.add("off");
      localPauseWrapper.style.pointerEvents = "auto";
      ActivateSequenceBtns(el.closest(".vid-wrapper"), localIndex);
      let startTime = el.getAttribute("startTime");
      let endTime = el.getAttribute("endTime");
      let currentVid;
      el.closest(".vid-wrapper").querySelectorAll(".vid-div-sequence").forEach(function(el2) {
        if (window.getComputedStyle(el2).display !== "none")
          currentVid = el2.querySelector(".vid-sequence");
      });
      currentVid.parentElement.classList.add("jumping");
      PlayRange(startTime, endTime, currentVid);
    });
  });
  allSequenceVids.forEach(function(el) {
    el.addEventListener("ended", function() {
      el.closest(".vid-wrapper").querySelector(".pause-btn-wrapper").style.pointerEvents = "none";
    });
  });
  allPauseBtnWrappers.forEach(function(el) {
    el.addEventListener("click", function(e) {
      const clicked = e.target.closest(".pause-btn-wrapper");
      if (!clicked) return;
      let startTime;
      let endTime;
      let currentVid;
      el.closest(".vid-wrapper").querySelectorAll(".btn.sequence").forEach(function(el2) {
        if (el2.classList.contains("current")) {
          startTime = el2.getAttribute("startTime");
          endTime = el2.getAttribute("endTime");
          currentVid;
          el2.closest(".vid-wrapper").querySelectorAll(".vid-div-sequence").forEach(function(el22) {
            if (window.getComputedStyle(el22).display !== "none")
              currentVid = el22.querySelector(".vid-sequence");
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
  var ResetAllVids = function(vidWrapper) {
    vidWrapper.querySelectorAll(".vid-sequence").forEach(function(el) {
      el.pause();
      el.currentTime = 0;
    });
  };
  var ActivateSequenceBtns = function(vidWrapper, localIndex) {
    vidWrapper.querySelectorAll(".btn.sequence").forEach(function(el) {
      el.classList.remove("current");
    });
    [...vidWrapper.querySelectorAll(".btn.sequence")][localIndex].classList.add(
      "current"
    );
  };
  var GetLocalIndex = function(el, parentEl, checkClass) {
    let localIndex;
    el.classList.add("selected");
    parentEl.querySelectorAll(`.${checkClass}`).forEach(function(el2, index) {
      if (el2.classList.contains("selected")) {
        el2.classList.remove("selected");
        localIndex = index;
      }
    });
    return localIndex;
  };
  var PlayRange = function(startTime, endTime, video, videoCurrentTime) {
    if (video._currentCheckTime) {
      video.removeEventListener("timeupdate", video._currentCheckTime);
    }
    const checkTime = function() {
      if (video.currentTime >= endTime) {
        video.pause();
        video.removeEventListener("timeupdate", checkTime);
        video._currentCheckTime = null;
        if (video.parentElement.classList.contains("jumping")) return;
        video.dispatchEvent(new Event("ended"));
      }
    };
    video._currentCheckTime = checkTime;
    video.addEventListener("timeupdate", checkTime);
    video.currentTime = videoCurrentTime || startTime;
    video.addEventListener(
      "seeked",
      () => {
        video.parentElement.classList.remove("jumping");
        PlayVideo(video);
      },
      { once: true }
    );
  };
  async function PlayVideo(video) {
    try {
      await video.play();
    } catch (err) {
      console.error("Playback failed or was interrupted:", err);
    }
  }
})();
