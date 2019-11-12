/**
 *
 * @summary 动画主流程  各个时间点的控制
 * @author Hyy
 *
 * Created at     : 2019-11-04 14:34:13
 * Last modified  : 2019-11-12 19:37:03
 */

import HeartManage from "./components/HeartManage";
import FlyFlower from "./components/FlyFlower";
//import SvgFlower from "./components/SvgFlower";
import SvgFlowerBySnap from "./components/SvgFlowerBySnap";
import translateClient from "./helper/transform";
import { StoryData } from "./data/StoryData";
import storyDataHandler, { showAllStory } from "./helper/storyDataHandler";
import { createSvgEl } from "./helper/createSvgEl";
import { heartWrapper, otherWrapper, scale, CloudAddress } from "./config";
import { STATUSCONST, global, changeGlobalValue } from "./config/global";
import waitLoad from "./helper/load";

//初始化页面点击
bindInitClick();

const elWrapper = document.querySelector(".flower-wrapper");
let storyData = storyDataHandler(StoryData, {
  hide: true,
  clickhandler
});

let heartManage = new HeartManage({
  heartWrapper,
  complete: () => {
    const timeout = 8000;
    //   const svgEl = createSvgEl("svgFlower1", timeout);
    //   let svgFlower = new SvgFlower(svgEl);
    let svgFlower = new SvgFlowerBySnap(timeout);
    changeGlobalValue("status", STATUSCONST.SVGFLOWERFLY);
    setTimeout(() => {
      showFirstStory();
      svgFlower.endAnimate = true;
    }, timeout);
  }
});

// 开始移动视角
let flyFlower = null;
function startStory() {
  flyFlower = new FlyFlower({
    storyData,
    elWrapper,
    complete: () => {
      changeGlobalValue("status", STATUSCONST.ANIMATEEND);
      heartManage.normalFlying = true;
    }
  });
  storyData[0].el.classList.add("opacity-change");
  changeGlobalValue("status", STATUSCONST.STORYAUTO);
  /* 开启相册动画 */
  flyFlower.animateStack(0, 6000);
  //重新填满心
  heartManage.maxFlowerCount = 400;
  heartManage.initFlower();
  //   setTimeout(() => {
  //     flyFlower.toSingle(12);
  //   }, 3000);
}

// 渐现第一张story
function showFirstStory() {
  showAllStory(storyData);
  translateClient(0, 0, scale);
  startStory();
}

// 进入主界面
function bindInitClick() {
  const btn = document.getElementById("enterStoryBtn");
  const loading = document.querySelector("#bars-loading");
  const loadingPage = document.querySelector(".loadingPage");

  function showStart() {
    loading.style.display = "none";
    btn.style.display = "inline-block";
    console.log("ready");
  }

  // 等待资源加载完毕
  waitLoad({
    data: {
      video: ["love-story.mp3"],
      img: ["flowers.png", "woodbac.jpg"]
    },
    callback: (cur, total) => {
      console.log(cur, total);
      if (cur === total) {
        showStart();
      }
    },
    prefix: CloudAddress
  });

  btn.addEventListener("click", function(e) {
    initplay();
  });

  function initplay() {
    //背景音乐
    const audio = document.createElement("audio");
    audio.src = `${CloudAddress}love-story.mp3`;
    audio.loop = true;

    loadingPage.classList.add("opacity-change-reverse");
    setTimeout(() => {
      loadingPage.style.zIndex = 1;
    }, 4000);
    setTimeout(() => {
      audio.play();
      //开始爱心花朵飘散动画
      heartManage.render();
      changeGlobalValue("status", STATUSCONST.HEARTFLY);
      //showFirstStory();
    }, 4000);
  }
}

document.addEventListener("keydown", event => {
  var e = event || window.event || arguments.callee.caller.arguments[0];
  if (e && e.keyCode == 27) {
    // 按 Esc
    if (
      global.status === STATUSCONST.STORYAUTO ||
      global.status === STATUSCONST.STORYMANUAL
    ) {
      endAnimate();
    }
  }
  if ((e && e.keyCode == 38) || (e && e.keyCode == 37)) {
    //上,左
    if (canToNextOrPrev()) {
      toPrevStory();
    }
  }

  if ((e && e.keyCode == 40) || (e && e.keyCode == 39)) {
    //下,右
    if (canToNextOrPrev()) {
      toNextStory();
    }
  }
});

function canToNextOrPrev() {
  return global.status === STATUSCONST.STORYMANUAL && !global.storyMoving;
}

/* 动画至结束状态 */
function endAnimate() {
  changeGlobalValue("status", STATUSCONST.ANIMATEEND);
  translateClient(0, 0, 1);
  heartManage.normalFlying = true;
}

//进入某个story
function clickhandler(index) {
  translateClient(0, 0, scale);
  flyFlower.toSingleImmediately(index);
}

function toNextStory() {
  flyFlower.animateStack(undefined, 0);
}

function toPrevStory() {
  flyFlower.animateStack(undefined, 0, true);
}
