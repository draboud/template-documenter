import * as global from "./0_global";

class SingleVid {
  PlaySingleVid = function (btn) {
    btn.classList.add("off");
    const vidWrapper = btn.closest(".vid-wrapper");
    let vidBreakpoint;
    vidWrapper.querySelectorAll(".vid-code").forEach(function (el) {
      if (window.getComputedStyle(el).display !== "none")
        vidBreakpoint = el.querySelector(".vid");
    });
    vidBreakpoint.play();
  };

  EndSingleVid = function (btn) {
    btn.classList.remove("off");
  };
}
export default new SingleVid();
