console.log("script-2 - test-1");
//.......................................................................................
//VIDS LIBRARY......................................................
const vidHtml = `<video class="vid" playsinline muted="muted" style= "width:100%; height:100%;">
    <source src="https://template-documenter-vids.b-cdn.net/Default%20Cube-Features-2.mp4">
  </video>`;
//.......................................................................................
//.......................................................................................
//VIDS DEFINITIONS......................................................
const VideoManager = {
  injectAndPlay(imgVidWrapper) {
    imgVidWrapper.innerHTML = vidHtml;
    imgVidWrapper.querySelector(".vid").addEventListener("ended", function () {
      imgVidWrapper
        .closest(".vid-wrapper")
        .querySelector(".play-btn-wrapper")
        .classList.remove("off");
    });
    imgVidWrapper.querySelector(".vid").play();
  },
};
const allPlayBtns = document.querySelectorAll(".play-btn-wrapper");
let allVids = [...document.querySelectorAll(".vid")];
//.......................................................................................
//VIDS EVENTS...........................................................
allPlayBtns.forEach(function (el) {
  el.addEventListener("click", function (e) {
    el.classList.add("off");
    const clicked = e.target
      .closest(".vid-wrapper")
      .querySelector(".img-vid-wrapper");
    if (!clicked) return;
    VideoManager.injectAndPlay(clicked);
  });
});

allVids.forEach(function (el) {
  el.addEventListener("ended", function () {
    console.log("vid ended!");
  });
});
