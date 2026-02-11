class Navbar {
  //..................................................................................
  //NAV DEFINITIONS...................................................................
  allChapterWrappers = document.querySelectorAll(".chapter-wrapper");
  allSubChapterWrappers = document.querySelectorAll(".sub-chapter-wrapper");
  allNavBtns = document.querySelectorAll(".nav-btn");
  allNavItemHeaders = document.querySelectorAll(".nav-item-header");
  allNavDropdowns = document.querySelectorAll(".nav-item-dropdown");
  allMainWrappers = document.querySelectorAll(".main-wrapper");
  //..................................................................................
  //NAV FUNCTIONS.....................................................................
  ActivateSubChapterWrapper = function (clicked) {
    this.allSubChapterWrappers.forEach(function (el) {
      if (el.parentElement === clicked) {
        el.classList.toggle("active");
      } else {
        el.classList.remove("active");
      }
    });
  };
  CloseNavTotally = function (mainWrapper) {
    this.CloseAllNavDropdowns(
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
  CloseAllNavDropdowns = function (navMenu) {
    navMenu.querySelectorAll(".nav-item-dropdown").forEach(function (el) {
      el.classList.remove("active");
    });
  };
}
export default new Navbar();
