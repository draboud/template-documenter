import * as global from "./0_global";

class TwoStateVid {
  testTwoState = "test two-state";

  PlayTwoStateVid = function (btn) {
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
    global.PlayRange(startTime, endTime, vidBreakpoint);
  };
  EndTwoStateVid = function (btn) {
    btn.classList.remove("off");
    if (btn.classList.contains("state-1")) {
      btn.classList.remove("state-1");
      btn.classList.add("state-2");
    } else {
      btn.classList.remove("state-2");
      btn.classList.add("state-1");
    }
  };
}
export default new TwoStateVid();
