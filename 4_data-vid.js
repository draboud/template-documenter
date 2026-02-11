import * as global from "./0_global";

class DataVid {
  testData = "test data";

  PlayDataVid = function (btn) {
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
    global.PlayRange(startTime, endTime, vidBreakpoint);
  };
  DataBack = function (btn) {
    const vidWrapper = btn.closest(".vid-wrapper");
    const btnWrapper = vidWrapper.querySelector(".btn-wrapper");
    const backBtnWrapper = btn.closest(".back-img-txt-btn-wrapper");
    const imgTxtBtn = backBtnWrapper.querySelector(".btn-img-txt");
    const dimmer = vidWrapper.querySelector(".dimmer");
    const allVidDivData = vidWrapper.querySelectorAll(".vid-code");
    backBtnWrapper.classList.remove("active");
    imgTxtBtn.textContent = "image";
    dimmer.classList.remove("active");
    this.DeActivateAllData(vidWrapper);
    allVidDivData.forEach(function (el) {
      el.querySelector(".vid").currentTime = 0;
    });
    btnWrapper.classList.add("active");
    this.ResetDataScroll(vidWrapper);
  };
  DataTxtImg = function (btn) {
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
  EndDataVid = function (btnWrapper) {
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
  DeActivateAllData = function (vidWrapper) {
    vidWrapper.querySelectorAll(".data-all-wrapper").forEach(function (el) {
      el.classList.remove("active");
    });
  };
  ResetDataScroll = function (vidWrapper) {
    vidWrapper.querySelectorAll(".data-all-wrapper").forEach(function (el) {
      el.querySelector(".data-wrapper").scroll(0, 0);
    });
  };
}
export default new DataVid();
