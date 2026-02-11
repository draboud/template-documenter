import * as global from "./0_global";
import Navbar from "./0_navbar";
import InfoDots from "./1_info-dots";
import SingleVid from "./2_single-vid";
import TwoStateVid from "./3_two-state-vid";
import DataVid from "./4_data-vid";
import FeaturesVid from "./5_features-vid";
import SequenceVid from "./6_sequence-vid";
//..................................................................................
//LAZY LOADING......................................................................
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
//..................................................................................
//RESET VIDS AFTER UNLOADING........................................................
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
      DataVid.DeActivateAllData(vidWrapper);
      DataVid.ResetDataScroll(vidWrapper);
      break;
    case "features":
      vidWrapper.querySelector(".btn-wrapper").classList.add("active");
      vidWrapper.querySelector(".pause-btn-wrapper").classList.add("off");
      vidWrapper.querySelector(".pause-btn-wrapper").style.pointerEvents =
        "none";
      global.DeActivateCurrentBtns(vidWrapper);
      break;
    case "sequence":
      vidWrapper.querySelector(".pause-btn-wrapper").classList.add("off");
      vidWrapper.querySelector(".pause-btn-wrapper").style.pointerEvents =
        "none";
      global.DeActivateCurrentBtns(vidWrapper);
      break;
  }
};
//..................................................................................
//SORTING ACTION BY VID TYPES.......................................................
export const vidTypePlayMap = new Map();
vidTypePlayMap.set("single", SingleVid.PlaySingleVid);
vidTypePlayMap.set("two-state", TwoStateVid.PlayTwoStateVid);
vidTypePlayMap.set("data", DataVid.PlayDataVid);
vidTypePlayMap.set("features", FeaturesVid.PlayFeaturesVid);
vidTypePlayMap.set("sequence", SequenceVid.PlaySequenceVid);

export const vidTypeEndMap = new Map();
vidTypeEndMap.set("single", SingleVid.EndSingleVid);
vidTypeEndMap.set("two-state", TwoStateVid.EndTwoStateVid);
vidTypeEndMap.set("data", DataVid.EndDataVid);
vidTypeEndMap.set("features", FeaturesVid.EndFeaturesVid);
vidTypeEndMap.set("sequence", SequenceVid.EndSequenceVid);

export const DelegateActionClick = function (btn) {
  const typeClass = [...btn.closest(".vid-wrapper").classList].find((el) =>
    vidTypePlayMap.has(el),
  );
  if (typeClass) {
    vidTypePlayMap.get(typeClass)(btn);
  }
};
export const DelegateActionVidEnd = function (btnWrapper) {
  const typeClass = [...btnWrapper.closest(".vid-wrapper").classList].find(
    (el) => vidTypeEndMap.has(el),
  );
  if (typeClass) {
    vidTypeEndMap.get(typeClass)(btnWrapper);
  }
};
//..................................................................................
//EVENT DELEGATION..................................................................
Navbar.allChapterWrappers.forEach(function (el) {
  el.addEventListener("click", function (e) {
    const clicked = e.target.closest(".chapter-wrapper");
    Navbar.ActivateSubChapterWrapper(clicked);
  });
});
Navbar.allNavBtns.forEach(function (el) {
  el.addEventListener("click", function () {
    el.closest(".nav-wrapper").classList.add("active");
    el.classList.add("active");
    el.closest(".nav-wrapper")
      .querySelector(".nav-menu")
      .classList.add("active");
  });
});
Navbar.allNavItemHeaders.forEach(function (el) {
  el.addEventListener("click", function () {
    Navbar.CloseAllNavDropdowns(el.closest(".nav-menu"));
    el.parentElement
      .querySelector(".nav-item-dropdown")
      .classList.add("active");
  });
});
Navbar.allNavDropdowns.forEach(function (el) {
  el.addEventListener("click", function () {
    Navbar.CloseNavTotally(
      el.closest(".page-wrapper").querySelector(".main-wrapper"),
    );
  });
});
Navbar.allMainWrappers.forEach(function (el) {
  el.addEventListener("click", function () {
    Navbar.CloseNavTotally(el);
  });
});
//..................................................................................
//INFO DOTS EVENTS..................................................................
InfoDots.allDots.forEach(function (el) {
  el.addEventListener("mouseenter", function () {
    el.classList.remove("active");
    let localIndex = global.GetLocalIndex(
      el,
      el.closest(".dots-img-wrapper"),
      "dot",
    );
    InfoDots.DeActivateAllRelatedDotDescriptionWrappers(
      el.parentElement.parentElement,
      localIndex,
    );
    InfoDots.ActivateRelatedDotDescriptionWrappers(
      el.closest(".dots-img-wrapper"),
      localIndex,
    );
  });
});
InfoDots.allDotDescriptionWrappers.forEach(function (el) {
  el.addEventListener("mouseleave", function () {
    let localIndex = global.GetLocalIndex(
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
InfoDots.allDotDescriptionWrappers.forEach(function (el) {
  el.addEventListener("click", function () {
    let localIndex = global.GetLocalIndex(
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
const allVids = document.querySelectorAll(".vid");
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
  global.PauseVid(btn);
});
mainWrapper.addEventListener("click", function (e) {
  const btn = e.target.closest(".btn-back");
  if (!btn) return;
  DataVid.DataBack(btn);
});
mainWrapper.addEventListener("click", function (e) {
  const btn = e.target.closest(".btn-img-txt");
  if (!btn) return;
  DataVid.DataTxtImg(btn);
});
