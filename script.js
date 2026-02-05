console.log("Template-Documenter-Feb 5, 2026...Test-3");
//.......................................................................................
//DEFINITIONS............................................................................
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
const allVids = [
  ...document.querySelectorAll(".vid"),
  ...document.querySelectorAll(".vid-state"),
];
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
//.......................................................................................
//TWO-STATE VIDS FUNCTIONS...............................................................
const PlayStateVid = function (playBtn) {
  let stateFlag = playBtn.classList[1];
  let playThis;
  playBtn
    .closest(".vid-wrapper")
    .querySelectorAll(".vid-state")
    .forEach(function (el) {
      if (
        !el.parentElement.classList.contains(stateFlag) &&
        window.getComputedStyle(el.parentElement).display !== "none"
      ) {
        el.parentElement.classList.add("off");
        el.currentTime = 0;
      }
      if (
        el.parentElement.classList.contains(stateFlag) &&
        window.getComputedStyle(el.parentElement).display !== "none"
      ) {
        playThis = el.parentElement;
      }
    });
  playThis.classList.remove("off");
  playThis.querySelector(".vid-state").play();
  stateFlag === "state-1" ? (stateFlag = "state-2") : (stateFlag = "state-1");
  playBtn.classList.remove("state-1", "state-2");
  playBtn.classList.add(stateFlag);
};
//.......................................................................................
//MULTI VIDS DEFINITIONS.................................................................
const allMultiBtns = document.querySelectorAll(".btn.multi");
const allMultiBackBtns = [...document.querySelectorAll(".btn.back")];
const allMultiImgTextBtns = document.querySelectorAll(".btn.img-text");
const allMultiVidDivs = [...document.querySelectorAll(".vid-div-multi")];
const allMultiVidDivsMP = [...document.querySelectorAll(".vid-div-multi.mp")];
const allMultiVids = [...document.querySelectorAll(".vid-multi")];
const allMultiVidsMP = [...document.querySelectorAll(".vid-multi-mp")];
const allMultiAllWrappers = [
  ...document.querySelectorAll(".multi-all-wrapper"),
];
//.......................................................................................
//MULTI VIDS EVENTS......................................................................
allMultiBtns.forEach(function (el) {
  el.addEventListener("click", function () {
    let localIndex = GetLocalIndex(el, el.parentElement, "btn.multi");
    el.closest(".multi-btn-wrapper").classList.remove("active");
    ActivateMultiVid(el.closest(".vid-wrapper"), localIndex);
    PlayMultiVid(el.closest(".vid-wrapper"));
  });
});
allMultiBackBtns.forEach(function (el) {
  el.addEventListener("click", function () {
    el.parentElement.classList.remove("active");
    el.parentElement.querySelector(".btn.img-text").textContent = "image";
    el.closest(".vid-wrapper")
      .querySelector(".dimmer")
      .classList.remove("active");
    DeActivateAllMultiData(el.closest(".vid-wrapper"));
    [...el.closest(".vid-wrapper").querySelectorAll(".vid-div-multi")]
      .find((el) => el.classList.contains("active"))
      .querySelector(".vid-multi").currentTime = 0;
    [...el.closest(".vid-wrapper").querySelectorAll(".vid-div-multi.mp")]
      .find((el) => el.classList.contains("active"))
      .querySelector(".vid-multi-mp").currentTime = 0;
    el.closest(".btn-wrapper")
      .querySelector(".multi-btn-wrapper")
      .classList.add("active");
    el.closest(".vid-wrapper")
      .querySelectorAll(".multi-all-wrapper")
      .forEach(function (el2) {
        el2.querySelector(".multi-data-wrapper").scroll(0, 0);
      });
  });
});
allMultiImgTextBtns.forEach(function (el) {
  el.addEventListener("click", function () {
    if (el.textContent === "image") {
      let localIndex = GetLocalIndex(
        [
          ...el.closest(".vid-wrapper").querySelectorAll(".multi-all-wrapper"),
        ].find((el2) => el2.classList.contains("active")),
        el.closest(".vid-wrapper").querySelector(".all-data-wrapper"),
        "multi-all-wrapper",
      );
      ((el.textContent = "text"),
        el
          .closest(".vid-wrapper")
          .querySelector(".dimmer")
          .classList.remove("active"));
      [...el.closest(".vid-wrapper").querySelectorAll(".multi-all-wrapper")][
        localIndex
      ].classList.remove("active");

      [...el.closest(".vid-wrapper").querySelectorAll(".multi-all-wrapper")][
        localIndex
      ].classList.add("last-active");
    } else {
      let localIndex = GetLocalIndex(
        [
          ...el.closest(".vid-wrapper").querySelectorAll(".multi-all-wrapper"),
        ].find((el2) => el2.classList.contains("last-active")),
        el.closest(".vid-wrapper").querySelector(".all-data-wrapper"),
        "multi-all-wrapper",
      );
      el.closest(".vid-wrapper")
        .querySelector(".dimmer")
        .classList.remove("active");
      [...el.closest(".vid-wrapper").querySelectorAll(".multi-all-wrapper")][
        localIndex
      ].classList.remove("active");
      el.textContent = "image";
      el.closest(".vid-wrapper")
        .querySelector(".dimmer")
        .classList.add("active");
      [...el.closest(".vid-wrapper").querySelectorAll(".multi-all-wrapper")][
        localIndex
      ].classList.add("active");

      [...el.closest(".vid-wrapper").querySelectorAll(".multi-all-wrapper")][
        localIndex
      ].classList.remove("last-active");
    }
  });
});
allMultiVids.forEach(function (el) {
  el.addEventListener("ended", function () {
    let localIndex = GetLocalIndex(el, el.closest(".vid-wrapper"), "vid-multi");
    el.closest(".vid-wrapper")
      .querySelector(".back-img-text-btn-wrapper")
      .classList.add("active");
    el.closest(".vid-wrapper").querySelector(".dimmer").classList.add("active");
    ActivateMultiData(el.closest(".vid-wrapper"), localIndex);
  });
});
//.......................................................................................
//MULT VIDS FUNCTIONS....................................................................
const ActivateMultiVid = function (vidWrapper, localIndex) {
  vidWrapper.querySelectorAll(".vid-div-multi").forEach(function (el) {
    el.classList.remove("active");
  });
  vidWrapper.querySelectorAll(".vid-div-multi.mp").forEach(function (el) {
    el.classList.remove("active");
  });
  let activeCompVidDiv =
    vidWrapper.querySelectorAll(".vid-div-multi")[localIndex];
  let activeCompVidDivMP =
    vidWrapper.querySelectorAll(".vid-div-multi.mp")[localIndex];
  activeCompVidDiv.classList.add("current");
  activeCompVidDivMP.classList.add("current");
};
const PlayMultiVid = function (vidWrapper) {
  let currentMultiVidDiv = [
    ...vidWrapper.querySelectorAll(".vid-div-multi"),
  ].find((el) => el.classList.contains("current"));
  currentMultiVidDiv.querySelector(".vid-multi").play();
  currentMultiVidDiv.classList.add("active");
  currentMultiVidDiv.classList.remove("current");

  let currentMultiVidDivMP = [
    ...vidWrapper.querySelectorAll(".vid-div-multi.mp"),
  ].find((el) => el.classList.contains("current"));
  currentMultiVidDivMP = allMultiVidDivsMP.find((el) =>
    el.classList.contains("current"),
  );
  currentMultiVidDivMP.querySelector(".vid-multi-mp").play();
  currentMultiVidDivMP.classList.add("active");
  currentMultiVidDivMP.classList.remove("current");
};
const ActivateMultiData = function (vidWrapper, localIndex) {
  DeActivateAllMultiData(vidWrapper);
  vidWrapper
    .querySelectorAll(".multi-all-wrapper")
    [localIndex].classList.add("active");
};
const DeActivateAllMultiData = function (vidWrapper) {
  vidWrapper.querySelectorAll(".multi-all-wrapper").forEach(function (el) {
    el.classList.remove("active");
  });
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
