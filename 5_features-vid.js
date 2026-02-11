import * as global from "./0_global";

class FeaturesVid {
  testFeatures = "test features";
  PlayFeaturesVid = function (btn) {
    const allBtns = btn.closest(".btn-wrapper").querySelectorAll(".btn");
    const startTime = btn.getAttribute("startTime");
    const endTime = btn.getAttribute("endTime");
    const vidWrapper = btn.closest(".vid-wrapper");
    const pauseBtn = btn
      .closest(".vid-wrapper")
      .querySelector(".pause-btn-wrapper");
    global.InitPauseBtn(pauseBtn);
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
    global.ActivateCurrentBtn(btn.closest(".vid-wrapper"), localIndex);
    vidWrapper.querySelectorAll(".vid-code").forEach(function (el) {
      if (window.getComputedStyle(el).display !== "none")
        vidBreakpoint = el.querySelector(".vid");
    });
    global.PlayRange(startTime, endTime, vidBreakpoint);
  };
  EndFeaturesVid = function (btnWrapper) {
    btnWrapper.classList.add("active");
    const pauseWrapper = btnWrapper
      .closest(".vid-wrapper")
      .querySelector(".pause-btn-wrapper");
    const localVidWrapper = btnWrapper.closest(".vid-wrapper");
    global.DeActivateCurrentBtns(localVidWrapper);
    pauseWrapper.style.pointerEvents = "none";
  };
}
export default new FeaturesVid();
