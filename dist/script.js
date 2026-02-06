(() => {
  // script.js
  console.log("Template-Documenter-Feb 5, 2026...Test-3");
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
  var allVids = [
    ...document.querySelectorAll(".vid"),
    ...document.querySelectorAll(".vid-state")
  ];
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
  var PlayStateVid = function(playBtn) {
    let stateFlag = playBtn.classList[1];
    let playThis;
    playBtn.closest(".vid-wrapper").querySelectorAll(".vid-state").forEach(function(el) {
      if (!el.parentElement.classList.contains(stateFlag) && window.getComputedStyle(el.parentElement).display !== "none") {
        el.parentElement.classList.add("off");
        el.currentTime = 0;
      }
      if (el.parentElement.classList.contains(stateFlag) && window.getComputedStyle(el.parentElement).display !== "none") {
        playThis = el.parentElement;
      }
    });
    playThis.classList.remove("off");
    playThis.querySelector(".vid-state").play();
    stateFlag === "state-1" ? stateFlag = "state-2" : stateFlag = "state-1";
    playBtn.classList.remove("state-1", "state-2");
    playBtn.classList.add(stateFlag);
  };
  var allDataBtns = document.querySelectorAll(".btn.data");
  var allDataBackBtns = [...document.querySelectorAll(".btn.back")];
  var allDataImgTextBtns = document.querySelectorAll(".btn.img-text");
  var allDataVidDivs = [...document.querySelectorAll(".vid-div-data")];
  var allDataVidDivsMP = [...document.querySelectorAll(".vid-div-data.mp")];
  var allDataVids = [...document.querySelectorAll(".vid-data")];
  var allDataVidsMP = [...document.querySelectorAll(".vid-data-mp")];
  allDataBtns.forEach(function(el) {
    el.addEventListener("click", function() {
      let localIndex = GetLocalIndex(el, el.parentElement, "btn.data");
      el.closest(".data-btn-wrapper").classList.remove("active");
      ActivatedataVid(el.closest(".vid-wrapper"), localIndex);
      PlaydataVid(el.closest(".vid-wrapper"));
    });
  });
  allDataBackBtns.forEach(function(el) {
    el.addEventListener("click", function() {
      el.parentElement.classList.remove("active");
      el.parentElement.querySelector(".btn.img-text").textContent = "image";
      el.closest(".vid-wrapper").querySelector(".dimmer").classList.remove("active");
      DeActivateAlldataData(el.closest(".vid-wrapper"));
      [...el.closest(".vid-wrapper").querySelectorAll(".vid-div-data")].find((el2) => el2.classList.contains("active")).querySelector(".vid-data").currentTime = 0;
      [...el.closest(".vid-wrapper").querySelectorAll(".vid-div-data.mp")].find((el2) => el2.classList.contains("active")).querySelector(".vid-data-mp").currentTime = 0;
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
  allDataVids.forEach(function(el) {
    el.addEventListener("ended", function() {
      let localIndex = GetLocalIndex(el, el.closest(".vid-wrapper"), "vid-data");
      el.closest(".vid-wrapper").querySelector(".back-img-text-btn-wrapper").classList.add("active");
      el.closest(".vid-wrapper").querySelector(".dimmer").classList.add("active");
      ActivatedataData(el.closest(".vid-wrapper"), localIndex);
    });
  });
  var ActivatedataVid = function(vidWrapper, localIndex) {
    vidWrapper.querySelectorAll(".vid-div-data").forEach(function(el) {
      el.classList.remove("active");
    });
    vidWrapper.querySelectorAll(".vid-div-data.mp").forEach(function(el) {
      el.classList.remove("active");
    });
    let activeCompVidDiv = vidWrapper.querySelectorAll(".vid-div-data")[localIndex];
    let activeCompVidDivMP = vidWrapper.querySelectorAll(".vid-div-data.mp")[localIndex];
    activeCompVidDiv.classList.add("current");
    activeCompVidDivMP.classList.add("current");
  };
  var PlaydataVid = function(vidWrapper) {
    let currentdataVidDiv = [
      ...vidWrapper.querySelectorAll(".vid-div-data")
    ].find((el) => el.classList.contains("current"));
    currentdataVidDiv.querySelector(".vid-data").play();
    currentdataVidDiv.classList.add("active");
    currentdataVidDiv.classList.remove("current");
    let currentdataVidDivMP = [
      ...vidWrapper.querySelectorAll(".vid-div-data.mp")
    ].find((el) => el.classList.contains("current"));
    currentdataVidDivMP = allDataVidDivsMP.find(
      (el) => el.classList.contains("current")
    );
    currentdataVidDivMP.querySelector(".vid-data-mp").play();
    currentdataVidDivMP.classList.add("active");
    currentdataVidDivMP.classList.remove("current");
  };
  var ActivatedataData = function(vidWrapper, localIndex) {
    DeActivateAlldataData(vidWrapper);
    vidWrapper.querySelectorAll(".data-all-wrapper")[localIndex].classList.add("active");
  };
  var DeActivateAlldataData = function(vidWrapper) {
    vidWrapper.querySelectorAll(".data-all-wrapper").forEach(function(el) {
      el.classList.remove("active");
    });
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
})();
