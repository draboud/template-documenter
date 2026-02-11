class InfoDots {
  //..................................................................................
  //INFO DOTS DEFINITIONS.............................................................
  allDots = [...document.querySelectorAll(".dot")];
  allDotDescriptionWrappers = [
    ...document.querySelectorAll(".dot-description-wrapper"),
  ];
  //..................................................................................  //INFO DOTS FUNCTIONS...............................................................
  DeActivateAllRelatedDotDescriptionWrappers = function (
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
  ActivateRelatedDotDescriptionWrappers = function (localDotsDiv, localIndex) {
    [...localDotsDiv.querySelectorAll(".dot-description-wrapper")][
      localIndex
    ].classList.add("active");
  };
  CloseAllDotWrappers = function () {
    document
      .querySelectorAll(".dot-description-wrapper")
      .forEach(function (el) {
        el.classList.remove("active");
      });
  };
}
export default new InfoDots();
